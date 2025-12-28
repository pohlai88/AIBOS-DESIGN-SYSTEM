# Figma MCP + shadcn Integration Strategy

**Date**: 2025-01-27  
**Purpose**: Guide for using Figma MCP to analyze design system and optimize shadcn/ui integration  
**Status**: ✅ **READY FOR IMPLEMENTATION**

---

## Overview

This guide explains how to use **Figma MCP** to analyze your Neo-Analog Design System and provide intelligent recommendations for integrating with **shadcn/ui** components.

---

## Figma MCP Capabilities

### Available Tools

1. **`get_design_context`** - Extract component designs and generate code
2. **`get_screenshot`** - Capture component visuals
3. **`get_metadata`** - Get component structure and hierarchy
4. **`get_variable_defs`** - Extract design tokens/variables
5. **`get_code_connect_map`** - Map Figma components to code

---

## Workflow: Figma → Design System → shadcn

### Step 1: Analyze Figma Design System

**Using Figma MCP**:

```
"Get design context from Figma file [fileKey] for component [nodeId]"
"Extract design variables from Figma component"
"Get component structure and metadata"
```

**What to Extract**:
- Component patterns (buttons, cards, inputs)
- Design tokens (colors, spacing, typography)
- Component variants (sizes, states)
- Layout patterns

---

### Step 2: Map Figma Components to shadcn

**Analysis Process**:

1. **Component Matching**:
   - Figma Button → shadcn Button
   - Figma Card → shadcn Card
   - Figma Input → shadcn Input
   - Figma Dialog → shadcn Dialog

2. **Token Mapping**:
   - Figma Color Variables → Design System Tokens → shadcn Theme
   - Figma Spacing → Design System Spacing → shadcn Spacing
   - Figma Typography → Design System Typography → shadcn Typography

3. **Variant Mapping**:
   - Figma Component Variants → shadcn Component Variants
   - Figma States → shadcn Component States

---

## Integration Strategy

### Strategy 1: Design System as Styling Layer

**Approach**: Use shadcn for structure, apply design system for styling

```tsx
// Figma Component: Button/Primary
// Design System: .na-btn-primary
// shadcn: Button component

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Map Figma variant to shadcn + design system
export function NeoButton({ 
  variant = "primary", // Maps to Figma variant
  ...props 
}) {
  return (
    <Button 
      className={cn(
        "na-btn", // Design system base
        variant === "primary" && "na-btn-primary", // Figma → Design System
        variant === "secondary" && "na-btn-secondary",
        props.className
      )} 
      {...props} 
    />
  )
}
```

---

### Strategy 2: Token-Based Theming

**Approach**: Map Figma variables to shadcn theme via design system tokens

#### Step 1: Extract Figma Variables

**Using Figma MCP**:
```javascript
// Get Figma variables
const variables = await mcp_Figma_get_variable_defs({
  fileKey: "your-figma-file-key",
  nodeId: "component-node-id"
})

// Example output:
// {
//   "color/primary": "#eab308",
//   "spacing/base": "24px",
//   "typography/heading": "Inter, 700, 2rem"
// }
```

#### Step 2: Map to Design System

```typescript
// Map Figma variables to design system tokens
const tokenMap = {
  "color/primary": "var(--color-gold)",
  "color/background": "var(--color-paper)",
  "spacing/base": "var(--spacing-6)",
  "typography/heading": "var(--font-sans) var(--font-weight-bold) var(--text-2xl)"
}
```

#### Step 3: Apply to shadcn Theme

```tsx
// components/ui/button.tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NeoButton({ className, ...props }) {
  return (
    <Button 
      className={cn(
        // Design system tokens (mapped from Figma)
        "bg-[var(--color-gold)]",
        "text-[var(--color-void)]",
        "px-[var(--spacing-6)]",
        "py-[var(--spacing-4)]",
        className
      )} 
      {...props} 
    />
  )
}
```

---

### Strategy 3: Component-by-Component Analysis

**Workflow for Each Component**:

1. **Extract from Figma**:
   ```
   "Get design context for button component in Figma file"
   ```

2. **Analyze Patterns**:
   - Visual structure
   - States (default, hover, active, disabled)
   - Variants (primary, secondary, ghost)
   - Sizes (sm, md, lg)

3. **Find shadcn Equivalent**:
   ```
   "Search for button component in shadcn"
   ```

4. **Create Integration**:
   - Map Figma structure to shadcn
   - Apply design system tokens
   - Create wrapper component

---

## Practical Examples

### Example 1: Button Component Integration

#### Figma Analysis (via MCP)

```javascript
// Get Figma button design
const figmaButton = await mcp_Figma_get_design_context({
  fileKey: "your-figma-file",
  nodeId: "button-component-id"
})

// Extract:
// - Colors: Primary (#eab308), Background (#121214)
// - Spacing: Padding 24px, Gap 8px
// - Typography: Inter, 500, 15px
// - States: Default, Hover, Active, Disabled
```

