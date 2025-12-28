# Figma + shadcn + GitHub MCP Integration Guide

**Date**: 2025-01-27  
**Purpose**: Complete workflow for using Figma MCP, shadcn MCP, and GitHub MCP together  
**Target**: Advanced Data Visualization Design System

---

## Overview

This guide demonstrates how to use **three MCP servers together** to:
1. **Figma MCP**: Extract design patterns from Figma files
2. **shadcn MCP**: Find matching components and examples
3. **GitHub MCP**: Manage code, create components, and track implementation

---

## Target Figma File

**URL**: https://www.figma.com/community/file/1258847030939461287/advanced-data-visualization  
**File Key**: `1258847030939461287`  
**Theme**: Advanced Data Visualization

---

## Workflow: Three-MCP Integration

### Phase 1: Figma Analysis (Figma MCP)

#### Step 1.1: Verify Access

**Check Authentication**:
```
"Check Figma MCP authentication status"
```

**If Access Denied**:
1. Get Figma Personal Access Token
2. Ensure you have access to the file
3. Verify file permissions

#### Step 1.2: Get File Structure

**Command**:
```
"Get metadata for Figma file 1258847030939461287, starting from page node"
```

**Expected Output**:
- Page hierarchy
- Component structure
- Node IDs for key components

#### Step 1.3: Extract Component Designs

**For Each Component**:
```
"Get design context for [component-name] in Figma file 1258847030939461287 node [nodeId]"
"Extract design variables for this component"
"Get screenshot for visual reference"
```

**Components to Analyze**:
- Charts (Area, Bar, Line)
- Data Tables
- Dashboard Layouts
- Cards/Widgets
- Navigation Components

---

### Phase 2: shadcn Component Discovery (shadcn MCP)

#### Step 2.1: Search for Matching Components

**Based on Figma Analysis**:

**Data Visualization Components**:
```
"Search for chart components in shadcn"
"Search for data table components"
"Search for dashboard components"
```

**Found Components**:
- ✅ `dashboard-01` - Complete dashboard with charts and data table
- ✅ `data-table-demo` - Advanced data table
- ✅ `table` - Base table component
- ✅ `chart` - Chart components (via recharts integration)

#### Step 2.2: Get Component Examples

**Command**:
```
"Get examples for dashboard-01 block"
"Get examples for data-table-demo"
"Show me chart integration examples"
```

#### Step 2.3: Get Add Commands

**Command**:
```
"Get add command for dashboard-01 block"
"Get add commands for table, card, and chart components"
```

---

### Phase 3: Implementation (GitHub MCP)

#### Step 3.1: Create Component Branch

**Command**:
```
"Create branch feature/data-visualization-dashboard from main"
```

#### Step 3.2: Add shadcn Components

**Via shadcn MCP**:
```
"Add dashboard-01 block to the project"
"Add table, card, and chart components"
```

**Or via GitHub MCP**:
- Create files based on shadcn examples
- Customize with design system classes

#### Step 3.3: Create Integration Components

**Using GitHub MCP**:
```
"Create component file components/ui/data-visualization-dashboard.tsx"
"Apply design system classes to match Figma design"
```

#### Step 3.4: Commit and Create PR

**Command**:
```
"Commit changes with message: Add data visualization dashboard from Figma design"
"Create pull request for data visualization implementation"
```

---

## Complete Integration Example

### Example: Data Visualization Dashboard

#### 1. Figma Analysis (Figma MCP)

```javascript
// Extract from Figma
const figmaDesign = await mcp_Figma_get_design_context({
  fileKey: "1258847030939461287",
  nodeId: "dashboard-component-id"
})

// Extract variables
const variables = await mcp_Figma_get_variable_defs({
  fileKey: "1258847030939461287",
  nodeId: "dashboard-component-id"
})

// Get screenshot for reference
const screenshot = await mcp_Figma_get_screenshot({
  fileKey: "1258847030939461287",
  nodeId: "dashboard-component-id"
})
```

