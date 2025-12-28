# shadcn/ui Integration Guide for AI-BOS Design System

**Date**: 2025-01-27  
**Status**: ✅ **CONFIGURED**  
**Purpose**: Guide for integrating shadcn/ui components with the AI-BOS Design System

---

## Overview

This guide explains how to use shadcn/ui components with the AI-BOS Design System. The integration allows you to:

- Use shadcn/ui's React component structure
- Apply AI-BOS Design System styling and tokens
- Maintain design system consistency
- Leverage both ecosystems seamlessly

---

## Setup Complete ✅

### Files Created

1. **`components.json`** - shadcn/ui configuration
2. **`lib/utils.ts`** - Utility functions (cn helper)
3. **`tsconfig.json`** - TypeScript configuration
4. **Updated `package.json`** - Added dependencies

### Dependencies Added

```json
{
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.4"
}
```

---

## Installation

### Step 1: Install Dependencies

```bash
pnpm install
```

This will install:
- `clsx` - Conditional class names
- `tailwind-merge` - Merge Tailwind classes intelligently

### Step 2: Verify Configuration

```bash
# Check if components.json is recognized
pnpm dlx shadcn@latest view @shadcn
```

---

## Adding Components

### Method 1: Using MCP (Recommended)

**Via Cursor IDE AI**:
```
"Add the shadcn button component to this project"
```

The AI will:
1. Search for the button component
2. Generate the add command
3. Add the component with proper configuration

### Method 2: Manual Command

```bash
# Add a component
pnpm dlx shadcn@latest add @shadcn/button

# Add multiple components
pnpm dlx shadcn@latest add @shadcn/button @shadcn/card @shadcn/input
```

### Method 3: Using MCP Tools

You can use the shadcn MCP tools directly:

1. **Search for components**:
   ```
   "Search for card components in shadcn"
   ```

2. **View component details**:
   ```
   "Show me details about the shadcn button component"
   ```

3. **Get examples**:
   ```
   "Show me button examples from shadcn"
   ```

---

## Integration Patterns

### Pattern 1: Direct Styling with Design System Classes

Apply AI-BOS Design System classes directly to shadcn components:

```tsx
// components/ui/button.tsx (after adding via shadcn)
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Apply design system classes
export function NeoButton({ className, ...props }) {
  return (
    <Button 
      className={cn(
        "na-btn na-btn-primary", // Design system classes
        className
      )} 
      {...props} 
    />
  )
}
```

**Usage**:
```tsx
import { NeoButton } from "@/components/ui/button"

<NeoButton>Click me</NeoButton>
```

---

### Pattern 2: Using Design System Tokens

Use CSS variables from the design system:

```tsx
// components/ui/card.tsx
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function NeoCard({ className, ...props }) {
  return (
    <Card 
      className={cn(
        "na-card", // Design system card class
        "bg-[var(--color-paper)]", // Design system token
        "border-[var(--color-stroke)]", // Design system token
        className
      )} 
      {...props} 
    />
  )
}
```

---

### Pattern 3: Hybrid Approach

Combine shadcn variants with design system classes:

```tsx
// components/ui/button.tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NeoButton({ 
  variant = "default",
  className,
  ...props 
}) {
  return (
    <Button 
      variant={variant} // shadcn variant
      className={cn(
        variant === "default" && "na-btn-primary",
        variant === "outline" && "na-btn-ghost",
        variant === "ghost" && "na-btn-ghost",
        className
      )} 
      {...props} 
    />
  )
}
```

---

## Component Directory Structure

After adding components, your structure will look like:

```
.
├── components/
│   └── ui/
│       ├── button.tsx      # Added via shadcn
│       ├── card.tsx        # Added via shadcn
│       ├── input.tsx       # Added via shadcn
│       └── ...
├── lib/
│   └── utils.ts           # cn() utility
├── components.json         # shadcn configuration
└── tsconfig.json          # TypeScript config
```

---

## Design System Integration Examples

### Example 1: Button with Design System

```tsx
// components/ui/neo-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface NeoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

const NeoButton = React.forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          // Design system base classes
          "na-btn",
          // Variant mapping
          variant === "primary" && "na-btn-primary",
          variant === "secondary" && "na-btn-secondary",
          variant === "ghost" && "na-btn-ghost",
          variant === "destructive" && "na-btn-destructive",
          // Size mapping
          size === "sm" && "na-btn-sm",
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

### Example 2: Card with Design System

```tsx
// components/ui/neo-card.tsx
"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined"
}