#### shadcn Component

```bash
# Add shadcn button
pnpm dlx shadcn@latest add @shadcn/button
```

#### Integration Code

```tsx
// components/ui/neo-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Figma Variants → Design System → shadcn
export interface NeoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
}

const NeoButton = React.forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          // Design system base (from Figma analysis)
          "na-btn",
          // Variant mapping (Figma → Design System)
          variant === "primary" && "na-btn-primary", // Figma: Primary variant
          variant === "secondary" && "na-btn-secondary", // Figma: Secondary variant
          variant === "ghost" && "na-btn-ghost", // Figma: Ghost variant
          variant === "destructive" && "na-btn-destructive", // Figma: Error variant
          // Size mapping (Figma → Design System)
          size === "sm" && "na-btn-sm", // Figma: Small size
          size === "md" && "na-btn-md", // Figma: Medium size (default)
          size === "lg" && "na-btn-lg", // Figma: Large size
          className
        )}
        {...props}
      />
    )
  }
)
NeoButton.displayName = "NeoButton"

export { NeoButton }
```

---

### Example 2: Card Component Integration

#### Figma Analysis

```javascript
// Get Figma card design
const figmaCard = await mcp_Figma_get_design_context({
  fileKey: "your-figma-file",
  nodeId: "card-component-id"
})

// Extract:
// - Background: #121214 (paper)
// - Border: #27272a (stroke)
// - Padding: 24px
// - Border radius: 8px
// - Shadow: Subtle elevation
```

#### Integration

```tsx
// components/ui/neo-card.tsx
"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Figma Card → Design System → shadcn Card
export interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined"
}

const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          // Design system card (from Figma)
          "na-card",
          // Variants (Figma → Design System)
          variant === "default" && "na-card-default",
          variant === "elevated" && "na-card-elevated", // Figma: With shadow
          variant === "outlined" && "na-card-outlined", // Figma: With border
          className
        )}
        {...props}
      />
    )
  }
)
NeoCard.displayName = "NeoCard"

export { NeoCard, NeoCardHeader, NeoCardTitle, NeoCardDescription, NeoCardContent, NeoCardFooter }
```

---

## Automated Workflow

### Step-by-Step Process

1. **Extract Figma Components**:
   ```
   "Get all button components from Figma design system file"
   "Extract design variables for color system"
   "Get component structure and variants"
   ```

2. **Analyze Patterns**:
   - Component structure
   - Design tokens used
   - Variant system
   - State management

3. **Map to shadcn**:
   ```
   "Search for matching shadcn components"
   "Get shadcn component examples"
   "Compare Figma design with shadcn implementation"
   ```

4. **Generate Integration Code**:
   - Create wrapper components
   - Map Figma variants to design system classes
   - Apply design tokens

5. **Validate**:
   - Visual comparison (Figma screenshot vs implementation)
   - Token mapping verification
   - Component behavior testing

---

## Component Mapping Table

| Figma Component | Design System Class | shadcn Component | Integration Strategy |
|----------------|---------------------|------------------|----------------------|
| Button/Primary | `.na-btn-primary` | `Button` | Apply design system class to shadcn Button |
| Button/Secondary | `.na-btn-secondary` | `Button` | Apply design system class to shadcn Button |
| Card/Default | `.na-card` | `Card` | Apply design system class to shadcn Card |
| Input/Text | `.na-input` | `Input` | Apply design system class to shadcn Input |
| Dialog/Modal | `.na-modal` | `Dialog` | Apply design system class to shadcn Dialog |
| Table/Data | `.na-table` | `Table` | Apply design system class to shadcn Table |
| Badge/Status | `.na-badge` | `Badge` | Apply design system class to shadcn Badge |

---

## Token Mapping Strategy

### Color Tokens

```typescript
// Figma Variables → Design System → shadcn Theme
const colorMapping = {
  // Figma: color/primary
  // Design System: --color-gold
  // shadcn: primary color
  primary: "var(--color-gold)",
  
  // Figma: color/background
  // Design System: --color-paper
  // shadcn: background color
  background: "var(--color-paper)",
  
  // Figma: color/text/primary
  // Design System: --color-lux
  // shadcn: foreground color
  foreground: "var(--color-lux)",
  
  // Figma: color/border
  // Design System: --color-stroke
  // shadcn: border color
  border: "var(--color-stroke)",
}
```

### Spacing Tokens

```typescript
// Figma: spacing/base (24px)
// Design System: --spacing-6
// shadcn: spacing scale
const spacingMapping = {
  base: "var(--spacing-6)", // 24px
  sm: "var(--spacing-4)",    // 16px
  md: "var(--spacing-6)",    // 24px
  lg: "var(--spacing-8)",    // 32px
  xl: "var(--spacing-12)",   // 48px
}
```

### Typography Tokens

```typescript
// Figma: typography/heading
// Design System: .na-h1, .na-h2, etc.
// shadcn: Typography components
const typographyMapping = {
  h1: "na-h1",
  h2: "na-h2",
  h3: "na-h3",
  body: "na-body",
  data: "na-data",
  metadata: "na-metadata",
}
```

