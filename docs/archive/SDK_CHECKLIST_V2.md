# SDK Checklist V2: Design System as Styling Layer

**Approach**: Provide design tokens + CSS classes + IDE support. Let developers use shadcn/ui, Radix, etc.

---

## ✅ What Exists (95% Complete)

### Design System Foundation
- [x] 100+ CSS design tokens (`--color-*`, `--spacing-*`, etc.)
- [x] CSS component classes (`.na-h1`, `.na-data`, `.na-card`, etc.)
- [x] Build system (PostCSS + Tailwind v4)
- [x] Validation scripts (drift prevention)
- [x] Documentation
- [x] HTML prototypes

---

## 🔴 What's Missing (5% Complete)

### 1. Token Distribution (0%)
- [ ] Extract tokens to JSON (`tokens.json`)
- [ ] Create TypeScript token types (`tokens/colors.ts`, etc.)
- [ ] Token documentation generator

### 2. IDE Autocomplete (0%)
- [ ] TypeScript definitions for CSS classes
- [ ] TypeScript definitions for tokens
- [ ] VS Code CSS custom data (enhance existing)
- [ ] CSS class reference utility

### 3. Integration Guides (0%)
- [ ] shadcn/ui integration guide
- [ ] Radix UI integration guide
- [ ] Tailwind CSS integration guide
- [ ] Code examples for each

### 4. Package Publishing (0%)
- [ ] Monorepo structure
- [ ] Package.json configuration
- [ ] Build pipeline
- [ ] NPM publishing

---

## 📦 Required Packages (Simplified)

```
@aibos/design-system-core      # CSS file + tokens.json
@aibos/design-system-tokens    # TypeScript token types
@aibos/design-system-types     # CSS class TypeScript definitions
```

**That's it!** No React/Vue/Svelte component packages needed.

---

## 🎯 Priority Tasks

### Week 1: Token Distribution
1. Extract CSS tokens → `tokens.json`
2. Create TypeScript token types
3. Test token consumption

### Week 2: IDE Support
4. Create CSS class TypeScript definitions
5. Enhance VS Code CSS custom data
6. Test IDE autocomplete

### Week 3: Integration Guides
7. Write shadcn/ui integration guide
8. Write Radix UI integration guide
9. Create code examples

### Week 4: Publishing
10. Set up monorepo
11. Configure packages
12. Publish to NPM

---

## ❌ What You DON'T Need to Build

- [ ] React components
- [ ] Vue components
- [ ] Svelte components
- [ ] Component state management
- [ ] Component logic
- [ ] Form validation
- [ ] Modal state management

**Reason**: Developers use shadcn/ui, Radix UI, or their preferred component library.

---

## ✅ What You DO Provide

- [x] Design tokens (CSS custom properties)
- [ ] Design tokens (JSON format)
- [ ] Design tokens (TypeScript types)
- [x] CSS classes (`.na-*`)
- [ ] CSS classes (TypeScript definitions for IDE)
- [x] Drift prevention (validation tooling)
- [ ] Integration guides (shadcn/ui, Radix, etc.)

---

## 📚 Integration Examples Needed

### shadcn/ui Integration
```tsx
// Style shadcn Button with design system
<Button className="na-btn na-btn-primary">Click</Button>
```

### Radix UI Integration
```tsx
// Style Radix Dialog with design system
<Dialog.Content className="na-modal__panel">...</Dialog.Content>
```

### Tailwind Integration
```tsx
// Use design system tokens in Tailwind
<div className="bg-void text-lux">...</div>
```

---

## 🎨 Token Extraction Checklist

### Colors
- [ ] Extract to `tokens/colors.json`
- [ ] Create `tokens/colors.ts` (TypeScript)
- [ ] Document color usage

### Typography
- [ ] Extract to `tokens/typography.json`
- [ ] Create `tokens/typography.ts` (TypeScript)
- [ ] Document typography hierarchy

### Spacing
- [ ] Extract to `tokens/spacing.json`
- [ ] Create `tokens/spacing.ts` (TypeScript)
- [ ] Document spacing scale

### Shadows
- [ ] Extract to `tokens/shadows.json`
- [ ] Create `tokens/shadows.ts` (TypeScript)

### Border Radius
- [ ] Extract to `tokens/radius.json`
- [ ] Create `tokens/radius.ts` (TypeScript)

---

## 💻 IDE Autocomplete Checklist

### TypeScript Definitions
- [ ] `types/css-classes.d.ts` - CSS class types
- [ ] `types/tokens.d.ts` - Token types
- [ ] `types/index.d.ts` - Main export

### VS Code Support
- [ ] Enhance `.vscode/css-custom-data.json`
- [ ] Add all CSS classes with descriptions
- [ ] Test autocomplete in VS Code

### CSS Class Reference
- [ ] Create `types/css-classes.ts` utility
- [ ] Export class names as constants
- [ ] Add JSDoc comments

---

## 📖 Documentation Checklist

### Getting Started
- [ ] Installation guide
- [ ] Basic usage
- [ ] Quick start examples

### Design Tokens
- [ ] Token reference
- [ ] Token usage examples
- [ ] Token TypeScript types

### CSS Classes
- [ ] Class reference
- [ ] Class usage examples
- [ ] IDE autocomplete guide

### Integrations
- [ ] shadcn/ui integration guide
- [ ] Radix UI integration guide
- [ ] Tailwind CSS integration guide
- [ ] Code examples for each

---

## ✅ Quality Gates

### Before Release
- [ ] All tokens in JSON format
- [ ] All tokens have TypeScript types
- [ ] All CSS classes have TypeScript definitions
- [ ] IDE autocomplete works (VS Code, WebStorm)
- [ ] Integration guides complete
- [ ] Code examples work
- [ ] Documentation complete

---

## 🚀 Quick Start (Future)

```bash
# Install
npm install @aibos/design-system-core

# Import CSS
import '@aibos/design-system-core/dist/style.css'

# Use tokens (TypeScript)
import { colors } from '@aibos/design-system/tokens'
const bgColor = colors.paper

# Use CSS classes (IDE autocomplete)
<div className="na-h1">Title</div>
<div className="na-data">$12,450</div>

# Integrate with shadcn/ui
<Button className="na-btn na-btn-primary">Click</Button>
```

---

**Status**: 🟢 Revised Approach - Focus on tokens + CSS + IDE support  
**Effort**: 4 weeks (vs. 14 weeks for component library)  
**Value**: Drift prevention + IDE support, developers use their preferred components

