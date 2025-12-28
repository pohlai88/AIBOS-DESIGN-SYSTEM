# Data Visualization: Figma → shadcn Integration

**Date**: 2025-01-27  
**Target**: Advanced Data Visualization Design System  
**Figma File**: https://www.figma.com/community/file/1258847030939461287/advanced-data-visualization

---

## Executive Summary

Based on the **Advanced Data Visualization** Figma file and your design system, here's how to integrate with shadcn/ui components for data visualization dashboards.

---

## Figma MCP Access Status

**Current Status**: ⚠️ **Limited Access**
- **Plan**: Starter (View seat)
- **Limitation**: Up to 6 tool calls per month
- **Recommendation**: Upgrade to Dev/Full seat for unlimited access

**Workaround**: 
- Use Figma web interface to identify component node IDs
- Manually extract design tokens
- Use Figma MCP selectively for key components

---

## Recommended shadcn Components

### Priority 1: Dashboard Block ⭐

**Component**: `dashboard-01`  
**Description**: Complete dashboard with sidebar, charts, and data table

**Add Command**:
```bash
pnpm dlx shadcn@latest add @shadcn/dashboard-01
```

**Features**:
- ✅ Sidebar navigation
- ✅ Interactive charts (Area charts)
- ✅ Advanced data table
- ✅ Section cards (KPI widgets)
- ✅ Responsive layout

**Design System Integration**:
```tsx
// Apply design system classes
<SidebarProvider className="na-shell">
  <AppSidebar className="na-nav" />
  <SidebarInset className="na-content">
    <SectionCards className="na-grid" />
    <ChartAreaInteractive className="na-card" />
    <DataTable className="na-table" />
  </SidebarInset>
</SidebarProvider>
```

---

### Priority 2: Data Table ⭐

**Component**: `data-table-demo`  
**Description**: Advanced data table with sorting, filtering, pagination

**Add Command**:
```bash
pnpm dlx shadcn@latest add @shadcn/table
```

**Features**:
- ✅ Sorting (ascending/descending)
- ✅ Column filtering
- ✅ Pagination
- ✅ Row selection
- ✅ Column visibility toggle
- ✅ Drag-and-drop reordering

**Design System Integration**:
```tsx
<Table className="na-table">
  <TableHeader className="na-table-header">
    {/* Apply .na-metadata for headers */}
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="na-data">
        {/* Apply .na-data for values */}
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### Priority 3: Chart Components

**Components Needed**:
- `card` - Chart containers
- Chart library integration (recharts)

**Add Commands**:
```bash
pnpm dlx shadcn@latest add @shadcn/card
pnpm add recharts
```

**Design System Integration**:
```tsx
<Card className="na-card">
  <CardHeader>
    <CardTitle className="na-h4">Chart Title</CardTitle>
    <CardDescription className="na-metadata">
      Chart description
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer>
      {/* Recharts components */}
      <AreaChart data={data}>
        {/* Apply design system colors */}
        <Area 
          fill="var(--color-gold)" 
          stroke="var(--color-gold)"
        />
      </AreaChart>
    </ChartContainer>
  </CardContent>
</Card>
```

---

## Complete Component List

### Core Dashboard Components

1. **`dashboard-01`** - Complete dashboard block
2. **`table`** - Base table component
3. **`card`** - Widget containers
4. **`sidebar`** - Navigation sidebar
5. **`tabs`** - Tab navigation

### Data Visualization Components

6. **`chart`** - Chart container (requires recharts)
7. **`badge`** - Status indicators
8. **`select`** - Filter dropdowns
9. **`input`** - Search inputs
10. **`button`** - Action buttons

### Supporting Components

11. **`dropdown-menu`** - Context menus
12. **`dialog`** - Modal dialogs
13. **`separator`** - Dividers
14. **`avatar`** - User avatars

---

## Integration Strategy

### Strategy: Design System as Styling Layer

**Approach**: Use shadcn structure + Design System styling

```tsx
// components/ui/data-viz-dashboard.tsx
"use client"

