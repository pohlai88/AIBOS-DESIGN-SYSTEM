# Supabase ERP Dashboard — Comprehensive Design Document

**Date:** 2025-01-27  
**Status:** Architecture Design Document  
**Version:** 2.0 — "Beast Mode" Edition  
**Author:** AI-BOS Design Team

---

## Executive Summary

This document provides a **comprehensive, production-ready design** for building an enterprise ERP dashboard powered entirely by Supabase. It maps every Supabase table to UI components, leverages Realtime subscriptions, Row Level Security (RLS), materialized views, and Postgres functions to deliver a world-class ERP experience aligned with the Cell Mesh Architecture and Neo-Analog design system.

**Design Philosophy:** Think like a database architect creating the ultimate ERP system. Every table, every view, every function serves a purpose in delivering real-time, secure, performant dashboards.

---

## Table of Contents

1. [Database Architecture Overview](#1-database-architecture-overview)
2. [Dashboard Layout & Navigation](#2-dashboard-layout--navigation)
3. [Real-Time KPI Dashboard](#3-real-time-kpi-dashboard)
4. [Frozen Pane Data Grids](#4-frozen-pane-data-grids)
5. [Kanban Boards](#5-kanban-boards)
6. [Gantt Charts](#6-gantt-charts)
7. [Case Management](#7-case-management)
8. [Invoice & Payment Management](#8-invoice--payment-management)
9. [Vendor Portal](#9-vendor-portal)
10. [Financial Reporting](#10-financial-reporting)
11. [Audit & Compliance](#11-audit--compliance)
12. [Metadata & Lineage](#12-metadata--lineage)
13. [Notifications & Activity Stream](#13-notifications--activity-stream)
14. [Performance Optimization](#14-performance-optimization)
15. [Implementation Roadmap](#15-implementation-roadmap)

---

## 1. Database Architecture Overview

### 1.1 Core ERP Modules (Supabase Tables)

#### **Financial Management**
- `vmp_invoices` — Invoice records (Shadow Ledger)
- `vmp_payments` — Payment transactions
- `vmp_statements` — Account statements
- `vmp_debit_notes` — Debit note records
- `vmp_soa_items` — Statement of Account line items
- `vmp_soa_matches` — SOA-to-invoice matching
- `vmp_soa_discrepancies` — Reconciliation exceptions
- `nexus_invoices` — Nexus invoice system
- `nexus_payments` — Nexus payment system
- `nexus_payment_schedule` — Recurring payment schedules

#### **Vendor Management**
- `vmp_vendors` — Vendor master data
- `vmp_companies` — Company/legal entities
- `vmp_vendor_company_links` — Vendor-company relationships
- `vmp_vendor_users` — Vendor user accounts
- `vmp_groups` — Company groups (Director View)
- `vmp_tenants` — Top-level tenant isolation
- `nexus_tenants` — Nexus tenant system
- `nexus_tenant_relationships` — Client-vendor relationships

#### **Procurement**
- `vmp_po_refs` — Purchase Order references
- `vmp_grn_refs` — Goods Receipt Note references
- `vmp_orders` — Order records (if exists)

#### **Case Management**
- `vmp_cases` — Case records (onboarding, invoice, payment, SOA, general)
- `vmp_checklist_steps` — Case checklist items
- `vmp_evidence` — Evidence documents
- `vmp_messages` — Case messages
- `nexus_cases` — Nexus case system
- `nexus_case_messages` — Case messaging
- `nexus_case_evidence` — Evidence attachments
- `nexus_case_checklist` — Case checklists
- `nexus_case_activity` — Case activity log

#### **Document Management**
- `documents` — Document storage
- `document_embeddings` — Vector embeddings for search
- `nexus_document_requests` — Document request workflow

#### **Metadata & Governance**
- `mdm_global_metadata` — Global metadata registry
- `mdm_entity_catalog` — Entity catalog
- `mdm_kpi_definition` — KPI definitions
- `mdm_kpi_component` — KPI components
- `mdm_composite_kpi` — Composite KPIs
- `mdm_lineage_node` — Data lineage nodes
- `mdm_lineage_edge` — Data lineage edges
- `mdm_business_rule` — Business rules
- `mdm_approval` — Approval workflows

#### **Notifications & Activity**
- `nexus_notifications` — Notification records
- `nexus_notification_config` — Notification settings
- `nexus_notification_queue` — Notification delivery queue
- `notifications` — Legacy notification system

#### **Audit & Compliance**
- `audit_events` — Audit trail
- `nexus_audit_log` — Nexus audit log
- `vmp_break_glass_events` — Break glass protocol events
- `vmp_emergency_pay_overrides` — Emergency payment overrides

#### **User & Session Management**
- `users` — User accounts
- `nexus_users` — Nexus user system
- `nexus_sessions` — User sessions
- `vmp_sessions` — Legacy sessions
- `vmp_auth_user_mapping` — Auth user mapping

---

## 2. Dashboard Layout & Navigation

### 2.1 Shell Structure (Neo-Analog)

```html
<div class="na-shell">
  <!-- Sidebar: 280px fixed width -->
  <aside class="na-sidebar">
    <!-- Brand -->
    <div class="na-brand">
      <div class="na-mark">ERP</div>
      <div class="na-brand-title">ERP Console</div>
    </div>
    
    <!-- Navigation Sections -->
    <nav class="na-nav">
      <!-- Financial Management -->
      <div class="na-nav-section">FINANCIAL</div>
      <a class="na-nav-item is-active" href="#dashboard">
        <span>Dashboard</span>
        <span class="na-nav-meta">LIVE</span>
      </a>
      <a class="na-nav-item" href="#invoices">
        <span>Invoices</span>
        <span class="na-status warn na-badge-small">12</span>
      </a>
      <a class="na-nav-item" href="#payments">
        <span>Payments</span>
      </a>
      <a class="na-nav-item" href="#reconciliation">
        <span>Reconciliation</span>
        <span class="na-status warn na-badge-small">3</span>
      </a>
      
      <!-- Vendor Management -->
      <div class="na-nav-section">VENDORS</div>
      <a class="na-nav-item" href="#vendors">
        <span>Vendor Directory</span>
      </a>
      <a class="na-nav-item" href="#onboarding">
        <span>Onboarding</span>
        <span class="na-status pending na-badge-small">5</span>
      </a>
      
      <!-- Case Management -->
      <div class="na-nav-section">CASES</div>
      <a class="na-nav-item" href="#cases">
        <span>Case Queue</span>
        <span class="na-status warn na-badge-small">8</span>
      </a>
      
      <!-- Procurement -->
      <div class="na-nav-section">PROCUREMENT</div>
      <a class="na-nav-item" href="#purchase-orders">
        <span>Purchase Orders</span>
      </a>
      <a class="na-nav-item" href="#goods-receipt">
        <span>Goods Receipt</span>
      </a>
      
      <!-- Reporting -->
      <div class="na-nav-section">REPORTING</div>
      <a class="na-nav-item" href="#financial-reports">
        <span>Financial Reports</span>
      </a>
      <a class="na-nav-item" href="#analytics">
        <span>Analytics</span>
      </a>
    </nav>
  </aside>
  
  <!-- Main Content Area -->
  <main class="na-main">
    <header class="na-header">
      <!-- Search -->
      <div class="na-search">
        <input class="na-search-input" type="search" placeholder="Search invoices, vendors, cases..." />
      </div>
      
      <!-- Header Actions -->
      <div class="na-header-actions">
        <button class="na-iconbtn" aria-label="Notifications">
          <span>🔔</span>
          <span class="na-dot"></span>
        </button>
        <button class="na-avatar" aria-label="User menu"></button>
      </div>
    </header>
    
    <!-- Content -->
    <div class="na-content">
      <!-- Dashboard content here -->
    </div>
  </main>
</div>
```

### 2.2 Navigation Badge Data (Supabase Queries)

**Pending Cases Badge:**
```typescript
const { count } = await supabase
  .from('vmp_cases')
  .select('*', { count: 'exact', head: true })
  .eq('tenant_id', tenantId)
  .eq('status', 'open')
  .or('status.eq.waiting_supplier,status.eq.waiting_internal')
```

**Pending Invoices Badge:**
```typescript
const { count } = await supabase
  .from('vmp_invoices')
  .select('*', { count: 'exact', head: true })
  .eq('tenant_id', tenantId)
  .eq('status', 'pending')
```

**Reconciliation Discrepancies:**
```typescript
const { count } = await supabase
  .from('vmp_soa_discrepancies')
  .select('*', { count: 'exact', head: true })
  .eq('status', 'open')
  .eq('tenant_id', tenantId)
```

---

## 3. Real-Time KPI Dashboard

### 3.1 KPI Cards Layout

```html
<div class="na-grid na-grid-kpi">
  <!-- Total Revenue -->
  <div class="na-card">
    <div class="na-kpi">
      <div class="na-kpi-icon">💰</div>
      <div class="na-kpi-content">
        <div class="na-kpi-label">TOTAL REVENUE</div>
        <div class="na-kpi-value">$2,847,392</div>
        <div class="na-kpi-row">
          <span class="na-trend up">+12.4%</span>
          <span class="na-metadata">vs last month</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Pending Invoices -->
  <div class="na-card">
    <div class="na-kpi">
      <div class="na-kpi-icon">📄</div>
      <div class="na-kpi-content">
        <div class="na-kpi-label">PENDING INVOICES</div>
        <div class="na-kpi-value">142</div>
        <div class="na-kpi-row">
          <span class="na-trend down">-8.2%</span>
          <span class="na-metadata">vs last week</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Open Cases -->
  <div class="na-card">
    <div class="na-kpi">
      <div class="na-kpi-icon">🎯</div>
      <div class="na-kpi-content">
        <div class="na-kpi-label">OPEN CASES</div>
        <div class="na-kpi-value">28</div>
        <div class="na-kpi-row">
          <span class="na-trend up">+3</span>
          <span class="na-metadata">this week</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Average Payment Time -->
  <div class="na-card">
    <div class="na-kpi">
      <div class="na-kpi-icon">⏱️</div>
      <div class="na-kpi-content">
        <div class="na-kpi-label">AVG PAYMENT TIME</div>
        <div class="na-kpi-value">4.2 days</div>
        <div class="na-kpi-row">
          <span class="na-trend up">-0.8 days</span>
          <span class="na-metadata">improvement</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 3.2 Materialized View for KPIs

**Create Materialized View:**
```sql
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

-- Create unique index for fast lookups
CREATE UNIQUE INDEX idx_dashboard_kpis_tenant ON dashboard_kpis(tenant_id);

-- Refresh every 5 minutes via pg_cron
SELECT cron.schedule(
  'refresh-dashboard-kpis',
  '*/5 * * * *',
  'REFRESH MATERIALIZED VIEW CONCURRENTLY dashboard_kpis'
);
```

**Query KPI Data:**
```typescript
const { data, error } = await supabase
  .from('dashboard_kpis')
  .select('*')
  .eq('tenant_id', tenantId)
  .single()

// Calculate trend
const revenueTrend = ((data.total_revenue_30d - data.revenue_previous_period) / data.revenue_previous_period) * 100
```

### 3.3 Real-Time KPI Updates

**Subscribe to Payment Updates:**
```typescript
const kpiChannel = supabase
  .channel('dashboard-kpis')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'vmp_payments',
    filter: `tenant_id=eq.${tenantId}`
  }, (payload) => {
    // Update revenue KPI
    updateKPI('revenue', payload.new.amount)
  })
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'vmp_invoices',
    filter: `tenant_id=eq.${tenantId}&status=eq.pending`
  }, (payload) => {
    // Update pending invoices count
    updateKPI('pending_invoices', payload.new.status === 'pending' ? 1 : -1)
  })
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'vmp_cases',
    filter: `tenant_id=eq.${tenantId}&status=eq.open`
  }, (payload) => {
    // Update open cases count
    updateKPI('open_cases', 1)
  })
  .subscribe()
```

---

## 4. Frozen Pane Data Grids

### 4.1 Invoice Grid (Frozen First Column + Header)

**HTML Structure:**
```html
<div class="na-table-wrap">
  <div class="na-table-header">
    <h2 class="na-h3">Invoices</h2>
    <div class="na-table-actions">
      <button class="na-btn">Export</button>
      <button class="na-btn-primary">New Invoice</button>
    </div>
  </div>
  
  <div class="na-super-grid-container">
    <table class="na-super-grid">
      <thead>
        <tr>
          <th>Invoice #</th>
          <th>Vendor</th>
          <th>Company</th>
          <th>Date</th>
          <th>Due Date</th>
          <th>Amount</th>
          <th>Currency</th>
          <th>Status</th>
          <th>PO Ref</th>
          <th>GRN Ref</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Rows populated via Supabase -->
      </tbody>
    </table>
  </div>
</div>
```

**Supabase Query with Pagination:**
```typescript
const fetchInvoices = async (page: number = 0, pageSize: number = 100) => {
  const from = page * pageSize
  const to = from + pageSize - 1
  
  const { data, error, count } = await supabase
    .from('vmp_invoices')
    .select(`
      *,
      vendor:vmp_vendors(name),
      company:vmp_companies(name)
    `, { count: 'exact' })
    .eq('tenant_id', tenantId)
    .order('invoice_date', { ascending: false })
    .range(from, to)
  
  return { data, total: count }
}
```

**Real-Time Grid Updates:**
```typescript
const invoiceGridChannel = supabase
  .channel('invoice-grid')
  .on('postgres_changes', {
    event: '*', // INSERT, UPDATE, DELETE
    schema: 'public',
    table: 'vmp_invoices',
    filter: `tenant_id=eq.${tenantId}`
  }, (payload) => {
    if (payload.eventType === 'INSERT') {
      // Add new row to grid
      addRowToGrid(payload.new)
    } else if (payload.eventType === 'UPDATE') {
      // Update existing row
      updateRowInGrid(payload.new.id, payload.new)
    } else if (payload.eventType === 'DELETE') {
      // Remove row from grid
      removeRowFromGrid(payload.old.id)
    }
  })
  .subscribe()
```

### 4.2 Inline CRUD Editing

**Enable Content Editable:**
```typescript
const enableInlineEdit = (cell: HTMLElement, invoiceId: string, field: string) => {
  cell.contentEditable = 'true'
  cell.addEventListener('blur', async () => {
    const newValue = cell.textContent
    
    // Optimistic update
    cell.classList.add('is-updating')
    
    // Supabase update
    const { error } = await supabase
      .from('vmp_invoices')
      .update({ [field]: newValue })
      .eq('id', invoiceId)
      .eq('tenant_id', tenantId)
    
    if (error) {
      // Rollback on error
      cell.textContent = cell.dataset.originalValue
      showToast('error', 'Update failed')
    } else {
      cell.classList.remove('is-updating')
      showToast('success', 'Updated')
    }
  })
}
```

---

## 5. Kanban Boards

### 5.1 Case Management Kanban

**Database Schema for Kanban:**
```sql
-- Add column_id to vmp_cases (or use status as column mapping)
ALTER TABLE vmp_cases 
ADD COLUMN IF NOT EXISTS kanban_column TEXT DEFAULT 'open';

-- Kanban columns: 'open', 'in_progress', 'waiting', 'resolved'
```

**HTML Structure:**
```html
<div class="na-kanban">
  <!-- Open Column -->
  <div class="na-kanban-column">
    <div class="na-kanban-header">
      <h3 class="na-h4">Open</h3>
      <span class="na-status">12</span>
    </div>
    <div class="na-kanban-body">
      <!-- Cards populated via Supabase -->
      <div class="na-kanban-card" draggable="true" data-case-id="...">
        <div class="na-kanban-card-title">Invoice Discrepancy</div>
        <div class="na-kanban-card-meta">Vendor: ABC Corp</div>
        <div class="na-kanban-card-status">
          <span class="na-status warn">High Priority</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- In Progress Column -->
  <div class="na-kanban-column">
    <div class="na-kanban-header">
      <h3 class="na-h4">In Progress</h3>
      <span class="na-status">8</span>
    </div>
    <div class="na-kanban-body">
      <!-- Cards -->
    </div>
  </div>
  
  <!-- Waiting Column -->
  <div class="na-kanban-column">
    <div class="na-kanban-header">
      <h3 class="na-h4">Waiting</h3>
      <span class="na-status">5</span>
    </div>
    <div class="na-kanban-body">
      <!-- Cards -->
    </div>
  </div>
  
  <!-- Resolved Column -->
  <div class="na-kanban-column">
    <div class="na-kanban-header">
      <h3 class="na-h4">Resolved</h3>
      <span class="na-status">23</span>
    </div>
    <div class="na-kanban-body">
      <!-- Cards -->
    </div>
  </div>
</div>
```

**Fetch Cases by Column:**
```typescript
const fetchKanbanCases = async () => {
  const { data } = await supabase
    .from('vmp_cases')
    .select(`
      *,
      vendor:vmp_vendors(name),
      company:vmp_companies(name),
      assigned_user:vmp_vendor_users(display_name)
    `)
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
  
  // Group by kanban_column
  const columns = {
    open: data.filter(c => c.kanban_column === 'open'),
    in_progress: data.filter(c => c.kanban_column === 'in_progress'),
    waiting: data.filter(c => c.kanban_column === 'waiting'),
    resolved: data.filter(c => c.kanban_column === 'resolved')
  }
  
  return columns
}
```

**Drag & Drop Handler:**
```typescript
const handleCardDrop = async (caseId: string, newColumn: string) => {
  // Optimistic update
  moveCardLocally(caseId, newColumn)
  
  // Supabase update
  const { error } = await supabase
    .from('vmp_cases')
    .update({ 
      kanban_column: newColumn,
      status: mapColumnToStatus(newColumn),
      updated_at: new Date().toISOString()
    })
    .eq('id', caseId)
    .eq('tenant_id', tenantId)
  
  if (error) {
    // Rollback
    revertCardMove(caseId)
    showToast('error', 'Move failed')
  }
}
```

**Real-Time Kanban Sync:**
```typescript
const kanbanChannel = supabase
  .channel('kanban-cases')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'vmp_cases',
    filter: `tenant_id=eq.${tenantId}`
  }, (payload) => {
    // Only update if changed by another user
    if (payload.new.updated_by !== currentUserId) {
      moveCardRemotely(payload.new.id, payload.new.kanban_column)
    }
  })
  .subscribe()
```

---

## 6. Gantt Charts

### 6.1 Payment Schedule Gantt

**Database Schema:**
```sql
-- Use nexus_payment_schedule or create tasks table
CREATE TABLE IF NOT EXISTS payment_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  invoice_id UUID REFERENCES vmp_invoices(id),
  task_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  assignee_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**HTML Structure:**
```html
<div class="na-gantt">
  <!-- Sidebar -->
  <div class="na-gantt-sidebar">
    <div class="na-gantt-task">
      <div class="na-gantt-task-name">Invoice #INV-001</div>
      <div class="na-gantt-task-meta">Vendor: ABC Corp</div>
    </div>
    <!-- More tasks -->
  </div>
  
  <!-- Timeline -->
  <div class="na-gantt-timeline">
    <div class="na-gantt-header">
      <!-- Month/week headers -->
    </div>
    <div class="na-gantt-bars">
      <!-- Task bars -->
      <div class="na-gantt-bar" style="left: 10%; width: 15%;">
        <div class="na-gantt-bar-fill"></div>
      </div>
    </div>
  </div>
</div>
```

**Fetch Tasks for Gantt:**
```typescript
const fetchGanttTasks = async (startDate: Date, endDate: Date) => {
  const { data } = await supabase
    .from('payment_tasks')
    .select(`
      *,
      invoice:vmp_invoices(invoice_num, vendor_id),
      vendor:vmp_vendors(name)
    `)
    .eq('tenant_id', tenantId)
    .gte('start_date', startDate.toISOString().split('T')[0])
    .lte('end_date', endDate.toISOString().split('T')[0])
    .order('start_date')
  
  return data
}
```

**Real-Time Gantt Updates:**
```typescript
const ganttChannel = supabase
  .channel('gantt-tasks')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'payment_tasks',
    filter: `tenant_id=eq.${tenantId}`
  }, (payload) => {
    // Update task bar position/size
    updateGanttBar(payload.new.id, {
      start: payload.new.start_date,
      end: payload.new.end_date
    })
  })
  .subscribe()
```

---

## 7. Case Management

### 7.1 Case List View

**Query Cases:**
```typescript
const fetchCases = async (filters: {
  status?: string,
  case_type?: string,
  vendor_id?: string
}) => {
  let query = supabase
    .from('vmp_cases')
    .select(`
      *,
      vendor:vmp_vendors(name, status),
      company:vmp_companies(name),
      assigned_user:vmp_vendor_users(display_name),
      linked_invoice:vmp_invoices(invoice_num, amount),
      linked_payment:vmp_payments(payment_ref, amount)
    `)
    .eq('tenant_id', tenantId)
  
  if (filters.status) query = query.eq('status', filters.status)
  if (filters.case_type) query = query.eq('case_type', filters.case_type)
  if (filters.vendor_id) query = query.eq('vendor_id', filters.vendor_id)
  
  const { data } = await query.order('created_at', { ascending: false })
  return data
}
```

### 7.2 Case Detail View

**Fetch Case with Related Data:**
```typescript
const fetchCaseDetail = async (caseId: string) => {
  const { data: caseData } = await supabase
    .from('vmp_cases')
    .select(`
      *,
      vendor:vmp_vendors(*),
      company:vmp_companies(*),
      assigned_user:vmp_vendor_users(*),
      checklist:vmp_checklist_steps(*),
      evidence:vmp_evidence(*),
      messages:vmp_messages(*)
    `)
    .eq('id', caseId)
    .single()
  
  return caseData
}
```

**Real-Time Case Activity:**
```typescript
const caseActivityChannel = supabase
  .channel(`case-${caseId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'nexus_case_activity',
    filter: `case_id=eq.${caseId}`
  }, (payload) => {
    // Add activity item to timeline
    addActivityItem(payload.new)
  })
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'nexus_case_messages',
    filter: `case_id=eq.${caseId}`
  }, (payload) => {
    // Add message to chat
    addMessage(payload.new)
  })
  .subscribe()
```

---

## 8. Invoice & Payment Management

### 8.1 Invoice List with Filters

**Advanced Query with Filters:**
```typescript
const fetchInvoices = async (filters: {
  status?: string[],
  vendor_id?: string,
  date_from?: string,
  date_to?: string,
  amount_min?: number,
  amount_max?: number
}) => {
  let query = supabase
    .from('vmp_invoices')
    .select(`
      *,
      vendor:vmp_vendors(name, tax_id),
      company:vmp_companies(name, currency_code),
      payments:vmp_payments(*)
    `)
    .eq('tenant_id', tenantId)
  
  if (filters.status?.length) {
    query = query.in('status', filters.status)
  }
  if (filters.vendor_id) {
    query = query.eq('vendor_id', filters.vendor_id)
  }
  if (filters.date_from) {
    query = query.gte('invoice_date', filters.date_from)
  }
  if (filters.date_to) {
    query = query.lte('invoice_date', filters.date_to)
  }
  if (filters.amount_min) {
    query = query.gte('amount', filters.amount_min)
  }
  if (filters.amount_max) {
    query = query.lte('amount', filters.amount_max)
  }
  
  const { data } = await query.order('invoice_date', { ascending: false })
  return data
}
```

### 8.2 Payment Matching (3-Way Match)

**Match Invoice to PO and GRN:**
```typescript
const matchInvoice = async (invoiceId: string, poRef: string, grnRef: string) => {
  // Check if PO exists
  const { data: po } = await supabase
    .from('vmp_po_refs')
    .select('*')
    .eq('po_number', poRef)
    .single()
  
  // Check if GRN exists
  const { data: grn } = await supabase
    .from('vmp_grn_refs')
    .select('*')
    .eq('grn_number', grnRef)
    .single()
  
  // Update invoice status
  const { error } = await supabase
    .from('vmp_invoices')
    .update({
      status: 'matched',
      po_ref: poRef,
      grn_ref: grnRef
    })
    .eq('id', invoiceId)
  
  return { success: !error, po, grn }
}
```

---

## 9. Vendor Portal

### 9.1 Vendor Directory

**Fetch Vendors with Stats:**
```typescript
const fetchVendors = async () => {
  const { data } = await supabase
    .from('vmp_vendors')
    .select(`
      *,
      companies:vmp_vendor_company_links(
        company:vmp_companies(name),
        status,
        erp_vendor_code
      ),
      invoice_count:invoices(count),
      total_invoice_amount:invoices(sum(amount))
    `)
    .eq('tenant_id', tenantId)
    .order('name')
  
  return data
}
```

### 9.2 Vendor Onboarding Checklist

**Fetch Checklist Steps:**
```typescript
const fetchOnboardingChecklist = async (caseId: string) => {
  const { data } = await supabase
    .from('vmp_checklist_steps')
    .select(`
      *,
      evidence:vmp_evidence(*)
    `)
    .eq('case_id', caseId)
    .order('created_at')
  
  return data
}
```

---

## 10. Financial Reporting

### 10.1 Revenue Report (Materialized View)

**Create Revenue Report View:**
```sql
CREATE MATERIALIZED VIEW revenue_report AS
SELECT 
  tenant_id,
  DATE_TRUNC('month', paid_date) as month,
  COUNT(*) as payment_count,
  SUM(amount) as total_revenue,
  AVG(amount) as avg_payment,
  COUNT(DISTINCT vendor_id) as vendor_count,
  COUNT(DISTINCT company_id) as company_count
FROM vmp_payments
WHERE status = 'completed'
  AND paid_date IS NOT NULL
GROUP BY tenant_id, DATE_TRUNC('month', paid_date)
ORDER BY month DESC;

CREATE UNIQUE INDEX idx_revenue_report_tenant_month 
ON revenue_report(tenant_id, month);
```

**Query Revenue Report:**
```typescript
const fetchRevenueReport = async (year: number) => {
  const { data } = await supabase
    .from('revenue_report')
    .select('*')
    .eq('tenant_id', tenantId)
    .gte('month', `${year}-01-01`)
    .lt('month', `${year + 1}-01-01`)
    .order('month')
  
  return data
}
```

### 10.2 Aging Report

**Create Aging Report Function:**
```sql
CREATE OR REPLACE FUNCTION aging_report(p_tenant_id UUID)
RETURNS TABLE (
  vendor_id UUID,
  vendor_name TEXT,
  current_0_30 NUMERIC,
  days_31_60 NUMERIC,
  days_61_90 NUMERIC,
  days_91_plus NUMERIC,
  total_outstanding NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    v.id,
    v.name,
    COALESCE(SUM(i.amount) FILTER (
      WHERE i.due_date >= CURRENT_DATE - INTERVAL '30 days'
    ), 0) as current_0_30,
    COALESCE(SUM(i.amount) FILTER (
      WHERE i.due_date >= CURRENT_DATE - INTERVAL '60 days'
      AND i.due_date < CURRENT_DATE - INTERVAL '30 days'
    ), 0) as days_31_60,
    COALESCE(SUM(i.amount) FILTER (
      WHERE i.due_date >= CURRENT_DATE - INTERVAL '90 days'
      AND i.due_date < CURRENT_DATE - INTERVAL '60 days'
    ), 0) as days_61_90,
    COALESCE(SUM(i.amount) FILTER (
      WHERE i.due_date < CURRENT_DATE - INTERVAL '90 days'
    ), 0) as days_91_plus,
    COALESCE(SUM(i.amount), 0) as total_outstanding
  FROM vmp_vendors v
  LEFT JOIN vmp_invoices i ON i.vendor_id = v.id
    AND i.tenant_id = p_tenant_id
    AND i.status = 'pending'
  WHERE v.tenant_id = p_tenant_id
  GROUP BY v.id, v.name
  HAVING COALESCE(SUM(i.amount), 0) > 0
  ORDER BY total_outstanding DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Call Aging Report:**
```typescript
const { data } = await supabase.rpc('aging_report', {
  p_tenant_id: tenantId
})
```

---

## 11. Audit & Compliance

### 11.1 Audit Trail View

**Fetch Audit Events:**
```typescript
const fetchAuditTrail = async (filters: {
  table_name?: string,
  user_id?: string,
  date_from?: string,
  date_to?: string
}) => {
  let query = supabase
    .from('audit_events')
    .select(`
      *,
      user:users(email, display_name)
    `)
    .order('created_at', { ascending: false })
    .limit(1000)
  
  if (filters.table_name) {
    query = query.eq('table_name', filters.table_name)
  }
  if (filters.user_id) {
    query = query.eq('user_id', filters.user_id)
  }
  if (filters.date_from) {
    query = query.gte('created_at', filters.date_from)
  }
  if (filters.date_to) {
    query = query.lte('created_at', filters.date_to)
  }
  
  const { data } = await query
  return data
}
```

### 11.2 Break Glass Events

**Fetch Break Glass Events:**
```typescript
const fetchBreakGlassEvents = async () => {
  const { data } = await supabase
    .from('vmp_break_glass_events')
    .select(`
      *,
      case:vmp_cases(subject, status),
      user:vmp_vendor_users(display_name),
      director:vmp_vendor_users(display_name)
    `)
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
  
  return data
}
```

---

## 12. Metadata & Lineage

### 12.1 Data Lineage Visualization

**Fetch Lineage Graph:**
```typescript
const fetchLineage = async (entityUrn: string) => {
  // Get node
  const { data: node } = await supabase
    .from('mdm_lineage_node')
    .select('*')
    .eq('urn', entityUrn)
    .single()
  
  // Get upstream edges (what produces this)
  const { data: upstream } = await supabase
    .from('mdm_lineage_edge')
    .select(`
      *,
      source:mdm_lineage_node!source_urn(*)
    `)
    .eq('target_urn', entityUrn)
  
  // Get downstream edges (what consumes this)
  const { data: downstream } = await supabase
    .from('mdm_lineage_edge')
    .select(`
      *,
      target:mdm_lineage_node!target_urn(*)
    `)
    .eq('source_urn', entityUrn)
  
  return {
    node,
    upstream,
    downstream
  }
}
```

### 12.2 KPI Definition Viewer

**Fetch KPI Definitions:**
```typescript
const fetchKPIDefinitions = async () => {
  const { data } = await supabase
    .from('mdm_kpi_definition')
    .select(`
      *,
      components:mdm_kpi_component(*),
      primary_metadata:mdm_global_metadata(*)
    `)
    .eq('tenant_id', tenantId)
    .eq('status', 'active')
    .order('name')
  
  return data
}
```

---

## 13. Notifications & Activity Stream

### 13.1 Real-Time Notification Feed

**Subscribe to Notifications:**
```typescript
const notificationChannel = supabase
  .channel('user-notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'nexus_notifications',
    filter: `user_id=eq.${userId}&is_read=eq.false`
  }, (payload) => {
    // Show toast notification
    showToast(payload.new.notification_type, payload.new.title, payload.new.body)
    
    // Update notification badge
    updateNotificationBadge(1)
  })
  .subscribe()
```

**Fetch Unread Notifications:**
```typescript
const fetchUnreadNotifications = async () => {
  const { data } = await supabase
    .from('nexus_notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('is_read', false)
    .order('created_at', { ascending: false })
    .limit(50)
  
  return data
}
```

### 13.2 Activity Stream

**Fetch Activity Stream:**
```typescript
const fetchActivityStream = async (limit: number = 50) => {
  const { data } = await supabase
    .from('nexus_case_activity')
    .select(`
      *,
      case:nexus_cases(subject, case_type),
      actor:nexus_users(display_name, avatar_url)
    `)
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  return data
}
```

**Real-Time Activity Updates:**
```typescript
const activityChannel = supabase
  .channel('activity-stream')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'nexus_case_activity',
    filter: `tenant_id=eq.${tenantId}`
  }, (payload) => {
    // Prepend to activity feed
    prependActivityItem(payload.new)
  })
  .subscribe()
```

---

## 14. Performance Optimization

### 14.1 Indexing Strategy

**Critical Indexes:**
```sql
-- Tenant-scoped queries (most common)
CREATE INDEX idx_vmp_invoices_tenant_status 
ON vmp_invoices(tenant_id, status);

CREATE INDEX idx_vmp_invoices_tenant_date 
ON vmp_invoices(tenant_id, invoice_date DESC);

CREATE INDEX idx_vmp_cases_tenant_status 
ON vmp_cases(tenant_id, status);

CREATE INDEX idx_vmp_payments_tenant_date 
ON vmp_payments(tenant_id, payment_date DESC);

-- Party context queries
CREATE INDEX idx_vmp_invoices_vendor_tenant 
ON vmp_invoices(vendor_id, tenant_id);

CREATE INDEX idx_vmp_invoices_company_tenant 
ON vmp_invoices(company_id, tenant_id);

-- Real-time subscriptions (for RLS performance)
CREATE INDEX idx_vmp_invoices_tenant_realtime 
ON vmp_invoices(tenant_id) 
WHERE status IN ('pending', 'matched');

-- Full-text search
CREATE INDEX idx_vmp_invoices_invoice_num_gin 
ON vmp_invoices USING gin(invoice_num gin_trgm_ops);

-- Composite indexes for common filters
CREATE INDEX idx_vmp_cases_tenant_type_status 
ON vmp_cases(tenant_id, case_type, status);
```

### 14.2 Query Optimization Patterns

**Use Select with Specific Fields:**
```typescript
// ✅ Good: Select only needed fields
const { data } = await supabase
  .from('vmp_invoices')
  .select('id, invoice_num, amount, status, invoice_date')
  .eq('tenant_id', tenantId)

// ❌ Bad: Select all fields
const { data } = await supabase
  .from('vmp_invoices')
  .select('*')
  .eq('tenant_id', tenantId)
```

**Use Pagination:**
```typescript
// ✅ Good: Paginated query
const { data } = await supabase
  .from('vmp_invoices')
  .select('*')
  .eq('tenant_id', tenantId)
  .range(0, 99) // First 100 rows

// ❌ Bad: Fetch all rows
const { data } = await supabase
  .from('vmp_invoices')
  .select('*')
  .eq('tenant_id', tenantId)
```

**Use Materialized Views for Aggregations:**
```typescript
// ✅ Good: Pre-computed aggregations
const { data } = await supabase
  .from('dashboard_kpis')
  .select('*')
  .eq('tenant_id', tenantId)
  .single()

// ❌ Bad: Real-time aggregation
const { data } = await supabase
  .from('vmp_invoices')
  .select('amount')
  .eq('tenant_id', tenantId)
  .eq('status', 'paid')
// Then sum in JavaScript
```

### 14.3 Caching Strategy

**Layer 1: Materialized Views** (Database-level)
- Refresh every 5 minutes via pg_cron
- Pre-computed aggregations for KPIs

**Layer 2: Client-Side Caching** (React Query / SWR)
```typescript
// React Query example
const { data } = useQuery({
  queryKey: ['invoices', tenantId],
  queryFn: () => fetchInvoices(tenantId),
  staleTime: 30000, // 30 seconds
  cacheTime: 300000 // 5 minutes
})
```

**Layer 3: CDN Caching** (Static configs)
- Dashboard configuration
- Metadata definitions
- Business rules

---

## 15. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- ✅ Enable RLS on all tables
- ✅ Create tenant isolation policies
- ✅ Set up Realtime publications
- ✅ Create materialized views for KPIs
- ✅ Build basic dashboard layout

### Phase 2: Core Features (Weeks 3-4)
- ✅ Implement frozen pane invoice grid
- ✅ Build case management kanban
- ✅ Add real-time KPI updates
- ✅ Create invoice detail view
- ✅ Implement payment matching

### Phase 3: Advanced Views (Weeks 5-6)
- ✅ Build Gantt chart for payment schedules
- ✅ Implement reconciliation dashboard
- ✅ Add vendor portal
- ✅ Create financial reports
- ✅ Build audit trail viewer

### Phase 4: Real-Time & Polish (Weeks 7-8)
- ✅ Add real-time notifications
- ✅ Implement activity stream
- ✅ Optimize query performance
- ✅ Add client-side caching
- ✅ Polish UI/UX

---

## Conclusion

This comprehensive design document provides a **production-ready blueprint** for building an enterprise ERP dashboard powered by Supabase. Every component, every query, every real-time subscription is designed to leverage Supabase's strengths while maintaining the Cell Mesh Architecture principles and Neo-Analog design system standards.

**Key Takeaways:**
- ✅ **Real-time everywhere** via Supabase Realtime subscriptions
- ✅ **Security first** with RLS policies on every table
- ✅ **Performance optimized** with materialized views and indexes
- ✅ **Scalable architecture** aligned with Cell Mesh principles
- ✅ **Beautiful UI** using Neo-Analog design tokens

**Next Steps:**
1. Review and approve this design document
2. Set up Supabase project with required tables
3. Implement Phase 1 foundation
4. Iterate based on user feedback

---

**Document Version:** 2.0  
**Last Updated:** 2025-01-27  
**Status:** ✅ Ready for Implementation

