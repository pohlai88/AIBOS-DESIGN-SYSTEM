# Figma MCP Prompt Quick Reference
## One-Page Cheat Sheet for Maximum Effectiveness

**Date**: 2025-01-27  
**Purpose**: Quick reference for Figma MCP prompt engineering

---

## 🎯 Core Prompt Structure

```
"[ACTION] [TARGET] from Figma [fileKey]/[nodeId] using:
- Framework: [React/Vue/HTML]
- Design System: Neo-Analog (.na-* classes)
- Component Library: shadcn/ui
- File Path: [exact/path]
- Constraints: [semantic classes only, no arbitrary values]"
```

---

## 📋 Essential Prompt Templates

### Extract & Implement Component
```
"Extract [component] from Figma file [fileKey], node-id [nodeId].
Implement at [path] using:
- Neo-Analog: .na-card, .na-h2, .na-data
- shadcn: [Card, Button, Chart]
- Tokens: var(--color-paper), var(--spacing-6)
- NO arbitrary Tailwind classes"
```

### Map Design Tokens
```
"Map Figma variables from [nodeId] to Neo-Analog:
- Colors → --color-* tokens
- Spacing → --spacing-* tokens  
- Typography → .na-h1-.na-h6
Generate mapping table"
```

### Multi-MCP Workflow
```
"Orchestrate three-MCP workflow:
1. FIGMA: Extract [fileKey]/[nodeId]
2. SHADCN: Find '[component type]' equivalents
3. GITHUB: Create [path] with Neo-Analog + shadcn"
```

---

## 🎨 Neo-Analog Quick Mappings

### Typography
- Page Title → `.na-h1`
- Section → `.na-h2`
- Card Title → `.na-h4`
- Data Value → `.na-data`
- Label → `.na-metadata`

### Layout
- Dashboard → `.na-shell`
- Card → `.na-card`
- Panel → `.na-panel`
- Grid → `.na-grid`

### Colors
- Background → `var(--color-void)` or `var(--color-paper)`
- Text Primary → `var(--color-lux)`
- Text Secondary → `var(--color-lux-dim)`
- Accent → `var(--color-gold)`

### Spacing
- 24px → `var(--spacing-6)`
- 32px → `var(--spacing-8)`
- 16px → `var(--spacing-4)`

---

## 🚀 Advanced Patterns

### Innovation Request
```
"Generate [component] with:
- BASE: Design system compliance
- ENHANCED: Interactive features
- INNOVATIVE: [specific feature]"
```

### Pattern Discovery
```
"Extract reusable patterns from [fileKey]:
1. Identify repeated components
2. Map to Neo-Analog tokens
3. Find shadcn equivalents
4. Generate component library"
```

### Accessibility-First
```
"Implement [nodeId] with:
- ARIA attributes
- Semantic HTML
- Keyboard navigation
- WCAG AA compliance
- Neo-Analog classes"
```

---

## ✅ Validation Checklist

After implementation:
- [ ] Run: `pnpm enforce:semantics`
- [ ] Run: `pnpm validate`
- [ ] Check Figma compliance
- [ ] Verify no arbitrary values

---

## 📚 Key Resources

- `AI_DESIGN_PROTOCOL.md` - Semantic classes
- `docs/DESIGN_SYSTEM.md` - Full documentation
- `docs/FIGMA_MCP_PROMPT_OPTIMIZATION.md` - Complete guide
- `input.css` - Design tokens

---

**Quick Tip**: Always include file paths, framework, and design system constraints for best results!