import { AppSidebar } from "@/components/ui/app-sidebar"
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive"
import { DataTable } from "@/components/ui/data-table"
import { SectionCards } from "@/components/ui/section-cards"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function DataVizDashboard({ className, ...props }) {
  return (
    <SidebarProvider
      className={cn("na-shell", className)}
      style={{
        "--sidebar-width": "calc(var(--spacing-6) * 18)",
        "--header-height": "calc(var(--spacing-6) * 3)",
      } as React.CSSProperties}
    >
      <AppSidebar className="na-nav" variant="inset" />
      <SidebarInset className="na-content">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* KPI Cards - Apply design system */}
            <SectionCards className="na-grid na-p-6" />
            
            {/* Charts - Apply design system */}
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive className="na-card na-p-6" />
            </div>
            
            {/* Data Table - Apply design system */}
            <DataTable className="na-table" data={data} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

---

## Design Token Mapping

### Colors

```typescript
// Figma → Design System → shadcn
const colors = {
  // Primary accent (gold)
  primary: "var(--color-gold)",
  
  // Backgrounds
  background: "var(--color-paper)",
  card: "var(--color-paper-2)",
  
  // Text
  foreground: "var(--color-lux)",
  muted: "var(--color-clay)",
  
  // Borders
  border: "var(--color-stroke)",
  
  // Status
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-error)",
}
```

### Spacing

```typescript
// Figma: 24px standard → Design System: --spacing-6
const spacing = {
  cardPadding: "var(--spacing-6)", // 24px
  gridGap: "var(--spacing-6)",      // 24px
  sectionGap: "var(--spacing-8)",   // 32px
}
```

### Typography

```typescript
// Figma → Design System Classes
const typography = {
  h1: "na-h1",        // Page titles
  h2: "na-h2",        // Section titles
  h3: "na-h3",        // Subsection titles
  h4: "na-h4",        // Card titles
  data: "na-data",    // Numeric values
  metadata: "na-metadata", // Labels
}
```

---

## Component Customization Examples

### Example 1: KPI Card with Design System

```tsx
// components/ui/kpi-card.tsx
"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function KPICard({ 
  title,
  value,
  change,
  trend,
  className 
}) {
  return (
    <Card className={cn("na-card", className)}>
      <CardHeader>
        <CardDescription className="na-metadata">
          {title}
        </CardDescription>
        <CardTitle className={cn("na-data-large", "tabular-nums")}>
          {value}
        </CardTitle>
        <Badge 
          variant="outline" 
          className={cn(
            "na-badge",
            trend === "up" && "na-badge-success",
            trend === "down" && "na-badge-warning"
          )}
        >
          {change}
        </Badge>
      </CardHeader>
      <CardContent className="na-metadata-small">
        {description}
      </CardContent>
    </Card>
  )
}
```

---

### Example 2: Data Table with Design System

```tsx
// components/ui/data-viz-table.tsx
"use client"

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export function DataVizTable({ data, className }) {
  return (
    <div className={cn("na-table-container", className)}>
      <Table className="na-table">
        <TableHeader className="na-table-header">
          <TableRow>
            <TableHead className="na-metadata">Header</TableHead>
            <TableHead className="na-metadata">Type</TableHead>
            <TableHead className="na-metadata">Status</TableHead>
            <TableHead className="na-metadata text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="na-data">{row.header}</TableCell>
              <TableCell className="na-metadata">{row.type}</TableCell>
              <TableCell>
                <Badge className="na-badge">{row.status}</Badge>
              </TableCell>
              <TableCell className="na-data text-right tabular-nums">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

---

### Example 3: Chart Container with Design System

```tsx
// components/ui/data-viz-chart.tsx
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

export function DataVizChart({ 
  title,
  data,
  className 
}) {
  return (
    <Card className={cn("na-card", className)}>
      <CardHeader>
        <CardTitle className="na-h4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            primary: {
              label: "Primary",
              color: "var(--color-gold)",
            },
          }}
        >
          <AreaChart data={data}>
            <CartesianGrid stroke="var(--color-stroke)" />
            <XAxis 
              stroke="var(--color-clay)"
              tick={{ fill: "var(--color-clay)" }}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <Area
              dataKey="value"
              fill="var(--color-gold)"
              fillOpacity={0.2}
              stroke="var(--color-gold)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
