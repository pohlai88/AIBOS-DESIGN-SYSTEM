# Figma MCP Compliance Strategy
## Ensuring Design System Compliance in Prototypes & Future Development

**Date**: 2025-01-27  
**Purpose**: How to use Figma MCP to ensure 100% compliance with DESIGN_SYSTEM.md  
**Status**: ✅ **STRATEGY DOCUMENT**

---

## Overview

This document explains how to use **Figma MCP** (Model Context Protocol) to:
1. Extract design tokens from Figma
2. Map Figma designs to Neo-Analog Design System
3. Generate compliant code automatically
4. Validate existing prototypes against Figma designs
5. Ensure future development follows design system standards

---

## The Problem

Current prototypes have **73% compliance** with `DESIGN_SYSTEM.md` because:
- Design tokens are extracted manually
- No automated validation against Figma source
- Inline styles used instead of semantic classes
- Typography hierarchy not enforced
- Spacing values hardcoded instead of using tokens

---

## The Solution: Figma MCP Workflow

### Workflow Overview

```
Figma Design → Figma MCP → Design Tokens → Semantic Classes → Compliant Code
     ↓              ↓            ↓              ↓                ↓
  Source      Extract      Map to NA      Generate        Validate
```

---

## Step-by-Step Compliance Workflow

### Phase 1: Extract Design Tokens from Figma

#### 1.1 Get Figma File Structure

**Using Figma Desktop MCP:**
```javascript
// Get metadata for design system file
get_metadata({
  nodeId: "0:1" // Page node ID
})
```

**What to Extract:**
- Component hierarchy
- Design token definitions
- Variable definitions
- Component variants

#### 1.2 Extract Design Variables

**Using Figma Desktop MCP:**
```javascript
// Get all design tokens/variables
get_variable_defs({
  nodeId: "[component-node-id]"
})
```

**Expected Output:**
```json
{
  "color/primary": "#eab308",
  "color/paper": "#121214",
  "spacing/standard": "24px",
  "typography/h1": "32px Bold",
  "radius/card": "12px"
}
```

#### 1.3 Map Figma Tokens to Neo-Analog

**Token Mapping Table:**

| Figma Variable | Neo-Analog Token | Semantic Class |
|---------------|------------------|----------------|
| `color/primary` | `--color-gold` | `.na-btn-primary` |
| `color/paper` | `--color-paper` | `.na-card` |
| `spacing/standard` | `--spacing-6` | `.na-mt-6`, `.na-p-6` |
| `typography/h1` | `--heading-1-*` | `.na-h1` |
| `radius/card` | `--radius-card` | `.na-card` |

---

### Phase 2: Generate Compliant Code

#### 2.1 Extract Component Design

**Using Figma Desktop MCP:**
```javascript
// Get complete component design
get_design_context({
  nodeId: "[component-node-id]",
  artifactType: "REUSABLE_COMPONENT",
  taskType: "CREATE_ARTIFACT"
})
```

**What You Get:**
- Component structure
- Design tokens used
- Visual design
- Code representation

#### 2.2 Apply Design System Rules

**Prompt Template:**
```
Extract [component-name] from Figma file [fileKey], node [nodeId].

Requirements:
1. Use ONLY Neo-Analog semantic classes (.na-*)
2. Map Figma tokens to design system tokens
3. Follow typography hierarchy (.na-h1 through .na-h6)
4. Use semantic spacing classes (.na-mt-*, .na-gap-*)
5. NO inline styles (except dynamic values)
6. NO arbitrary Tailwind classes
7. Use .na-card, .na-grid, .na-content for layout
8. Use .na-data, .na-metadata for content
```

#### 2.3 Generate Compliant HTML

**Example Output:**
```html
<!-- ✅ COMPLIANT - Generated from Figma MCP -->
<section class="na-card na-mt-8">
  <div class="na-panel-head">
    <div>
      <h2 class="na-h2 na-panel-title">Component Name</h2>
      <p class="na-metadata na-panel-meta">Description</p>
    </div>
  </div>
  
  <div class="na-grid na-gap-4">
    <div class="na-card">
      <h5 class="na-h5 variant-header">Variant</h5>
      <div class="na-data">Value</div>
      <div class="na-metadata-small">Label</div>
    </div>
  </div>
</section>
```

---

### Phase 3: Validate Existing Prototypes

#### 3.1 Compare Prototype with Figma Source

