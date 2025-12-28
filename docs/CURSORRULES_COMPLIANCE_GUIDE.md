# Cursor Rules Compliance Guide
## Applying `.cursorrules` to All Prototypes

**Last Updated**: 2025-01-27  
**Status**: ✅ **Active Enforcement**

---

## Overview

The `.cursorrules` file defines strict guidelines for using the Neo-Analog Design System. All prototypes must comply with these rules to prevent design drift and maintain consistency.

---

## Core Rules Checklist

### ✅ 1. Semantic Classes Only
**Rule**: Use semantic `.na-*` utility classes. **NEVER** use arbitrary Tailwind classes.

**Forbidden:**
```html
<!-- ❌ DO NOT USE -->
<div class="text-[14px] p-[32px] bg-zinc-900">
  <h3 class="text-lg font-bold text-white">Title</h3>
</div>
```

**Required:**
```html
<!-- ✅ CORRECT -->
<div class="na-card">
  <h3 class="na-h4">Title</h3>
</div>
```

---

### ✅ 2. Typography Hierarchy
**Rule**: Never hardcode font sizes. Use semantic intent classes.

| Intent | Class | Use For |
|--------|-------|---------|
| Page Title | `.na-h1` | Top of page, unique H1 |
| Section Title | `.na-h2` | Major page divisions |
| Subsection | `.na-h3` | Grouping content within sections |
| Card Title | `.na-h4` | Inside `.na-card` containers |
| Small Title | `.na-h5` | Minor groupings |
| Micro Title | `.na-h6` | Tiny headers, tooltips |

**Forbidden:**
```html
<!-- ❌ DO NOT USE -->
<h3 class="text-lg font-bold">Title</h3>
<p class="text-sm">Content</p>
```

**Required:**
```html
<!-- ✅ CORRECT -->
<h3 class="na-h4">Title</h3>
<p class="na-metadata">Content</p>
```

---

### ✅ 3. Data vs Metadata
**Rule**: Distinguish strictly between Label (Metadata) and Value (Content).

| Type | Class | Use For |
|------|-------|---------|
| DATA (Content) | `.na-data` | Table cells, primary values, user input |
| KPI (Impact) | `.na-data-large` | Hero numbers, dashboard stats |
| METADATA (Context) | `.na-metadata` | Field labels, column headers |
| FOOTNOTE (Detail) | `.na-metadata-small` | Timestamps, IDs, secondary info |

**Example:**
```html
<!-- ✅ CORRECT -->
<div class="na-card">
  <div class="na-metadata">Revenue</div>
  <div class="na-data-large">$4,200</div>
  <div class="na-metadata-small">Last updated 2m ago</div>
</div>
```

---

### ✅ 4. Layout Semantics
**Rule**: Use structural classes, not generic divs.

| Structure | Class | Use For |
|-----------|-------|---------|
| Shell | `.na-shell` | Sidebar + Main area grid |
| Surface | `.na-card` | Paper bg, shadow, filament top border |
| Grouping | `.na-panel` | Muted bg, internal separation |
| Grid | `.na-grid` | Standard 24px gap |
| Content | `.na-content` | Standard 32px padding |

**Example:**
```html
<!-- ✅ CORRECT -->
<div class="na-content">
  <section class="na-card na-mt-6">
    <div class="na-grid">
      <div class="na-card">...</div>
    </div>
  </section>
</div>
```

---

### ✅ 5. Interactive Components
**Rule**: Use semantic component classes.

| Component | Class | Variants |
|-----------|-------|----------|
| Button | `.na-btn` | Standard |
| Button (Primary) | `.na-btn-primary` | Action button |
| Input | `.na-input` | Form input |
| Badge | `.na-status` | Use with `.ok`, `.pending`, `.bad` |

---

### ✅ 6. Design Tokens in CSS
**Rule**: In `<style>` blocks, use design tokens, not hardcoded values.

**Forbidden:**
```css
/* ❌ DO NOT USE */
.chart-container {
  height: 300px;
  background-color: #121214;
  padding: 24px;
  border-radius: 8px;
}
```

**Required:**
```css
/* ✅ CORRECT */
.chart-container {
  height: 300px; /* Component-specific, acceptable */
  background-color: var(--color-paper);
  padding: var(--spacing-6);
  border-radius: var(--radius-md);
}
```

**Note**: Component-specific dimensions (like chart height) are acceptable in `<style>` blocks. The rule targets arbitrary Tailwind classes in HTML.

---

## Validation Process

