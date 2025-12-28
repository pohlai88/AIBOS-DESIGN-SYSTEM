# Figma → Neo-Analog Token Mapping Template
## Ready for Component Extraction

**Date**: 2025-01-27  
**Status**: Template Ready - Awaiting Figma Variable Extraction

---

## Mapping Structure

This template will be populated once Figma variables are extracted from the selected component.

### Color Token Mapping

```javascript
// Figma Color Variables → Neo-Analog Tokens
const colorMapping = {
  // Background Colors
  // "figma/bg-primary": "var(--color-void)",
  // "figma/bg-secondary": "var(--color-paper)",
  // "figma/bg-tertiary": "var(--color-paper-2)",
  
  // Text Colors
  // "figma/text-primary": "var(--color-lux)",
  // "figma/text-secondary": "var(--color-lux-dim)",
  // "figma/text-meta": "var(--color-clay)",
  
  // Accent Colors
  // "figma/accent": "var(--color-gold)",
  
  // Status Colors
  // "figma/success": "var(--color-success)",
  // "figma/warning": "var(--color-warning)",
  // "figma/error": "var(--color-error)",
  // "figma/info": "var(--color-info)",
  
  // Border Colors
  // "figma/border": "var(--color-stroke)",
  // "figma/border-strong": "var(--color-stroke-strong)",
  // "figma/border-soft": "var(--color-stroke-soft)"
}
```

### Spacing Token Mapping

```javascript
// Figma Spacing → Neo-Analog Spacing Tokens
const spacingMapping = {
  // Common mappings (will be updated with actual Figma values):
  // 4px → var(--spacing-1)
  // 8px → var(--spacing-2)
  // 12px → var(--spacing-3)
  // 16px → var(--spacing-4)
  // 24px → var(--spacing-6)  // Standard Comfort Edition spacing
  // 32px → var(--spacing-8)  // Standard content padding
  // 48px → var(--spacing-12)
  // 64px → var(--spacing-16)
}
```

### Typography Mapping

```javascript
// Figma Typography → Neo-Analog Semantic Classes
const typographyMapping = {
  // Font Sizes → Semantic Classes
  // 32px Bold → ".na-h1" (Page Title)
  // 24px Semibold → ".na-h2" (Section Title)
  // 20px Semibold → ".na-h3" (Subsection)
  // 18px Semibold → ".na-h4" (Card Title)
  // 16px Semibold → ".na-h5" (Small Title)
  // 14px Semibold → ".na-h6" (Micro Title)
  
  // Data Display
  // Monospace/Tabular → ".na-data" (Table cells, primary values)
  // Serif/Display Large → ".na-data-large" (Hero numbers, KPIs)
  
  // Metadata
  // Uppercase, tracked, dim → ".na-metadata" (Labels, headers)
  // Small, dim → ".na-metadata-small" (Timestamps, IDs)
}
```

### Component Class Mapping

```javascript
// Figma Components → Neo-Analog Semantic Classes
const componentMapping = {
  // Layout
  // "container": ".na-shell",
  // "card": ".na-card",
  // "panel": ".na-panel",
  // "grid": ".na-grid",
  // "content": ".na-content",
  
  // Interactive
  // "button-primary": ".na-btn-primary",
  // "button-secondary": ".na-btn",
  // "input": ".na-input",
  // "field": ".na-field",
  // "select": ".na-select",
  
  // Status
  // "badge-success": ".na-status.ok",
  // "badge-warning": ".na-status.warn",
  // "badge-error": ".na-status.bad",
  // "badge-pending": ".na-status.pending"
}
```

---

## Usage

Once Figma variables are extracted:
1. Replace placeholder comments with actual Figma variable names
2. Map each Figma value to the corresponding Neo-Analog token
3. Document any gaps (Figma variables not in Neo-Analog)
4. Propose additions to `input.css` if needed

---

## Validation

After mapping:
- Verify all mappings use design tokens (no hardcoded values)
- Ensure semantic classes are used (not arbitrary Tailwind)
- Check Figma compliance (100% standard tokens)