**Workflow:**
1. Extract component from Figma using `get_design_context`
2. Extract design tokens using `get_variable_defs`
3. Compare with existing prototype code
4. Identify compliance violations

#### 3.2 Automated Validation Checklist

**Check for:**
- [ ] Inline styles (should be semantic classes)
- [ ] Hardcoded spacing (should use tokens)
- [ ] Typography hierarchy (should use .na-h*)
- [ ] Color usage (should use design tokens)
- [ ] Layout classes (should use .na-card, .na-grid)

#### 3.3 Generate Fix Recommendations

**Example Output:**
```markdown
## Compliance Violations Found

### prototype-figma-color-palette.html

**Line 241:**
```html
<!-- ❌ WRONG -->
<body style="background: var(--color-void); padding: var(--spacing-8);">
```

**Should be:**
```html
<!-- ✅ CORRECT -->
<body class="na-app na-density-comfort">
```

**Line 248:**
```html
<!-- ❌ WRONG -->
<section class="na-card" style="margin-top: var(--spacing-8);">
```

**Should be:**
```html
<!-- ✅ CORRECT -->
<section class="na-card na-mt-8">
```
```

---

## Figma MCP Tools for Compliance

### 1. `get_design_context`

**Purpose**: Extract complete component design  
**Use Case**: Generate compliant code from Figma designs

**Example:**
```javascript
get_design_context({
  nodeId: "123:456",
  artifactType: "REUSABLE_COMPONENT",
  taskType: "CREATE_ARTIFACT",
  clientFrameworks: "html,css",
  clientLanguages: "html,css"
})
```

**Output**: Complete component code with design tokens

---

### 2. `get_variable_defs`

**Purpose**: Extract design tokens/variables  
**Use Case**: Map Figma tokens to Neo-Analog tokens

**Example:**
```javascript
get_variable_defs({
  nodeId: "123:456"
})
```

**Output**: All design tokens used in component

---

### 3. `get_metadata`

**Purpose**: Get component structure  
**Use Case**: Understand component hierarchy before extraction

**Example:**
```javascript
get_metadata({
  nodeId: "123:456"
})
```

**Output**: Component structure, hierarchy, node IDs

---

### 4. `get_screenshot`

**Purpose**: Visual reference  
**Use Case**: Validate implementation matches design

**Example:**
```javascript
get_screenshot({
  nodeId: "123:456"
})
```

**Output**: Screenshot for visual comparison

---

## Compliance Enforcement Strategy

### Strategy 1: Pre-Implementation Validation

**Before writing code:**
1. Extract design from Figma
2. Extract design tokens
3. Map tokens to Neo-Analog
4. Generate compliant code template
5. Implement using template

**Result**: 100% compliance from start

---

### Strategy 2: Post-Implementation Validation

**After writing code:**
1. Extract same component from Figma
2. Compare tokens used
3. Check semantic class usage
4. Validate typography hierarchy
5. Generate fix recommendations

**Result**: Identify and fix violations

---

### Strategy 3: Continuous Validation

**During development:**
1. Set up automated Figma MCP checks
2. Validate on each commit
3. Compare with Figma source
4. Block non-compliant code

**Result**: Prevent drift over time

---

## Token Mapping Automation

### Automated Mapping Script

```javascript
// figma-to-na-mapping.js
const figmaToNA = {
  // Colors
  "color/primary": "var(--color-gold)",
  "color/paper": "var(--color-paper)",
  "color/lux": "var(--color-lux)",
  
  // Spacing
  "spacing/4": "var(--spacing-4)",
  "spacing/6": "var(--spacing-6)",
  "spacing/8": "var(--spacing-8)",
  
  // Typography
  "typography/h1": ".na-h1",
  "typography/h2": ".na-h2",
  "typography/h3": ".na-h3",
  
  // Radius
  "radius/card": "var(--radius-card)",
  "radius/control": "var(--radius-control)"
};

function mapFigmaToNA(figmaToken) {
  return figmaToNA[figmaToken] || figmaToken;
}
```

---

## Implementation Workflow

### For New Components

1. **Extract from Figma**
   ```
   "Get design context for [component] from Figma file [fileKey], node [nodeId]"
   ```

2. **Map Tokens**
   ```
   "Map Figma tokens to Neo-Analog design system tokens"
   ```

3. **Generate Code**
   ```
   "Generate HTML using ONLY Neo-Analog semantic classes (.na-*), 
   following DESIGN_SYSTEM.md rules, no inline styles"
   ```