---

## Using Figma MCP for Analysis

### Command Examples

1. **Get Component Design**:
   ```
   "Get design context for button component in Figma file [fileKey] node [nodeId]"
   ```

2. **Extract Variables**:
   ```
   "Get variable definitions for component [nodeId] in Figma file [fileKey]"
   ```

3. **Get Screenshot**:
   ```
   "Take screenshot of button component from Figma"
   ```

4. **Analyze Structure**:
   ```
   "Get metadata for component hierarchy in Figma file"
   ```

---

## Recommended shadcn Components

Based on your design system analysis, here are the recommended shadcn components to integrate:

### Priority 1: Core Components

1. **Button** ✅
   - Maps to: `.na-btn`, `.na-btn-primary`, `.na-btn-secondary`
   - Figma: Button component variants
   - Status: Ready to integrate

2. **Card** ✅
   - Maps to: `.na-card`
   - Figma: Card/Panel components
   - Status: Ready to integrate

3. **Input** ✅
   - Maps to: `.na-input`
   - Figma: Input/Text field components
   - Status: Ready to integrate

4. **Table** ✅
   - Maps to: `.na-table`
   - Figma: Data table components
   - Status: Ready to integrate

### Priority 2: Form Components

5. **Select** - Dropdown selects
6. **Checkbox** - Form checkboxes
7. **Radio Group** - Radio buttons
8. **Switch** - Toggle switches
9. **Textarea** - Multi-line inputs

### Priority 3: Feedback Components

10. **Alert** - Alert messages
11. **Toast** - Toast notifications
12. **Dialog** - Modal dialogs
13. **Tooltip** - Hover tooltips

### Priority 4: Navigation Components

14. **Tabs** - Tab navigation
15. **Dropdown Menu** - Context menus
16. **Breadcrumb** - Breadcrumb trails

---

## Integration Checklist

### For Each Component

- [ ] Extract from Figma using MCP
- [ ] Analyze design tokens used
- [ ] Map to design system classes
- [ ] Find shadcn equivalent
- [ ] Create wrapper component
- [ ] Apply design system styling
- [ ] Test visual match
- [ ] Document integration pattern

---

## Best Practices

### 1. Maintain Design System First

✅ **Do**:
- Use design system classes as primary styling
- Apply shadcn for component structure
- Keep Figma as source of truth

❌ **Don't**:
- Override design system tokens
- Create duplicate styling systems
- Ignore Figma design specifications

### 2. Token Consistency

✅ **Do**:
- Map Figma variables to design system tokens
- Use CSS custom properties
- Maintain single source of truth

❌ **Don't**:
- Hardcode values from Figma
- Create new tokens outside design system
- Mix token systems

### 3. Component Wrapping

✅ **Do**:
- Create wrapper components for integration
- Preserve shadcn component API
- Add design system classes via `cn()`

❌ **Don't**:
- Modify shadcn components directly
- Break shadcn component structure
- Create incompatible APIs

---

## Automated Integration Script

### Concept: Figma → shadcn Generator

```typescript
// Pseudo-code for automated integration
async function generateShadcnIntegration(figmaFileKey: string, nodeId: string) {
  // 1. Extract from Figma
  const figmaDesign = await mcp_Figma_get_design_context({
    fileKey: figmaFileKey,
    nodeId: nodeId
  })
  
  // 2. Extract variables
  const variables = await mcp_Figma_get_variable_defs({
    fileKey: figmaFileKey,
    nodeId: nodeId
  })
  
  // 3. Find shadcn equivalent
  const shadcnComponent = await mcp_shadcn_search_items_in_registries({
    registries: ["@shadcn"],
    query: figmaDesign.componentName
  })
  
  // 4. Generate integration code
  return generateIntegrationCode({
    figmaDesign,
    variables,
    shadcnComponent,
    designSystemClasses: mapToDesignSystem(figmaDesign)
  })
}
```

---

## Next Steps

1. **Connect Figma File**:
   - Get Figma file key
   - Identify component node IDs
   - Set up Figma MCP access

2. **Extract Components**:
   - Use Figma MCP to get component designs
   - Extract design variables
   - Analyze component structure

3. **Create Integration**:
   - Map Figma → Design System → shadcn
   - Generate wrapper components
   - Apply design system styling

4. **Validate**:
   - Compare Figma vs implementation
   - Test component behavior
   - Verify token mapping

---

## Resources

- **Figma MCP Docs**: Available via `list_mcp_resources`
- **shadcn MCP**: See `docs/SHADCN_MCP_DIAGNOSTIC.md`
- **Design System**: See `docs/DESIGN_SYSTEM.md`
- **Integration Guide**: See `docs/SHADCN_INTEGRATION_GUIDE.md`

---

**Last Updated**: 2025-01-27  
**Status**: ✅ Ready for Figma MCP Analysis