const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "na-card",
          variant === "elevated" && "na-card-elevated",
          variant === "outlined" && "na-card-outlined",
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

## Available shadcn Components

### Core UI Components (438 total)

**Form Components**:
- `button` - Interactive buttons
- `input` - Text inputs
- `textarea` - Multi-line inputs
- `select` - Dropdown selects
- `checkbox` - Checkboxes
- `radio-group` - Radio buttons
- `switch` - Toggle switches
- `slider` - Range sliders
- `form` - Form wrapper

**Layout Components**:
- `card` - Content containers
- `separator` - Dividers
- `sheet` - Side panels
- `dialog` - Modal dialogs
- `drawer` - Mobile drawers
- `tabs` - Tab navigation
- `accordion` - Collapsible sections

**Data Display**:
- `table` - Data tables
- `badge` - Status badges
- `avatar` - User avatars
- `skeleton` - Loading states
- `progress` - Progress bars

**Navigation**:
- `dropdown-menu` - Context menus
- `navigation-menu` - Main navigation
- `breadcrumb` - Breadcrumb trails
- `pagination` - Page navigation

**Feedback**:
- `alert` - Alert messages
- `toast` - Toast notifications
- `tooltip` - Hover tooltips
- `popover` - Popover content

---

## Using MCP to Discover Components

### Search Components

```
"Search for form components in shadcn"
"Find all input-related components"
"Show me card components"
```

### Get Examples

```
"Show me button examples"
"Get card demo code"
"Find form examples"
```

### Add Components

```
"Add the shadcn button component"
"Add card and input components"
"Install the table component"
```

---

## Best Practices

### 1. Component Naming

✅ **Do**:
- Use `Neo` prefix for design system variants
- Keep original shadcn components unchanged
- Create wrapper components for design system integration

❌ **Don't**:
- Modify shadcn components directly
- Mix design system and shadcn classes without organization
- Create duplicate components

### 2. Class Management

✅ **Do**:
- Use `cn()` utility for class merging
- Apply design system classes first
- Allow className override for flexibility

❌ **Don't**:
- Hardcode styles
- Override shadcn component structure
- Ignore design system tokens

### 3. TypeScript

✅ **Do**:
- Extend shadcn component props
- Use proper TypeScript types
- Export types for reuse

❌ **Don't**:
- Use `any` types
- Skip type definitions
- Ignore prop validation

---

## Troubleshooting

### Issue: Components Not Found

**Solution**:
```bash
# Verify components.json exists
ls components.json

# Check configuration
cat components.json

# Re-initialize if needed
npx shadcn@latest init
```

### Issue: Import Errors

**Solution**:
1. Check `tsconfig.json` paths configuration
2. Verify `components.json` aliases
3. Ensure TypeScript is properly configured

### Issue: Styles Not Applying

**Solution**:
1. Ensure `input.css` is imported
2. Check Tailwind configuration
3. Verify design system classes exist
4. Check PostCSS processing

### Issue: MCP Commands Not Working

**Solution**:
1. Verify MCP server is connected
2. Check `components.json` exists
3. Run diagnostic: See `docs/SHADCN_MCP_DIAGNOSTIC.md`

---

## Next Steps

1. **Add Your First Component**:
   ```bash
   pnpm dlx shadcn@latest add @shadcn/button
   ```

2. **Customize with Design System**:
   - Edit `components/ui/button.tsx`
   - Add design system classes
   - Test integration

3. **Build Component Library**:
   - Add commonly used components
   - Create design system variants
   - Document usage patterns

4. **Create Examples**:
   - Build example pages
   - Show integration patterns
   - Document best practices

---

## Resources

- **shadcn/ui Docs**: https://ui.shadcn.com
- **AI-BOS Design System**: See `docs/DESIGN_SYSTEM.md`
- **MCP Diagnostic**: See `docs/SHADCN_MCP_DIAGNOSTIC.md`
- **Design Tokens**: See `dist/tokens.json`

---

**Last Updated**: 2025-01-27  
**Configuration Status**: ✅ Complete

