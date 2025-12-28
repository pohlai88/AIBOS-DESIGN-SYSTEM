# Supabase ERP Dashboard Design Strategy

**Date:** 2025-01-27  
**Status:** Architecture Design Document  
**Version:** 1.0

---

## Executive Summary

This document outlines how Supabase will power the ERP dashboard, leveraging its real-time capabilities, Row Level Security (RLS), and Postgres features to deliver a production-grade ERP system aligned with the Cell Mesh Architecture.

---

## 1. Architecture Alignment

### 1.1 Cell-Based Data Model

Each **Cell** in the ERP system maps to Supabase tables with:

- **Private Schema per Cell**: Use Postgres schemas (`cell_inventory`, `cell_orders`, `cell_finance`) to enforce cell boundaries
- **RLS for Tenant Isolation**: Every table MUST have RLS enabled with tenant-scoped policies
- **Party Context in RLS**: Policies evaluate `actor_tenant_id`, `context_tenant_id`, `counterparty_tenant_id`, `relationship_type`, and `direction`

### 1.2 Metadata-First Approach

- **Supabase Tables as Metadata Registry**: Store cell schemas, commands, events, and policies in `mdm_*` tables (already exists)
- **Database Functions as Contract Validators**: Postgres functions validate commands/events against metadata schemas
- **Views as UI Projections**: Materialized views project cell data with party context filtering

---

## 2. Real-Time Dashboard Features

### 2.1 Live Data Updates (Supabase Realtime)

**Use Case:** Real-time ticker, activity feed, KPI updates

**Implementation:**
```typescript
// Real-time ticker for orders/revenue
const ordersChannel = supabase
  .channel('dashboard-ticker')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'vmp_orders',
    filter: `tenant_id=eq.${tenantId}`
  }, (payload) => {
    updateTicker('orders', payload.new)
  })
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'vmp_payments',
    filter: `tenant_id=eq.${tenantId}`
  }, (payload) => {
    updateTicker('revenue', payload.new)
  })
  .subscribe()
```

**Tables to Enable Realtime:**
- `vmp_orders` → Order count ticker
- `vmp_payments` → Revenue ticker
- `vmp_cases` → Pending approvals ticker
- `nexus_notifications` → Activity stream
- `nexus_case_activity` → Real-time activity feed

### 2.2 Frozen Pane Grid (Sticky Headers/Columns)

**Use Case:** Large data tables with horizontal/vertical scrolling

**Implementation:**
- Use Supabase queries with pagination (`range()`)
- Client-side sticky positioning (CSS `position: sticky`)
- Virtual scrolling for performance (react-window or similar)
- Real-time updates via Realtime subscriptions filtered to visible rows

**Example Query:**
```typescript
const { data, error } = await supabase
  .from('vmp_orders')
  .select('*, vendor:vendor_id(name), company:company_id(name)')
  .eq('tenant_id', tenantId)
  .order('created_at', { ascending: false })
  .range(0, 99) // First 100 rows
```

### 2.3 Inline CRUD Operations

**Use Case:** Edit cells directly in the grid view

**Implementation:**
- Use Supabase `.update()` for cell edits
- RLS policies enforce party context permissions
- Optimistic updates with rollback on error
- Real-time sync via Realtime subscriptions

**Example:**
```typescript
// Inline edit with party context validation
const updateOrder = async (orderId: string, field: string, value: any) => {
  const { data, error } = await supabase
    .from('vmp_orders')
    .update({ [field]: value })
    .eq('id', orderId)
    .eq('tenant_id', tenantId) // RLS enforces this
    .select()
    .single()
  
  if (error) {
    // Rollback optimistic update
    revertOptimisticUpdate(orderId, field)
  }
}
```

---

## 3. Database Architecture

### 3.1 Materialized Views for Reporting

**Use Case:** Fast KPI calculations, aggregated dashboards

**Implementation:**
```sql
-- KPI Materialized View (refreshed every 5 minutes via pg_cron)
CREATE MATERIALIZED VIEW dashboard_kpis AS
SELECT 
  tenant_id,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_orders,
  SUM(amount) FILTER (WHERE status = 'paid') as total_revenue,
  AVG(EXTRACT(EPOCH FROM (paid_at - created_at))) as avg_payment_time
FROM vmp_orders
GROUP BY tenant_id;

-- Refresh via pg_cron
SELECT cron.schedule('refresh-kpis', '*/5 * * * *', 
  'REFRESH MATERIALIZED VIEW CONCURRENTLY dashboard_kpis');
```

