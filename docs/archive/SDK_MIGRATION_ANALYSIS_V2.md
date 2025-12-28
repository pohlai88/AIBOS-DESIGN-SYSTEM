# SDK Migration Analysis V2: Design System as Styling Layer

**Date**: 2025-01-27  
**Status**: Revised Analysis  
**Purpose**: Convert CSS design system into SDK that works WITH existing component libraries

---

## Executive Summary

**Key Insight**: The real value is the **design system (tokens + CSS classes + drift prevention)**, not building components. Developers can use shadcn/ui, Radix UI, or any component library and style them with your design system.

**Current State**: ✅ CSS Design System (95% complete)  
**Target State**: 🎯 Design System SDK (40% complete - needs IDE support & integration guides)

---

## Core Value Proposition

### What Developers Get
1. **Design Tokens** → CSS custom properties + JSON/TypeScript
2. **CSS Classes** → `.na-h1`, `.na-data`, `.na-card`, etc. (IDE autocomplete)
3. **Drift Prevention** → Validation tooling
4. **Integration Guides** → How to use with shadcn/ui, Radix, etc.

### What Developers DON'T Need From You
- ❌ React/Vue/Svelte components (they use shadcn/ui, Radix, etc.)
- ❌ Component state management
- ❌ Component logic

**Your Role**: Provide the **styling layer** that prevents drift.

---

## Revised SDK Structure

```
@aibos/design-system/
├── packages/
│   ├── core/                      # CSS tokens & classes
│   │   ├── dist/
│   │   │   ├── style.css          # Compiled CSS
│   │   │   └── tokens.json        # Design tokens (JSON)
│   │   └── package.json
│   │
│   ├── tokens/                    # Design tokens (TypeScript)
│   │   ├── src/
│   │   │   ├── colors.ts          # Color tokens
│   │   │   ├── typography.ts      # Typography tokens
│   │   │   ├── spacing.ts         # Spacing tokens
│   │   │   └── index.ts           # All tokens
│   │   ├── dist/                  # Compiled JS + types
│   │   └── package.json
│   │
│   └── types/                     # TypeScript definitions for IDE
│       ├── css-classes.d.ts       # CSS class autocomplete
│       ├── tokens.d.ts            # Token autocomplete
│       └── package.json
│
├── integrations/                  # Integration guides & examples
│   ├── shadcn-ui/                 # shadcn/ui integration
│   ├── radix-ui/                  # Radix UI integration
│   └── tailwind/                  # Tailwind integration
│
├── docs/                          # Documentation
│   ├── getting-started.md
│   ├── design-tokens.md
│   ├── css-classes.md
│   └── integrations/
│       ├── shadcn-ui.md
│       └── radix-ui.md
│
└── package.json
```

---

## What's Actually Needed

### ✅ Already Complete (95%)

1. **Design Tokens** (100%)
   - ✅ CSS custom properties (`--color-*`, `--spacing-*`)
   - ✅ Semantic token system
   - ✅ Figma-compliant structure

2. **CSS Classes** (95%)
   - ✅ Typography: `.na-h1` through `.na-h6`
   - ✅ Data/Metadata: `.na-data`, `.na-metadata`
   - ✅ Components: `.na-card`, `.na-btn`, `.na-input`
   - ✅ Layout: `.na-shell`, `.na-sidebar`, `.na-main`

3. **Build System** (80%)
   - ✅ PostCSS + Tailwind v4
   - ✅ CSS compilation
   - ✅ Validation scripts

4. **Documentation** (90%)
   - ✅ Design system docs
   - ✅ Usage examples

---

### 🔴 What's Missing (5%)

#### 1. **IDE Autocomplete Support** (0% Complete)
**Status**: No TypeScript definitions for CSS classes

**Required**:
```typescript
// types/css-classes.d.ts
declare module '@aibos/design-system/css-classes' {
  export type TypographyClass = 
    | 'na-h1' | 'na-h2' | 'na-h3' | 'na-h4' | 'na-h5' | 'na-h6'
    | 'na-data' | 'na-data-large'
    | 'na-metadata' | 'na-metadata-small';
  
  export type ComponentClass =
    | 'na-card' | 'na-panel' | 'na-btn' | 'na-input'
    | 'na-table' | 'na-modal' | 'na-toast';
  
  export type AllClasses = TypographyClass | ComponentClass;
}
```

**Usage in IDE**:
```tsx
// IDE autocompletes: na-h1, na-h2, na-h3...
<div className="na-h1">Title</div>

// IDE autocompletes: na-data, na-data-large...
<div className="na-data">$12,450</div>
```

#### 2. **Design Token TypeScript Types** (0% Complete)
**Status**: Tokens exist in CSS, but no TypeScript types

**Required**:
```typescript
// tokens/colors.ts
export const colors = {
  void: '#09090b',
  paper: '#121214',
  lux: '#f4f4f5',
  gold: '#eab308',
  // ... all colors
} as const;

export type ColorToken = keyof typeof colors;

// Usage
import { colors } from '@aibos/design-system/tokens';
const bgColor = colors.paper; // TypeScript knows all available colors
```

