# Figma Component Extraction Workflow
## Implementation Status & Progress Tracker

**Date**: 2025-01-27  
**Status**: In Progress  
**Component**: Pending nodeId from Figma Desktop

---

## Phase 1: Figma Desktop Extraction

### Step 1.1: Design Context Extraction
**Status**: ⏳ Waiting for nodeId

**Required Input:**
- Node ID from Figma Desktop (format: `1:234` or `123:456`)
- OR Figma file URL with node-id parameter

**Action Once nodeId Available:**
```javascript
// Use Figma Desktop MCP to extract design context
mcp_Figma_Desktop_get_design_context({
  nodeId: "[nodeId]", // Will be provided
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})
```

**Expected Output:**
- Component structure
- Visual design details
- Code representation
- Design tokens used

---

### Step 1.2: Variable Extraction
**Status**: ⏳ Waiting for Step 1.1

**Action:**
```javascript
// Extract all design variables
mcp_Figma_Desktop_get_variable_defs({
  nodeId: "[nodeId]",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})
```

**Expected Output:**
- Color variables
- Spacing variables
- Typography variables
- Border radius variables
- Shadow variables

---

### Step 1.3: Screenshot Capture
**Status**: ⏳ Waiting for Step 1.1

**Action:**
```javascript
// Get visual reference
mcp_Figma_Desktop_get_screenshot({
  nodeId: "[nodeId]",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})
```

**Purpose:** Visual reference for implementation validation

---

## Phase 2: Token Mapping (Ready)

### Mapping Strategy Template

Once variables are extracted, map them as follows:

#### Color Mapping
```javascript
const colorMapping = {
  // Figma Variable → Neo-Analog Token
  // Example mappings (will be updated with actual values):
  "figma/background": "var(--color-paper)",
  "figma/text-primary": "var(--color-lux)",
  "figma/text-secondary": "var(--color-lux-dim)",
  "figma/accent": "var(--color-gold)",
  "figma/border": "var(--color-stroke)"
}
```

#### Spacing Mapping
```javascript
const spacingMapping = {
  // Figma Spacing → Neo-Analog Token
  // Example: 24px → var(--spacing-6)
  // Will be populated with actual values
}
```

#### Typography Mapping
```javascript
const typographyMapping = {
  // Figma Typography → Neo-Analog Classes
  // Example mappings:
  "page-title": ".na-h1",
  "section-title": ".na-h2",
  "card-title": ".na-h4",
  "data-value": ".na-data",
  "label": ".na-metadata"
}
```

---

## Phase 3: shadcn Discovery (Ready)

### Component Search Strategy

Based on extracted design, search for:
- Card components
- Button components
- Input/Form components
- Table components
- Chart/Data visualization components
- Navigation components

**Tools Ready:**
- `mcp_shadcn_search_items_in_registries`
- `mcp_shadcn_get_item_examples_from_registries`
- `mcp_shadcn_get_add_command_for_items`

---

## Phase 4: Implementation (Template Ready)

### File Structure
```
prototypes/
  └── prototype-figma-[component-name].html
docs/
  └── [component-name]-implementation.md
```

### Implementation Template
- Uses Neo-Analog semantic classes
- Integrates shadcn components
- Applies design tokens
- Follows AI_DESIGN_PROTOCOL.md

---

## Next Steps

1. **Get nodeId** from Figma Desktop
2. **Extract design context** using Figma Desktop MCP
3. **Map tokens** to Neo-Analog
4. **Discover shadcn** components
5. **Generate implementation**
6. **Validate** with scripts
7. **Document** the process

---

**Note**: This workflow is ready to execute once the nodeId is provided. All templates and structures are prepared.