```

---

## Quick Implementation Guide

### Step 1: Add shadcn Components

```bash
# Add complete dashboard
pnpm dlx shadcn@latest add @shadcn/dashboard-01

# Add individual components
pnpm dlx shadcn@latest add @shadcn/table @shadcn/card @shadcn/sidebar

# Install chart library
pnpm add recharts
```

### Step 2: Customize with Design System

Edit each component file and add design system classes:

```tsx
// Apply design system classes
className={cn(
  "na-card",        // Card styling
  "na-p-6",         // Padding
  className
)}
```

### Step 3: Map Design Tokens

Replace shadcn theme colors with design system tokens:

```tsx
// In component styles
style={{
  "--primary": "var(--color-gold)",
  "--background": "var(--color-paper)",
  "--foreground": "var(--color-lux)",
}}
```

---

## MCP Workflow Commands

### Complete Workflow

```
"Analyze Figma data visualization file 1258847030939461287"
"Find matching shadcn components for dashboard, charts, and tables"
"Get examples for dashboard-01 and data-table-demo"
"Create integration components applying design system classes"
"Create GitHub branch and implement"
"Create pull request with implementation"
```

### Individual Commands

**Figma** (when access available):
```
"Get design context for chart components in Figma file"
"Extract design variables for data visualization dashboard"
```

**shadcn**:
```
"Search for dashboard components"
"Get dashboard-01 example code"
"Get add commands for dashboard, table, and card"
```

**GitHub**:
```
"Create branch feature/data-viz-dashboard"
"Add component files"
"Create pull request"
```

---

## Recommended Implementation Order

1. **Dashboard Layout** (Priority 1)
   - Add `dashboard-01` block
   - Apply `.na-shell` class
   - Customize sidebar with design system

2. **Data Table** (Priority 2)
   - Add `table` component
   - Apply `.na-table` classes
   - Customize with `.na-data` and `.na-metadata`

3. **Charts** (Priority 3)
   - Add `card` for chart containers
   - Integrate recharts
   - Apply design system colors

4. **KPI Cards** (Priority 4)
   - Use `card` component
   - Apply `.na-card` classes
   - Add `.na-data-large` for values

---

## Design System Classes Reference

### Layout
- `.na-shell` - Main application shell
- `.na-grid` - Grid layout (24px gap)
- `.na-content` - Content area (32px padding)

### Components
- `.na-card` - Card container
- `.na-table` - Table styling
- `.na-nav` - Navigation sidebar

### Typography
- `.na-h1` through `.na-h6` - Headings
- `.na-data` - Numeric values
- `.na-data-large` - Large KPIs
- `.na-metadata` - Labels/headers
- `.na-metadata-small` - Footnotes

### Interactive
- `.na-btn` - Button base
- `.na-btn-primary` - Primary button
- `.na-input` - Input fields

---

## Next Steps

1. **Add Dashboard Block**:
   ```bash
   pnpm dlx shadcn@latest add @shadcn/dashboard-01
   ```

2. **Customize Components**:
   - Edit component files
   - Add design system classes
   - Map design tokens

3. **Test Integration**:
   - Verify visual match
   - Test functionality
   - Validate design tokens

4. **Deploy**:
   - Create GitHub branch
   - Commit changes
   - Create pull request

---

**Ready to implement!** 🚀

The `dashboard-01` block from shadcn is perfect for your data visualization needs and can be easily customized with your design system.