4. **Validate**
   ```
   "Check generated code for compliance with DESIGN_SYSTEM.md"
   ```

---

### For Existing Prototypes

1. **Extract Source Design**
   ```
   "Get design context for [component] from Figma"
   ```

2. **Compare with Prototype**
   ```
   "Compare prototype code with Figma source, identify compliance violations"
   ```

3. **Generate Fixes**
   ```
   "Generate compliant code fixes using Neo-Analog semantic classes"
   ```

4. **Apply Fixes**
   ```
   "Apply fixes to prototype file"
   ```

---

## Best Practices

### 1. Always Extract Tokens First

**Before generating code:**
- Extract design variables
- Map to Neo-Analog tokens
- Document mappings

### 2. Use Semantic Classes Only

**Never use:**
- Inline styles (except dynamic values)
- Arbitrary Tailwind classes
- Hardcoded values

**Always use:**
- `.na-*` semantic classes
- Design tokens (`var(--color-*)`)
- Typography hierarchy (`.na-h1` through `.na-h6`)

### 3. Validate Against Figma Source

**After implementation:**
- Compare with Figma design
- Verify token usage
- Check visual match

### 4. Document Token Mappings

**Maintain mapping table:**
- Figma variable → Neo-Analog token
- Update when design system changes
- Use for future components

---

## Compliance Checklist

When using Figma MCP, ensure:

- [ ] Design tokens extracted from Figma
- [ ] Tokens mapped to Neo-Analog design system
- [ ] Code uses semantic classes only
- [ ] Typography hierarchy followed
- [ ] Spacing uses tokens/classes
- [ ] No inline styles (except dynamic)
- [ ] Layout uses semantic classes
- [ ] Data/metadata classes used correctly
- [ ] Visual match with Figma design
- [ ] Compliance validated

---

## Example: Fixing prototype-figma-color-palette.html

### Step 1: Extract from Figma

```javascript
// Get color palette component from Figma
get_design_context({
  nodeId: "[color-palette-node-id]",
  artifactType: "DESIGN_SYSTEM"
})
```

### Step 2: Map Tokens

```javascript
// Extract design variables
get_variable_defs({
  nodeId: "[color-palette-node-id]"
})

// Map to Neo-Analog
const mapping = {
  "figma-font-light-primary": "var(--color-lux)",
  "figma-bg-dark-default": "var(--color-paper)",
  // ... etc
}
```

### Step 3: Generate Compliant Code

```html
<!-- ✅ COMPLIANT - Generated from Figma MCP -->
<body class="na-app na-density-comfort">
  <div class="na-content">
    <h1 class="na-h1">Color Palette</h1>
    <p class="na-metadata">Advanced Data Visualization Design System</p>
    
    <section class="na-card na-mt-8">
      <h2 class="na-h2">Font</h2>
      
      <div class="na-mt-6">
        <h3 class="na-h4">Font/Light</h3>
        <div class="na-grid na-gap-4">
          <div>
            <div class="color-swatch" style="background: var(--figma-font-light-primary);"></div>
            <div class="na-metadata-small">Primary</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</body>
```

### Step 4: Validate

- ✅ No inline spacing styles
- ✅ Semantic classes used
- ✅ Typography hierarchy correct
- ✅ Tokens used correctly

---

## Future Development Workflow

### For Every New Component:

1. **Extract from Figma** → Get design + tokens
2. **Map Tokens** → Figma → Neo-Analog
3. **Generate Code** → Using semantic classes
4. **Validate** → Check compliance
5. **Test** → Visual match with Figma

**Result**: 100% compliant code from start

---

## Tools & Resources

### Figma MCP Tools
- `get_design_context` - Extract component designs
- `get_variable_defs` - Extract design tokens
- `get_metadata` - Get component structure
- `get_screenshot` - Visual reference

### Design System Resources
- `DESIGN_SYSTEM.md` - Complete design system documentation
- `.cursorrules` - Compliance rules
- `input.css` - Design tokens source
- `style.css` - Compiled design system

---

## Conclusion

Using **Figma MCP** ensures:
- ✅ Design tokens extracted automatically
- ✅ Token mapping to Neo-Analog
- ✅ Compliant code generation
- ✅ Validation against source
- ✅ Prevention of design drift

**Next Steps:**
1. Fix existing prototypes using this workflow
2. Set up automated validation
3. Document token mappings
4. Train team on workflow

---

**Last Updated**: 2025-01-27  
**Status**: ✅ **READY FOR IMPLEMENTATION**

