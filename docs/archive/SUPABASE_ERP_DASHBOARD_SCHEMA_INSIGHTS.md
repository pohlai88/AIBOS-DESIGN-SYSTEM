# Supabase ERP Dashboard — Database Schema Insights

**Date:** 2025-01-27  
**Status:** Analysis Document  
**Version:** 1.0

---

## Executive Summary

This document analyzes the Supabase ERP Dashboard implementation to extract **critical database schema insights** that may fundamentally change how we design our database and schema architecture. The dashboard's UI requirements reveal patterns that should drive our schema design decisions.

---

## Key Insights

### 1. **View-Driven Schema Design**

The dashboard requires **multiple views** of the same data:
- **Grid View**: Tabular, sortable, filterable
- **Kanban View**: Grouped by `kanban_column` (status-based)
- **Gantt View**: Timeline-based with `start_date` and `end_date`
- **Analytics View**: Aggregated metrics

**Schema Implication:**
```sql
-- Add kanban_column to vmp_cases (or derive from status)
ALTER TABLE vmp_cases 
ADD COLUMN kanban_column TEXT DEFAULT 'open';

-- Add timeline fields for Gantt view
ALTER TABLE vmp_invoices
ADD COLUMN payment_schedule_start DATE,
ADD COLUMN payment_schedule_end DATE;

-- Create materialized views for analytics
CREATE MATERIALIZED VIEW dashboard_kpis AS ...;
```

**Recommendation:** Design schemas with **multiple access patterns** in mind, not just normalized forms.

---

### 2. **Real-Time Subscription Requirements**

The dashboard subscribes to:
- `vmp_invoices` (INSERT, UPDATE, DELETE)
- `vmp_payments` (INSERT, UPDATE)
- `vmp_cases` (UPDATE for kanban moves)
- `nexus_case_activity` (INSERT for activity stream)

**Schema Implication:**
```sql
-- Enable Realtime publications
ALTER PUBLICATION supabase_realtime ADD TABLE vmp_invoices;
ALTER PUBLICATION supabase_realtime ADD TABLE vmp_payments;
ALTER PUBLICATION supabase_realtime ADD TABLE vmp_cases;
ALTER PUBLICATION supabase_realtime ADD TABLE nexus_case_activity;

-- Add indexes for Realtime filter performance
CREATE INDEX idx_vmp_invoices_tenant_realtime 
ON vmp_invoices(tenant_id) 
WHERE status IN ('pending', 'matched');
```

**Recommendation:** Every table that needs real-time updates must:
1. Have `tenant_id` for RLS filtering
2. Have indexes on filtered columns
3. Be added to Realtime publication

---

### 3. **Inline CRUD Requirements**

The dashboard allows **inline editing** of cells:
- Invoice fields: vendor, company, date, due_date, amount, currency, status, po_ref, grn_ref
- Case fields: kanban_column, status, priority

**Schema Implication:**
```sql
-- Ensure all editable fields have proper constraints
ALTER TABLE vmp_invoices
ADD CONSTRAINT check_amount_positive CHECK (amount > 0),
ADD CONSTRAINT check_due_date_after_invoice_date 
  CHECK (due_date >= invoice_date);

-- Add validation functions for inline edits
CREATE OR REPLACE FUNCTION validate_invoice_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate status transitions
  IF OLD.status = 'paid' AND NEW.status != 'paid' THEN
    RAISE EXCEPTION 'Cannot change status of paid invoice';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_invoice_update_trigger
BEFORE UPDATE ON vmp_invoices
FOR EACH ROW EXECUTE FUNCTION validate_invoice_update();
```

**Recommendation:** Add **validation triggers** for all inline-editable fields to prevent invalid data.

---

### 4. **Materialized Views for Performance**

The dashboard requires **pre-computed aggregations**:
- Total revenue (30 days)
- Pending invoices count
- Open cases count
- Average payment time
- Revenue trends (vs previous period)