**Benefits:**
- Pre-computed aggregations = instant dashboard loads
- Reduces load on transactional tables
- Supports complex multi-table joins

### 3.2 Database Functions for Business Logic

**Use Case:** Complex calculations, validations, state transitions

**Example: Order Status Transition:**
```sql
CREATE OR REPLACE FUNCTION process_order_status_change(
  p_order_id UUID,
  p_new_status TEXT,
  p_actor_tenant_id UUID,
  p_context_tenant_id UUID,
  p_counterparty_tenant_id UUID
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_old_status TEXT;
  v_result JSONB;
BEGIN
  -- Get current status
  SELECT status INTO v_old_status
  FROM vmp_orders
  WHERE id = p_order_id AND tenant_id = p_context_tenant_id;
  
  -- Validate transition (from metadata)
  IF NOT EXISTS (
    SELECT 1 FROM mdm_state_transitions
    WHERE entity_type = 'order'
    AND from_state = v_old_status
    AND to_state = p_new_status
  ) THEN
    RAISE EXCEPTION 'Invalid state transition: % -> %', v_old_status, p_new_status;
  END IF;
  
  -- Update order
  UPDATE vmp_orders
  SET status = p_new_status,
      updated_at = NOW()
  WHERE id = p_order_id;
  
  -- Emit event (to outbox pattern)
  INSERT INTO cell_outbox (type, payload, tenant_id, ...)
  VALUES ('order.status_changed', jsonb_build_object(...), p_context_tenant_id, ...);
  
  RETURN jsonb_build_object('success', true, 'old_status', v_old_status, 'new_status', p_new_status);
END;
$$;
```

### 3.3 Triggers for Audit Trail

**Use Case:** Immutable audit log for compliance

**Implementation:**
```sql
-- Audit trigger (fires on every INSERT/UPDATE/DELETE)
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO audit_events (
    table_name,
    record_id,
    user_id,
    action,
    old_values,
    new_values,
    metadata
  ) VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    auth.uid(),
    TG_OP,
    to_jsonb(OLD),
    to_jsonb(NEW),
    jsonb_build_object(
      'tenant_id', COALESCE(NEW.tenant_id, OLD.tenant_id),
      'party_context', jsonb_build_object(
        'actor_tenant_id', current_setting('app.actor_tenant_id', true),
        'context_tenant_id', current_setting('app.context_tenant_id', true)
      )
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Apply to critical tables
CREATE TRIGGER audit_vmp_orders
AFTER INSERT OR UPDATE OR DELETE ON vmp_orders
FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

---

## 4. Row Level Security (RLS) Strategy

### 4.1 Tenant Isolation (Mandatory)

**Every table MUST have:**
```sql
-- Enable RLS
ALTER TABLE vmp_orders ENABLE ROW LEVEL SECURITY;

-- Tenant isolation policy
CREATE POLICY "tenant_isolation" ON vmp_orders
FOR ALL
TO authenticated
USING (tenant_id = (SELECT auth.jwt() ->> 'tenant_id')::UUID);
```

### 4.2 Party Context Policies

**Example: Vendor Portal (Context-Based Access)**
```sql
-- Vendors can only see orders where they are the counterparty
CREATE POLICY "vendor_orders_access" ON vmp_orders
FOR SELECT
TO authenticated
USING (
  tenant_id = (SELECT auth.jwt() ->> 'tenant_id')::UUID
  AND (
    -- Vendor context: see orders where vendor_id matches
    (current_setting('app.party_context', true) = 'vendor'
     AND vendor_id = (SELECT auth.jwt() ->> 'counterparty_tenant_id')::UUID)
    OR
    -- Client context: see all orders
    (current_setting('app.party_context', true) = 'client')
  )
);
```

### 4.3 Role-Based Access Control (RBAC)

**Combine RLS with role checks:**
```sql
CREATE POLICY "admin_full_access" ON vmp_orders
FOR ALL
TO authenticated
USING (
  tenant_id = (SELECT auth.jwt() ->> 'tenant_id')::UUID
  AND (SELECT auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
```

---

## 5. Real-Time Features Implementation

### 5.1 Activity Stream (Real-Time Feed)

**Implementation:**
```typescript
// Subscribe to activity events
const activityChannel = supabase
  .channel('activity-stream')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'nexus_case_activity',
    filter: `tenant_id=eq.${tenantId}`
  }, (payload) => {
    prependActivityItem(payload.new)
  })
  .subscribe()