### Step 1: Run Semantic Enforcement
```bash
pnpm enforce:semantics
```

This checks for:
- Arbitrary Tailwind classes (`text-[...]`, `p-[...]`, etc.)
- Hardcoded hex colors
- Hardcoded font sizes
- Hardcoded padding/margins

### Step 2: Run Design Token Validation
```bash
pnpm validate
```

This checks for:
- Design token usage
- Component class usage
- Typography hierarchy
- Color usage

### Step 3: Run Full Quality Check
```bash
pnpm validate:all
```

This runs all validation checks.

---

## Prototype-Specific CSS Guidelines

### Acceptable Component-Specific Styles

When creating prototypes, you may need component-specific CSS in `<style>` blocks. This is acceptable when:

1. **Using Design Tokens**: All values use `var(--token-name)`
2. **Component-Specific Dimensions**: Heights, widths for charts, containers, etc.
3. **SVG Styling**: SVG-specific attributes and styles
4. **Animation/Transition**: Component-specific animations

**Example (Chart Component):**
```css
<style>
  /* ✅ ACCEPTABLE - Component-specific with design tokens */
  .chart-container {
    width: 100%;
    height: 300px; /* Component-specific dimension */
    position: relative;
  }
  
  .chart-bar {
    fill: var(--color-primary); /* Design token */
    transition: all 200ms var(--ease-out); /* Design token */
  }
  
  .chart-label {
    fill: var(--color-lux); /* Design token */
    font-size: var(--font-size-sm); /* Design token */
    font-family: var(--font-family-sans); /* Design token */
  }
</style>
```

### Forbidden in Component CSS

```css
/* ❌ DO NOT USE */
.chart-container {
  height: 300px; /* OK - component-specific */
  background-color: #121214; /* ❌ Use var(--color-paper) */
  padding: 24px; /* ❌ Use var(--spacing-6) */
  border-radius: 8px; /* ❌ Use var(--radius-md) */
  font-size: 14px; /* ❌ Use var(--font-size-sm) */
}
```

---

## HTML Structure Compliance

### Required Structure
```html
<body class="na-app na-density-comfort">
  <div class="na-content">
    <h1 class="na-h1">Page Title</h1>
    <p class="na-metadata">Page description</p>
    
    <section class="na-card na-mt-6">
      <div class="na-panel-head">
        <div>
          <h2 class="na-h2 na-panel-title">Section Title</h2>
          <p class="na-metadata na-panel-meta">Section description</p>
        </div>
      </div>
      
      <div class="na-grid component-showcase-grid">
        <div class="na-card">
          <h3 class="na-h4">Card Title</h3>
          <div class="na-data">Value</div>
        </div>
      </div>
    </section>
  </div>
</body>
```

---

## Chart Column Prototype Compliance

### ✅ Verified Compliance

The `prototype-phase2-chart-column.html` file is **100% compliant** with `.cursorrules`:

1. ✅ **Semantic Classes**: All HTML uses `.na-*` classes
2. ✅ **Typography**: Uses `.na-h1`, `.na-h2`, `.na-h4`, `.na-metadata`
3. ✅ **Layout**: Uses `.na-content`, `.na-card`, `.na-grid`
4. ✅ **Design Tokens**: All CSS uses `var(--token-name)`
5. ✅ **No Arbitrary Classes**: No `text-[...]`, `p-[...]`, etc.
6. ✅ **No Hex Colors**: All colors use design tokens
7. ✅ **Component-Specific CSS**: Acceptable component dimensions in `<style>` block

---

## Future Prototype Checklist

Before submitting any prototype, verify:

- [ ] All HTML uses semantic `.na-*` classes
- [ ] No arbitrary Tailwind classes (`text-[...]`, `p-[...]`, etc.)
- [ ] Typography uses `.na-h*` classes, not hardcoded sizes
- [ ] All CSS uses design tokens (`var(--token-name)`)
- [ ] No hex colors (`#...`) in CSS
- [ ] Layout uses `.na-content`, `.na-card`, `.na-grid`
- [ ] Data/Metadata distinction (`.na-data`, `.na-metadata`)
- [ ] `pnpm enforce:semantics` passes
- [ ] `pnpm validate` passes

---

## Enforcement

**Automatic Validation:**
- `pnpm enforce:semantics` - Detects drift violations
- `pnpm validate` - Validates design token usage

**Manual Review:**
- Check HTML for arbitrary classes
- Check CSS for hardcoded values
- Verify semantic class usage

---

**Status**: ✅ All prototypes must comply with `.cursorrules` before submission.