**Extracted Design Tokens**:
- Colors: Primary (#eab308), Background (#121214)
- Spacing: Card padding (24px), Grid gap (24px)
- Typography: Headings (Inter, 700), Data (Monospace)
- Charts: Area charts, Bar charts, Line charts

#### 2. shadcn Component Discovery

```javascript
// Search for dashboard
const dashboard = await mcp_shadcn_search_items_in_registries({
  registries: ["@shadcn"],
  query: "dashboard"
})

// Get dashboard example
const dashboardExample = await mcp_shadcn_get_item_examples_from_registries({
  registries: ["@shadcn"],
  query: "dashboard-01"
})

// Get table component
const table = await mcp_shadcn_search_items_in_registries({
  registries: ["@shadcn"],
  query: "data-table"
})
```

**Found**:
- `dashboard-01` - Complete dashboard block
- `data-table-demo` - Advanced table with sorting/filtering
- `chart` components - For data visualization

#### 3. GitHub Implementation

```javascript
// Create branch
await mcp_github_create_branch({
  owner: "your-org",
  repo: "your-repo",
  branch: "feature/data-viz-dashboard",
  from_branch: "main"
})

// Add shadcn components
// (via shadcn MCP add commands)

// Create integration component
await mcp_github_create_or_update_file({
  owner: "your-org",
  repo: "your-repo",
  path: "components/ui/data-viz-dashboard.tsx",
  content: integrationCode,
  message: "Add data visualization dashboard from Figma",
  branch: "feature/data-viz-dashboard"
})

// Create PR
await mcp_github_create_pull_request({
  owner: "your-org",
  repo: "your-repo",
  title: "Add Data Visualization Dashboard",
  head: "feature/data-viz-dashboard",
  base: "main",
  body: "Implements dashboard from Figma design using shadcn components"
})
```

---

## Recommended shadcn Components for Data Visualization

### Core Components

1. **`dashboard-01`** ⭐ **RECOMMENDED**
   - Complete dashboard block
   - Includes sidebar, charts, data table
   - Perfect for data visualization projects

2. **`data-table-demo`** ⭐ **RECOMMENDED**
   - Advanced data table
   - Sorting, filtering, pagination
   - Drag-and-drop support

3. **`table`** - Base table component
4. **`card`** - Widget containers
5. **`chart`** - Chart components (recharts)

### Supporting Components

6. **`sidebar`** - Navigation sidebar
7. **`tabs`** - Tab navigation
8. **`select`** - Dropdown filters
9. **`input`** - Search/filter inputs
10. **`badge`** - Status indicators

---

## Integration Code Template

### Data Visualization Dashboard Component

```tsx
// components/ui/data-viz-dashboard.tsx
"use client"

import * as React from "react"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive"
import { DataTable } from "@/components/ui/data-table"
import { SectionCards } from "@/components/ui/section-cards"
import { SiteHeader } from "@/components/ui/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Figma Design Tokens → Design System → shadcn
export function DataVizDashboard({ 
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <SidebarProvider
      className={cn("na-shell", className)}
      style={{
        "--sidebar-width": "calc(var(--spacing-6) * 18)", // 288px from Figma
        "--header-height": "calc(var(--spacing-6) * 3)", // 72px from Figma
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Section Cards - Apply design system */}
              <SectionCards className="na-grid" />
              
              {/* Chart - Apply design system */}
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive className="na-card" />
              </div>
              
              {/* Data Table - Apply design system */}
              <DataTable className="na-table" data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

---

## Design System Integration

### Mapping Figma → Design System → shadcn

#### Color Mapping

```typescript
// Figma Variables → Design System → shadcn Theme
const colorMap = {
  // Figma: Primary color
  // Design System: --color-gold
  // shadcn: primary
  primary: "var(--color-gold)",
  
  // Figma: Background
  // Design System: --color-paper
  // shadcn: background
  background: "var(--color-paper)",
  
  // Figma: Text primary
  // Design System: --color-lux
  // shadcn: foreground
  foreground: "var(--color-lux)",
}
```

#### Spacing Mapping

```typescript
// Figma: 24px standard
// Design System: --spacing-6
// shadcn: p-6, gap-6
const spacingMap = {
  cardPadding: "var(--spacing-6)", // 24px
  gridGap: "var(--spacing-6)",     // 24px
  sectionGap: "var(--spacing-8)",  // 32px
}
```

#### Typography Mapping

```typescript
// Figma: Heading styles
// Design System: .na-h1, .na-h2, .na-data
// shadcn: Typography components
const typographyMap = {
  h1: "na-h1",
  h2: "na-h2",
  data: "na-data",
  metadata: "na-metadata",
}
```

---

## Step-by-Step Implementation

### Step 1: Analyze Figma File

**Commands**:
```
"Get metadata for Figma file 1258847030939461287"
"Extract all component node IDs from the file"
"For each component, get design context and variables"
```

### Step 2: Find shadcn Equivalents

**Commands**:
```
"Search for dashboard components in shadcn"
"Search for chart components"
"Search for data table components"
"Get examples for dashboard-01"
```

### Step 3: Create Implementation

**Commands**:
```
"Create branch feature/data-viz-implementation"
"Add shadcn dashboard-01 block"
"Create integration component matching Figma design"
"Apply design system classes"
```

### Step 4: Validate and Deploy

**Commands**:
```
"Compare Figma screenshot with implementation"
"Verify design token mapping"
"Create pull request"
"Link to Figma design file"
```

---

## Component Mapping for Data Visualization

| Figma Component | Design System Class | shadcn Component | Integration |
|-----------------|---------------------|------------------|--------------|
| Dashboard Layout | `.na-shell` | `SidebarProvider` | Apply shell class |
| Chart Container | `.na-card` | `Card` | Apply card class |
| Data Table | `.na-table` | `Table` | Apply table class |
| Widget Card | `.na-card` | `Card` | Apply card class |
| Navigation | `.na-nav` | `Sidebar` | Apply nav class |
| Data Display | `.na-data` | Typography | Apply data class |

---

## Quick Start Commands

### Full Workflow

```
"Analyze Figma file 1258847030939461287 for data visualization components"
"Find matching shadcn components for each Figma component"
"Create integration code applying design system classes"
"Create GitHub branch and implement components"
"Create pull request with Figma design reference"
```

### Individual Steps

**Figma Analysis**:
```
"Get design context for chart component in Figma file 1258847030939461287"
"Extract design variables for data table"
```

**shadcn Discovery**:
```
"Search for chart components in shadcn"
"Get dashboard-01 example code"
```

**GitHub Implementation**:
```
"Create branch for data visualization feature"
"Add shadcn components to project"
"Create integration component"
```

---

## Troubleshooting

### Issue: Figma File Access Denied

**Solution**:
1. Verify Figma authentication: `mcp_Figma_whoami`
2. Check file permissions
3. Ensure you have access to community files
4. Try accessing via Figma web first

### Issue: shadcn Component Not Found

**Solution**:
1. Search with different keywords
2. Check component registry: `mcp_shadcn_list_items_in_registries`
3. Use examples as reference
4. Consider creating custom component

### Issue: Design Token Mismatch

**Solution**:
1. Verify Figma variable names
2. Check design system token mapping
3. Use CSS custom properties
4. Validate with design system tokens

---

## Next Steps

1. **Authenticate Figma Access**:
   - Get Figma Personal Access Token
   - Verify file access permissions
   - Test connection

2. **Extract Components**:
   - Get file structure
   - Extract component designs
   - Get design variables

3. **Map to shadcn**:
   - Find matching components
   - Get examples
   - Plan integration

4. **Implement**:
   - Create components
   - Apply design system
   - Test and validate

---

## Resources

- **Figma MCP**: See `docs/CURSOR_MCP_SETUP.md`
- **shadcn MCP**: See `docs/SHADCN_MCP_DIAGNOSTIC.md`
- **GitHub MCP**: See `docs/GITHUB_MCP_CODESPACES_GUIDE.md`
- **Integration Guide**: See `docs/SHADCN_INTEGRATION_GUIDE.md`

---

**Last Updated**: 2025-01-27  
**Status**: ✅ Ready for Three-MCP Integration

