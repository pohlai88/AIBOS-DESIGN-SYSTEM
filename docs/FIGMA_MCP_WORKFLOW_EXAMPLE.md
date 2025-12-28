# Figma MCP Workflow: Design System → shadcn Integration

**Date**: 2025-01-27  
**Purpose**: Step-by-step example of using Figma MCP to analyze design system and integrate with shadcn

---

## Prerequisites

1. **Figma Access Token**: Get from Figma Settings → Account
2. **Figma File Key**: From your design system file URL
3. **Component Node IDs**: From Figma component pages

---

## Workflow Example

### Step 1: Connect to Figma Design System

**Get Figma File Information**:
```
"Get metadata for Figma design system file [fileKey]"
```

**Expected Output**:
- Component hierarchy
- Page structure
- Component node IDs

---

### Step 2: Analyze Button Component

#### 2.1 Get Component Design

**Command**:
```
"Get design context for button component in Figma file [fileKey] node [nodeId]"
```

**What You'll Get**:
- Component structure
- Visual design
- Code representation
- Design tokens used

#### 2.2 Extract Design Variables

**Command**:
```
"Get variable definitions for button component [nodeId] in Figma file [fileKey]"
```

**Expected Output**:
```json
{
  "color/primary": "#eab308",
  "color/background": "#121214",
  "spacing/padding": "24px",
  "typography/button": "Inter, 500, 15px",
  "radius/button": "8px"
}
```

#### 2.3 Get Screenshot for Reference

**Command**:
```
"Take screenshot of button component from Figma file [fileKey] node [nodeId]"
```

**Use**: Visual reference for implementation validation

---

### Step 3: Map to Design System

**Analysis**:
```typescript
// Figma Variables → Design System Tokens
const mapping = {
  "color/primary": "var(--color-gold)",        // ✅ Matches
  "color/background": "var(--color-paper)",   // ✅ Matches
  "spacing/padding": "var(--spacing-6)",      // ✅ Matches (24px)
  "typography/button": "var(--font-sans) var(--font-weight-medium) var(--text-base)", // ✅ Matches
  "radius/button": "var(--radius-lg)"         // ✅ Matches (8px)
}
```

**Design System Classes**:
- `.na-btn` - Base button class
- `.na-btn-primary` - Primary variant (uses --color-gold)
- `.na-btn-md` - Medium size (uses --spacing-6 padding)

---

### Step 4: Find shadcn Equivalent

**Command**:
```
"Search for button component in shadcn registry"
```

**Result**: Found `@shadcn/button` component

**Add Component**:
```bash
pnpm dlx shadcn@latest add @shadcn/button
```

---

### Step 5: Create Integration

**Generated Code**:
```tsx
// components/ui/neo-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Figma Analysis Results:
// - Primary color: #eab308 (--color-gold)
// - Background: #121214 (--color-paper)
// - Padding: 24px (--spacing-6)
// - Typography: Inter, 500, 15px
// - Radius: 8px (--radius-lg)

export interface NeoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
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
          variant === "secondary" && "na-btn-secondary",
          variant === "ghost" && "na-btn-ghost",
          // Size mapping (Figma → Design System)
          size === "sm" && "na-btn-sm",
          size === "md" && "na-btn-md", // Figma: Default size
          size === "lg" && "na-btn-lg",
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

## Complete Component Analysis Template

### For Each Component:

1. **Figma Extraction**:
   ```javascript
   // Get design context
   const design = await mcp_Figma_get_design_context({
     fileKey: "your-figma-file-key",
     nodeId: "component-node-id"
   })
   
   // Get variables
   const variables = await mcp_Figma_get_variable_defs({
     fileKey: "your-figma-file-key",
     nodeId: "component-node-id"
   })
   
   // Get screenshot
   const screenshot = await mcp_Figma_get_screenshot({
     fileKey: "your-figma-file-key",
     nodeId: "component-node-id"
   })
   ```

2. **Design System Mapping**:
   ```typescript
   // Map Figma variables to design system
   const tokenMap = mapFigmaToDesignSystem(variables)
   ```

3. **shadcn Search**:
   ```javascript
   // Find shadcn equivalent
   const shadcnComponent = await mcp_shadcn_search_items_in_registries({
     registries: ["@shadcn"],
     query: design.componentName
   })
   ```

4. **Integration Generation**:
   ```typescript
   // Generate integration code
   const integrationCode = generateIntegration({
     figmaDesign: design,
     designSystemTokens: tokenMap,
     shadcnComponent: shadcnComponent
   })
   ```

---

## Recommended Components to Analyze

Based on your design system, prioritize these components:

### Priority 1: Core Components

1. **Button** - Multiple variants (primary, secondary, ghost)
2. **Card** - Content containers with elevation
3. **Input** - Text input fields
4. **Table** - Data tables

### Priority 2: Form Components

5. **Select** - Dropdown selects
6. **Checkbox** - Form checkboxes
7. **Radio Group** - Radio buttons

### Priority 3: Feedback

8. **Alert** - Alert messages
9. **Dialog** - Modal dialogs
10. **Toast** - Toast notifications

---

## Quick Start Commands

### Analyze Button from Figma

```
"Get design context for button component in Figma file [fileKey] node [nodeId]"
"Extract design variables for this button"
"Map these variables to design system tokens"
"Find shadcn button component"
"Create integration code for NeoButton"
```

### Batch Analysis

```
"Get all component node IDs from Figma design system file [fileKey]"
"For each component, extract design context and variables"
"Map all components to design system tokens"
"Find shadcn equivalents for each"
"Generate integration code for all components"
```

---

## Validation Workflow

### Visual Comparison

1. **Get Figma Screenshot**:
   ```
   "Take screenshot of button component from Figma"
   ```

2. **Compare with Implementation**:
   - Use browser automation to capture implementation
   - Compare visually
   - Verify token mapping

3. **Token Verification**:
   - Check CSS variables match
   - Verify spacing/typography
   - Validate color tokens

---

## Next Steps

1. **Provide Figma File Key**: Share your design system file
2. **Identify Components**: List components to analyze
3. **Run Analysis**: Use Figma MCP to extract designs
4. **Generate Integration**: Create wrapper components
5. **Validate**: Compare Figma vs implementation

---

**Ready to analyze your Figma design system!** 🎨

Share your Figma file key and component node IDs to get started.