**Schema Implication:**
```sql
-- Create materialized view for KPIs
CREATE MATERIALIZED VIEW dashboard_kpis AS
SELECT 
  tenant_id,
  -- Total Revenue (last 30 days)
  COALESCE(SUM(amount) FILTER (
    WHERE status = 'paid' 
    AND paid_date >= CURRENT_DATE - INTERVAL '30 days'
  ), 0) as total_revenue_30d,
  
  -- Pending Invoices Count
  COUNT(*) FILTER (WHERE status = 'pending') as pending_invoices_count,
  
  -- Open Cases Count
  (SELECT COUNT(*) FROM vmp_cases 
   WHERE vmp_cases.tenant_id = vmp_invoices.tenant_id 
   AND vmp_cases.status IN ('open', 'waiting_supplier', 'waiting_internal')
  ) as open_cases_count,
  
  -- Average Payment Time (days)
  AVG(EXTRACT(EPOCH FROM (paid_date - invoice_date)) / 86400) 
    FILTER (WHERE status = 'paid' AND paid_date IS NOT NULL) as avg_payment_days,
  
  -- Revenue Trend (vs previous period)
  COALESCE(SUM(amount) FILTER (
    WHERE status = 'paid' 
    AND paid_date >= CURRENT_DATE - INTERVAL '30 days'
    AND paid_date < CURRENT_DATE - INTERVAL '60 days'
  ), 0) as revenue_previous_period
  
FROM vmp_invoices
GROUP BY tenant_id;

-- Refresh every 5 minutes via pg_cron
SELECT cron.schedule(
  'refresh-dashboard-kpis',
  '*/5 * * * *',
  'REFRESH MATERIALIZED VIEW CONCURRENTLY dashboard_kpis'
);
```

**Recommendation:** Create **materialized views** for all dashboard KPIs to avoid expensive real-time aggregations.

---

### 5. **Kanban State Management**

The dashboard requires **kanban_column** field for drag-and-drop:
- Columns: 'open', 'in_progress', 'waiting', 'resolved'
- Real-time sync across users
- Optimistic updates with rollback

**Schema Implication:**
```sql
-- Add kanban_column to cases
ALTER TABLE vmp_cases 
ADD COLUMN kanban_column TEXT DEFAULT 'open'
CHECK (kanban_column IN ('open', 'in_progress', 'waiting', 'resolved'));

-- Create index for kanban queries
CREATE INDEX idx_vmp_cases_kanban_column 
ON vmp_cases(tenant_id, kanban_column);

-- Add updated_by for conflict resolution
ALTER TABLE vmp_cases
ADD COLUMN updated_by UUID REFERENCES users(id);
```

**Recommendation:** Add **state management fields** (kanban_column, updated_by) to support UI interactions.

---

### 6. **Activity Stream Requirements**

The dashboard displays **real-time activity stream**:
- Case activities
- Invoice updates
- Payment events
- User actions

**Schema Implication:**
```sql
-- Ensure nexus_case_activity has all required fields
CREATE TABLE IF NOT EXISTS nexus_case_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES nexus_cases(id),
  tenant_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  actor_id UUID REFERENCES nexus_users(id),
  actor_name TEXT,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for activity stream queries
CREATE INDEX idx_nexus_case_activity_tenant_created 
ON nexus_case_activity(tenant_id, created_at DESC);
```

**Recommendation:** Design **activity/audit tables** with all UI-required fields (actor_name, description, metadata) to avoid joins.

---

### 7. **Empty State Requirements**

The dashboard needs to handle **empty states**:
- No invoices
- No cases in kanban column
- No tasks in Gantt
- No activity in stream

**Schema Implication:**
```sql
-- Add helper functions to check for empty states
CREATE OR REPLACE FUNCTION has_invoices(p_tenant_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM vmp_invoices 
    WHERE tenant_id = p_tenant_id 
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql;

-- Or use simple COUNT queries (more efficient)
-- SELECT COUNT(*) = 0 FROM vmp_invoices WHERE tenant_id = $1;
```

**Recommendation:** Use **COUNT queries** or **EXISTS checks** to determine empty states efficiently.

---

### 8. **Inspector Panel Requirements**

The dashboard shows **detailed inspector panel** for selected items:
- Invoice details with related data
- Timeline/activity
- Metadata

**Schema Implication:**
```sql
-- Create view for invoice details with all related data
CREATE VIEW invoice_detail_view AS
SELECT 
  i.*,
  v.name as vendor_name,
  v.tax_id as vendor_tax_id,
  c.name as company_name,
  c.currency_code as company_currency,
  jsonb_agg(
    jsonb_build_object(
      'id', p.id,
      'amount', p.amount,
      'payment_date', p.payment_date,
      'status', p.status
    )
  ) FILTER (WHERE p.id IS NOT NULL) as payments,
  jsonb_agg(
    jsonb_build_object(
      'id', act.id,
      'activity_type', act.activity_type,
      'created_at', act.created_at,
      'actor_name', act.actor_name
    )
  ) FILTER (WHERE act.id IS NOT NULL) as activities
FROM vmp_invoices i
LEFT JOIN vmp_vendors v ON i.vendor_id = v.id
LEFT JOIN vmp_companies c ON i.company_id = c.id
LEFT JOIN vmp_payments p ON p.invoice_id = i.id
LEFT JOIN nexus_case_activity act ON act.case_id = i.case_id
GROUP BY i.id, v.id, c.id;
```