```

**Database Setup:**
```sql
-- Enable realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE nexus_case_activity;
ALTER PUBLICATION supabase_realtime ADD TABLE nexus_notifications;
```

### 5.2 Kanban Board (Real-Time Drag & Drop)

**Implementation:**
- Store kanban state in `kanban_columns` table
- Use Realtime subscriptions to sync card moves across clients
- Optimistic updates with conflict resolution

```typescript
// Move card between columns
const moveCard = async (cardId: string, newColumnId: string) => {
  // Optimistic update
  updateLocalState(cardId, newColumnId)
  
  // Server update
  const { error } = await supabase
    .from('kanban_cards')
    .update({ column_id: newColumnId })
    .eq('id', cardId)
  
  if (error) revertLocalState(cardId)
}

// Listen for remote moves
const kanbanChannel = supabase
  .channel('kanban-updates')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'kanban_cards',
    filter: `board_id=eq.${boardId}`
  }, (payload) => {
    if (payload.new.updated_by !== currentUserId) {
      syncRemoteMove(payload.new)
    }
  })
  .subscribe()
```

### 5.3 Gantt Chart (Timeline View)

**Implementation:**
- Store task schedules in `tasks` table with `start_date`, `end_date`, `duration`
- Use Supabase queries with date range filters
- Real-time updates when tasks are rescheduled

```typescript
// Fetch tasks for Gantt view
const { data } = await supabase
  .from('tasks')
  .select('id, name, start_date, end_date, status, assignee_id')
  .eq('tenant_id', tenantId)
  .gte('start_date', viewStartDate)
  .lte('end_date', viewEndDate)
  .order('start_date')
```

---

## 6. Performance Optimization

### 6.1 Indexing Strategy

**Critical indexes for dashboard queries:**
```sql
-- Tenant-scoped queries
CREATE INDEX idx_orders_tenant_status ON vmp_orders(tenant_id, status);
CREATE INDEX idx_orders_tenant_created ON vmp_orders(tenant_id, created_at DESC);

-- Party context queries
CREATE INDEX idx_orders_vendor_tenant ON vmp_orders(vendor_id, tenant_id);
CREATE INDEX idx_orders_company_tenant ON vmp_orders(company_id, tenant_id);

-- Real-time subscriptions (for RLS performance)
CREATE INDEX idx_orders_tenant_realtime ON vmp_orders(tenant_id) 
WHERE status IN ('pending', 'processing');
```

### 6.2 Query Optimization

**Use Supabase query patterns:**
```typescript
// Efficient: Filtered query with limit
const { data } = await supabase
  .from('vmp_orders')
  .select('id, order_number, status, amount, vendor:vendor_id(name)')
  .eq('tenant_id', tenantId)
  .eq('status', 'pending')
  .order('created_at', { ascending: false })
  .limit(50)

// Avoid: Full table scans
// ❌ const { data } = await supabase.from('vmp_orders').select('*')
```

### 6.3 Caching Strategy

**Layer 1: Materialized Views** (pre-computed aggregations)
**Layer 2: Client-side caching** (React Query / SWR)
**Layer 3: CDN caching** (for static dashboard configs)

---

## 7. Security & Compliance

### 7.1 RLS Enforcement

**Mandatory for all tables:**
- ✅ RLS enabled on all `public` schema tables
- ✅ Policies test tenant isolation
- ✅ Policies enforce party context
- ✅ Policies respect RBAC roles

### 7.2 Audit Trail

**Immutable audit log:**
- Every state change recorded in `audit_events`
- Includes before/after values
- Includes party context metadata
- Append-only (no updates/deletes)

### 7.3 Data Encryption

**Supabase Storage for documents:**
- Use Supabase Storage buckets with RLS policies
- Encrypt sensitive documents at rest
- Signed URLs for temporary access

---

## 8. Integration with Cell Mesh Architecture

### 8.1 Inbox/Outbox Pattern

**Supabase Tables:**
```sql
-- Cell Inbox (commands received)
CREATE TABLE cell_inbox (
  msg_id UUID PRIMARY KEY,
  msg_type TEXT, -- 'command' | 'event'
  type TEXT, -- contract type
  received_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  status TEXT, -- 'received' | 'processing' | 'processed' | 'failed'
  tenant_id UUID,
  actor_tenant_id UUID,
  context_tenant_id UUID,
  counterparty_tenant_id UUID,
  relationship_type TEXT,
  direction TEXT,
  payload JSONB
);