#### 3. **Token JSON Export** (0% Complete)
**Status**: Tokens in CSS only

**Required**:
```json
// tokens.json
{
  "colors": {
    "void": { "value": "#09090b", "type": "color" },
    "paper": { "value": "#121214", "type": "color" }
  },
  "typography": {
    "h1": { "size": "2rem", "weight": "700" }
  }
}
```

**Use Cases**:
- Figma plugin integration
- Design tooling
- Theme generators
- Documentation auto-generation

#### 4. **Integration Guides** (0% Complete)
**Status**: No guides for using with component libraries

**Required**:

**shadcn/ui Integration**:
```tsx
// components/ui/button.tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Style shadcn Button with design system
export function NeoButton({ className, ...props }) {
  return (
    <Button 
      className={cn("na-btn", className)} 
      {...props} 
    />
  )
}
```

**Radix UI Integration**:
```tsx
import * as Dialog from "@radix-ui/react-dialog"

// Style Radix Dialog with design system
<Dialog.Root>
  <Dialog.Trigger className="na-btn na-btn-primary">
    Open
  </Dialog.Trigger>
  <Dialog.Content className="na-modal__panel">
    {/* Content */}
  </Dialog.Content>
</Dialog.Root>
```

#### 5. **CSS Class Reference (TypeScript)** (0% Complete)
**Status**: Classes exist, but no programmatic access

**Required**:
```typescript
// types/css-classes.ts
export const cssClasses = {
  typography: {
    h1: 'na-h1',
    h2: 'na-h2',
    data: 'na-data',
    metadata: 'na-metadata',
  },
  components: {
    card: 'na-card',
    btn: 'na-btn',
    input: 'na-input',
  }
} as const;

// Usage
import { cssClasses } from '@aibos/design-system/types';
<div className={cssClasses.typography.h1}>Title</div>
```

---

## Revised Migration Roadmap

### Phase 1: Token Distribution (Week 1)
**Goal**: Make tokens available in multiple formats

- [ ] Extract tokens to JSON (`tokens.json`)
- [ ] Create TypeScript token types (`tokens/colors.ts`, etc.)
- [ ] Generate token documentation
- [ ] Test token consumption

### Phase 2: IDE Support (Week 2)
**Goal**: IDE autocomplete for CSS classes and tokens

- [ ] Create TypeScript definitions for CSS classes
- [ ] Create TypeScript definitions for tokens
- [ ] Test IDE autocomplete (VS Code, WebStorm)
- [ ] Create CSS class reference utility

### Phase 3: Integration Guides (Week 3)
**Goal**: Show how to use with component libraries

- [ ] shadcn/ui integration guide
- [ ] Radix UI integration guide
- [ ] Tailwind CSS integration guide
- [ ] Code examples for each

### Phase 4: Package Publishing (Week 4)
**Goal**: Publish to NPM

- [ ] Set up monorepo structure
- [ ] Configure package.json files
- [ ] Set up build pipeline
- [ ] Publish to NPM
- [ ] Create getting started guide

---

## Package Structure

### `@aibos/design-system/core`
**Purpose**: CSS file and basic tokens

```json
{
  "name": "@aibos/design-system-core",
  "version": "1.0.0",
  "main": "dist/style.css",
  "files": ["dist/style.css", "dist/tokens.json"]
}
```

**Usage**:
```css
@import '@aibos/design-system-core/dist/style.css';
```

### `@aibos/design-system/tokens`
**Purpose**: TypeScript types and values for tokens

```json
{
  "name": "@aibos/design-system-tokens",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    "./colors": "./dist/colors.js",
    "./typography": "./dist/typography.js"
  }
}
```

**Usage**:
```typescript
import { colors, typography } from '@aibos/design-system/tokens';
```

### `@aibos/design-system/types`
**Purpose**: TypeScript definitions for IDE autocomplete

```json
{
  "name": "@aibos/design-system-types",
  "version": "1.0.0",
  "types": "dist/index.d.ts"
}
```

**Usage**:
```typescript
import type { TypographyClass, ColorToken } from '@aibos/design-system/types';
```

---

## Integration Examples

### Example 1: shadcn/ui + Design System

```tsx
// Install shadcn/ui
npx shadcn-ui@latest init

// components/ui/button.tsx (shadcn default)
import { Button } from "@/components/ui/button"

// components/ui/neo-button.tsx (styled with design system)
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cssClasses } from '@aibos/design-system/types'

export function NeoButton({ variant = "default", ...props }) {
  return (
    <Button 
      className={cn(
        cssClasses.components.btn,
        variant === "primary" && "na-btn-primary",
        variant === "ghost" && "na-btn-ghost"
      )} 
      {...props} 
    />
  )
}

// Usage
<NeoButton variant="primary">Click me</NeoButton>
```

### Example 2: Radix UI + Design System