**Recommendation:** Create **detail views** that pre-join all related data to avoid multiple queries.

---

### 9. **Command Palette Requirements**

The dashboard has **command palette** (⌘K) for:
- Jump to invoice
- Export view
- Create new invoice
- Switch views
- Open inspector

**Schema Implication:**
```sql
-- Add full-text search indexes for command palette
CREATE INDEX idx_vmp_invoices_invoice_num_gin 
ON vmp_invoices USING gin(invoice_num gin_trgm_ops);

CREATE INDEX idx_vmp_vendors_name_gin 
ON vmp_vendors USING gin(name gin_trgm_ops);

-- Enable pg_trgm extension for fuzzy search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

**Recommendation:** Add **full-text search indexes** for all searchable fields.

---

### 10. **Frozen Pane Grid Requirements**

The dashboard uses **frozen pane grid** with:
- Sticky header
- Sticky first column (Invoice #)
- Pagination (range queries)
- Virtual scrolling support

**Schema Implication:**
```sql
-- Ensure invoice_num is indexed for first column display
CREATE INDEX idx_vmp_invoices_invoice_num 
ON vmp_invoices(tenant_id, invoice_num);

-- Add composite indexes for common sort/filter combinations
CREATE INDEX idx_vmp_invoices_tenant_date_status 
ON vmp_invoices(tenant_id, invoice_date DESC, status);

CREATE INDEX idx_vmp_invoices_tenant_vendor_date 
ON vmp_invoices(tenant_id, vendor_id, invoice_date DESC);
```

**Recommendation:** Create **composite indexes** for all common sort/filter combinations used in grids.

---

## Schema Design Principles Derived

### 1. **UI-First Schema Design**
Design schemas based on **how the UI needs to access data**, not just normalization rules.

### 2. **Denormalization for Performance**
Add **denormalized fields** (kanban_column, updated_by, actor_name) to avoid joins in real-time queries.

### 3. **Materialized Views for Aggregations**
Pre-compute all **dashboard KPIs** in materialized views refreshed via pg_cron.

### 4. **Activity Tables with Rich Metadata**
Store **all UI-required fields** in activity/audit tables to avoid joins.

### 5. **Indexes for Every Access Pattern**
Create **composite indexes** for every sort/filter combination used in the UI.

### 6. **Validation at Database Level**
Add **triggers and constraints** for all inline-editable fields.

### 7. **Real-Time Ready**
Every table needing real-time updates must have:
- `tenant_id` for RLS
- Indexes on filtered columns
- Realtime publication enabled

---

## Recommended Schema Changes

### Immediate Changes:
1. ✅ Add `kanban_column` to `vmp_cases`
2. ✅ Add `updated_by` to `vmp_cases` and `vmp_invoices`
3. ✅ Create `dashboard_kpis` materialized view
4. ✅ Add payment schedule fields to `vmp_invoices`
5. ✅ Create `invoice_detail_view` for inspector panel

### Performance Optimizations:
1. ✅ Create composite indexes for all grid sort/filter combinations
2. ✅ Add full-text search indexes for command palette
3. ✅ Enable Realtime publications for all real-time tables
4. ✅ Set up pg_cron for materialized view refreshes

### Data Integrity:
1. ✅ Add validation triggers for inline-editable fields
2. ✅ Add check constraints for date ranges and amounts
3. ✅ Add status transition validation

---

## Conclusion

The dashboard implementation reveals that **UI requirements should drive schema design**, not just normalization principles. We need:

- **Denormalized fields** for performance (kanban_column, actor_name)
- **Materialized views** for aggregations (KPIs)
- **Detail views** for inspector panels (pre-joined data)
- **Activity tables** with rich metadata (avoid joins)
- **Composite indexes** for every access pattern
- **Validation triggers** for inline CRUD
- **Real-time ready** schemas (tenant_id, indexes, publications)

**This approach prioritizes user experience and performance over strict normalization.**

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-27  
**Status:** ✅ Ready for Schema Implementation