-- Cell Outbox (events to emit)
CREATE TABLE cell_outbox (
  msg_id UUID PRIMARY KEY,
  type TEXT, -- event contract type
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  status TEXT, -- 'ready' | 'publishing' | 'published' | 'failed'
  tenant_id UUID,
  source_cell TEXT,
  correlation_id UUID,
  causation_id UUID,
  payload JSONB
);
```

### 8.2 Event Bus Integration

**Supabase Realtime as Event Bus:**
- Cells subscribe to relevant event types
- Kernel routes events via Realtime channels
- RLS ensures tenant/party context isolation

```typescript
// Cell subscribes to events
const eventChannel = supabase
  .channel('cell-events')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'cell_outbox',
    filter: `type=eq.order.created&tenant_id=eq.${tenantId}`
  }, (payload) => {
    processEvent(payload.new)
  })
  .subscribe()
```

---

## 9. Dashboard UI Components → Supabase Mapping

### 9.1 KPI Cards

**Data Source:** Materialized view `dashboard_kpis`
**Update Frequency:** Real-time via Realtime subscriptions
**Query:**
```typescript
const { data } = await supabase
  .from('dashboard_kpis')
  .select('*')
  .eq('tenant_id', tenantId)
  .single()
```

### 9.2 Frozen Pane Grid

**Data Source:** Direct table queries with pagination
**Real-time:** Realtime subscriptions for visible rows
**Performance:** Virtual scrolling + indexed queries

### 9.3 Kanban Board

**Data Source:** `kanban_cards` table with `column_id`
**Real-time:** Realtime subscriptions for card moves
**State:** Optimistic updates with server sync

### 9.4 Gantt Chart

**Data Source:** `tasks` table with date ranges
**Real-time:** Realtime subscriptions for schedule changes
**Visualization:** Client-side rendering (D3.js / vis.js)

### 9.5 Activity Stream

**Data Source:** `nexus_case_activity` table
**Real-time:** Realtime subscriptions for new activities
**Filtering:** Client-side filtering by activity type

---

## 10. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- ✅ Enable RLS on all tables
- ✅ Create tenant isolation policies
- ✅ Set up Realtime publications
- ✅ Create materialized views for KPIs

### Phase 2: Real-Time Features (Week 3-4)
- ✅ Implement Realtime subscriptions for ticker
- ✅ Build activity stream with Realtime
- ✅ Add optimistic updates for CRUD operations

### Phase 3: Advanced Views (Week 5-6)
- ✅ Implement Kanban board with Realtime sync
- ✅ Build Gantt chart with date range queries
- ✅ Add frozen pane grid with virtual scrolling

### Phase 4: Performance & Polish (Week 7-8)
- ✅ Optimize indexes for dashboard queries
- ✅ Implement client-side caching
- ✅ Add error handling and retry logic

---

## 11. Best Practices

### 11.1 Always Use RLS
- Never expose tables without RLS
- Test policies with different tenant contexts
- Use `security definer` functions sparingly

### 11.2 Optimize Realtime Subscriptions
- Filter subscriptions at the database level
- Use specific table/event filters
- Limit subscription scope to visible data

### 11.3 Query Performance
- Always include `tenant_id` in WHERE clauses
- Use indexes on filtered columns
- Prefer materialized views for aggregations

### 11.4 Error Handling
- Implement retry logic for failed updates
- Use optimistic updates with rollback
- Log errors to `error_logs` table

---

## 12. Monitoring & Observability

### 12.1 Supabase Dashboard
- Monitor Realtime connection counts
- Track API request rates
- Review database query performance

### 12.2 Custom Metrics
- Track dashboard load times
- Monitor Realtime subscription latency
- Alert on RLS policy failures

---

## Conclusion

Supabase provides a robust foundation for the ERP dashboard with:
- ✅ **Real-time capabilities** via Realtime subscriptions
- ✅ **Security** via Row Level Security
- ✅ **Performance** via materialized views and indexes
- ✅ **Scalability** via Postgres optimizations
- ✅ **Compliance** via audit trails and RLS policies

This design aligns with the Cell Mesh Architecture while leveraging Supabase's strengths for a production-grade ERP system.