```tsx
import * as Dialog from "@radix-ui/react-dialog"
import { cssClasses } from '@aibos/design-system/types'

function Modal({ children, trigger }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={cssClasses.components.btn}>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="na-modal__backdrop" />
        <Dialog.Content className="na-modal__panel">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

### Example 3: Tailwind CSS + Design System

```tsx
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Import from design system tokens
        void: 'var(--color-void)',
        paper: 'var(--color-paper)',
        lux: 'var(--color-lux)',
        gold: 'var(--color-gold)',
      }
    }
  }
}

// Usage
<div className="bg-void text-lux">
  <h1 className="na-h1">Title</h1>
  <div className="na-data">$12,450</div>
</div>
```

---

## IDE Autocomplete Implementation

### VS Code Support

**`.vscode/css-custom-data.json`** (already exists, enhance it):
```json
{
  "version": 1.1,
  "atDirectives": [],
  "pseudoClasses": [],
  "pseudoElements": [],
  "properties": [],
  "types": [],
  "values": [],
  "selectors": [
    {
      "name": ".na-h1",
      "description": "Page title (32px, bold)"
    },
    {
      "name": ".na-h2",
      "description": "Section title (24px, semibold)"
    },
    {
      "name": ".na-data",
      "description": "Primary data (14px, mono, tabular)"
    }
  ]
}
```

**TypeScript Definition**:
```typescript
// types/css-classes.d.ts
declare module '@aibos/design-system/css-classes' {
  /**
   * Typography classes for headings and text
   */
  export type TypographyClass =
    | 'na-h1'      // Page title (32px, bold)
    | 'na-h2'      // Section title (24px, semibold)
    | 'na-h3'      // Subsection title (20px, semibold)
    | 'na-h4'      // Card title (18px, semibold)
    | 'na-h5'      // Small title (16px, semibold)
    | 'na-h6'      // Micro title (14px, semibold)
    | 'na-data'    // Primary data (14px, mono, tabular)
    | 'na-data-large'  // KPI data (30px, serif)
    | 'na-metadata'     // Labels/captions (11px, uppercase, clay)
    | 'na-metadata-small'; // Footnotes (10px, clay)
  
  /**
   * Component classes for UI elements
   */
  export type ComponentClass =
    | 'na-card' | 'na-panel' | 'na-btn' | 'na-btn-primary'
    | 'na-btn-ghost' | 'na-input' | 'na-select' | 'na-table'
    | 'na-modal' | 'na-toast' | 'na-status';
  
  export type AllClasses = TypographyClass | ComponentClass;
}
```

---

## Success Metrics

### Developer Experience
- ✅ **IDE Autocomplete**: 100% of CSS classes have autocomplete
- ✅ **Type Safety**: 100% of tokens have TypeScript types
- ✅ **Integration Time**: < 5 minutes to integrate with shadcn/ui
- ✅ **Documentation**: 100% of integrations documented

### Technical
- ✅ **Token Coverage**: All CSS tokens available in JSON/TS
- ✅ **Class Coverage**: All CSS classes have TypeScript definitions
- ✅ **Bundle Size**: < 10KB (CSS only, no JS)
- ✅ **Build Time**: < 5s (CSS compilation)

---

## What You DON'T Need to Build

### ❌ Component Libraries
- No React components
- No Vue components
- No Svelte components
- **Reason**: Developers use shadcn/ui, Radix, etc.

### ❌ State Management
- No hooks for component state
- No context providers
- **Reason**: Component libraries handle this

### ❌ Component Logic
- No form validation
- No modal state management
- **Reason**: Component libraries handle this

### ✅ What You DO Provide
- Design tokens (CSS + JSON + TypeScript)
- CSS classes (with IDE autocomplete)
- Drift prevention (validation tooling)
- Integration guides (how to use with component libraries)

---

## Revised Checklist

### Critical (Must Have)
- [ ] Extract tokens to JSON
- [ ] Create TypeScript token types
- [ ] Create CSS class TypeScript definitions
- [ ] IDE autocomplete support
- [ ] shadcn/ui integration guide
- [ ] Radix UI integration guide

### Important (Should Have)
- [ ] Token documentation generator
- [ ] CSS class reference utility
- [ ] Tailwind integration guide
- [ ] Code examples repository

### Nice to Have
- [ ] Figma plugin (uses tokens.json)
- [ ] Theme customizer tool
- [ ] Visual token explorer

---

## Conclusion

**Your approach is correct**: Focus on the design system (tokens + CSS classes + drift prevention), not building components.

**What to build**:
1. Token distribution (JSON + TypeScript)
2. IDE autocomplete (TypeScript definitions)
3. Integration guides (shadcn/ui, Radix, etc.)

**What NOT to build**:
1. React/Vue/Svelte components
2. Component state management
3. Component logic

**Estimated Effort**: 4 weeks (vs. 14 weeks for full component library)

**Value**: Developers get drift prevention + IDE support, use their preferred component library.

---

**Next Action**: Start with Phase 1 (Token Distribution) - extract tokens to JSON and TypeScript.

