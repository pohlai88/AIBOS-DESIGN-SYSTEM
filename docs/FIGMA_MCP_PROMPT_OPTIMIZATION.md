# Figma MCP Prompt Optimization Guide
## ENRICH • MAXIMIZE • OPTIMIZE for Creativity & Innovation

**Date**: 2025-01-27  
**Purpose**: Advanced prompt engineering strategies for Figma MCP integration  
**Target**: AI-BOS Design System (Neo-Analog)  
**Goal**: Maximum creativity, innovation, and implementation quality

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [Prompt Architecture](#prompt-architecture)
3. [Design System Integration](#design-system-integration)
4. [Creative Strategies](#creative-strategies)
5. [Multi-MCP Orchestration](#multi-mcp-orchestration)
6. [Advanced Techniques](#advanced-techniques)
7. [Real-World Examples](#real-world-examples)
8. [Innovation Patterns](#innovation-patterns)

---

## Core Principles

### 1. Specificity Over Generality

**❌ Bad Prompt:**
```
"Generate code from this Figma design"
```

**✅ Excellent Prompt:**
```
"Extract the data visualization dashboard from Figma file 1258847030939461287, 
node-id 1:234, and implement it using:
- Neo-Analog semantic classes (.na-card, .na-data, .na-metadata)
- shadcn/ui Chart components from @shadcn/chart
- Design tokens from input.css (--color-paper, --spacing-6)
- File location: prototypes/prototype-data-viz.html
- Maintain 24px padding standard and 15px base font size"
```

### 2. Context-Rich Instructions

**Key Elements to Include:**
- **Framework**: React, Vue, HTML/CSS, etc.
- **Design System**: Neo-Analog classes and tokens
- **Component Library**: shadcn/ui, custom components
- **File Structure**: Exact paths and organization
- **Constraints**: Semantic classes only, no arbitrary values
- **Quality Standards**: Drift prevention, Figma compliance

### 3. Multi-Layer Integration

**Three-Layer Strategy:**
```
Figma Design → Design System Tokens → shadcn Components → Production Code
```

---

## Prompt Architecture

### Level 1: Foundation Prompts

#### Extract Design Context
```
"Get design context for Figma file [fileKey], node-id [nodeId]. 
Extract all design tokens, spacing, typography, and color variables.
Map Figma variables to Neo-Analog design tokens:
- Figma color tokens → --color-* CSS variables
- Figma spacing → --spacing-* tokens
- Figma typography → .na-h1 through .na-h6 classes"
```

#### Get Variable Definitions
```
"Extract all Figma variables used in node [nodeId] of file [fileKey].
For each variable, provide:
1. Variable name and value
2. Semantic mapping to Neo-Analog tokens
3. Usage context (background, text, border, etc.)
4. Recommended .na-* class equivalent"
```

### Level 2: Integration Prompts

#### Design System Mapping
```
"Analyze Figma design [nodeId] and create a mapping strategy:
1. Identify all visual elements (cards, buttons, tables, charts)
2. Map each element to Neo-Analog semantic classes:
   - Containers → .na-card, .na-panel, .na-shell
   - Typography → .na-h1-.na-h6, .na-data, .na-metadata
   - Interactive → .na-btn-primary, .na-field, .na-input
3. Extract spacing values and map to --spacing-* tokens
4. Map colors to --color-* semantic tokens
5. Identify shadcn/ui component equivalents"
```

#### Component Generation
```
"Generate React component for Figma node [nodeId] with:
- Component name: [ComponentName]
- File path: [exact/path/to/ComponentName.tsx]
- Use Neo-Analog classes: .na-card, .na-h2, .na-data
- Integrate shadcn/ui: [Card, Button, Chart] from @shadcn/[component]
- Apply design tokens: var(--color-paper), var(--spacing-6)
- Follow AI_DESIGN_PROTOCOL.md: NO arbitrary Tailwind classes
- Include TypeScript types and proper imports"
```

### Level 3: Advanced Orchestration

#### Multi-MCP Workflow
```
"Orchestrate three-MCP workflow:
1. FIGMA MCP: Extract design from [fileKey]/[nodeId]
   - Get design context
   - Extract variables
   - Get screenshot for reference
2. SHADCN MCP: Find matching components
   - Search for '[component type]' (e.g., 'data table', 'chart')
   - Get component examples
   - Retrieve add commands
3. GITHUB MCP: Create implementation
   - Create component file at [path]
   - Use design system classes
   - Integrate shadcn components
   - Follow codebase conventions"
```

---

## Design System Integration

### Neo-Analog Specific Prompts

#### Semantic Class Enforcement
```
"Implement Figma design [nodeId] using STRICT Neo-Analog semantic classes:
- Typography: Use .na-h1-.na-h6 ONLY (never text-[size])
- Layout: Use .na-shell, .na-card, .na-panel (never arbitrary padding)
- Data Display: Use .na-data, .na-metadata (Editor's Console pattern)
- Colors: Use var(--color-*) tokens (never hex codes)
- Spacing: Use var(--spacing-*) tokens (never arbitrary px values)

Reference: AI_DESIGN_PROTOCOL.md
Validation: Run 'pnpm enforce:semantics' to verify compliance"
```

#### Token Mapping Strategy
```
"Map Figma design tokens to Neo-Analog tokens:
- Figma Background → --color-paper or --color-void
- Figma Text Primary → --color-lux
- Figma Text Secondary → --color-lux-dim
- Figma Accent → --color-gold
- Figma Spacing 24px → --spacing-6
- Figma Spacing 32px → --spacing-8
- Figma Border → --color-stroke

For each mapping, provide:
1. Figma token name
2. Neo-Analog equivalent
3. Usage context
4. Semantic class recommendation"
```

#### Drift Prevention
```
"Generate code that PASSES drift prevention validation:
- NO arbitrary Tailwind classes (text-[14px], p-[32px], bg-zinc-900)
- ONLY semantic classes (.na-h1, .na-card, .na-data)
- ONLY design tokens (var(--color-*), var(--spacing-*))
- Follow typography hierarchy (.na-h1 for page titles, .na-h2 for sections)
- Use Editor's Console pattern (.na-metadata for labels, .na-data for values)

Run validation: pnpm enforce:semantics"
```

---

## Creative Strategies

### 1. Iterative Refinement

**Prompt Pattern:**
```
"Analyze Figma design [nodeId] and generate THREE implementation approaches:
1. MINIMAL: Core functionality with basic styling
2. ENHANCED: Full design system integration with animations
3. INNOVATIVE: Creative extensions beyond the design (accessibility, micro-interactions, progressive enhancement)

For each approach, provide:
- Code implementation
- Design system token usage
- shadcn component integration
- Innovation opportunities"
```

### 2. Pattern Discovery

**Prompt Pattern:**
```
"Extract reusable design patterns from Figma file [fileKey]:
1. Identify repeated components (cards, buttons, tables)
2. Extract design tokens used across patterns
3. Create component library structure:
   - Base components (Button, Card, Input)
   - Composite components (DataTable, Dashboard, ChartCard)
   - Layout patterns (Shell, Sidebar, Header)
4. Map to shadcn/ui equivalents
5. Generate component documentation"
```

### 3. Design System Extension

**Prompt Pattern:**
```
"Analyze Figma design [nodeId] for NEW design tokens needed:
1. Identify colors not in Neo-Analog palette
2. Identify spacing values not in --spacing-* tokens
3. Identify typography scales not in .na-h1-.na-h6
4. Propose additions to input.css:
   - New color primitives
   - New semantic mappings
   - New component classes
5. Ensure Figma compliance (100% standard tokens)"
```

### 4. Cross-Platform Adaptation

**Prompt Pattern:**
```
"Adapt Figma design [nodeId] for multiple platforms:
1. WEB: React + Tailwind + Neo-Analog classes
2. MOBILE: React Native with design token mapping
3. DESKTOP: Electron with CSS variable adaptation
4. DOCUMENTATION: Storybook component examples

For each platform:
- Map design tokens appropriately
- Adapt semantic classes
- Maintain design consistency
- Provide implementation code"
```

---

## Multi-MCP Orchestration

### Complete Workflow Prompt

```
"Execute complete design-to-code workflow:

PHASE 1: FIGMA ANALYSIS (Figma MCP)
1. Get metadata for file [fileKey], starting from page node
2. Identify key components and their node IDs
3. For each component:
   - Get design context
   - Extract variable definitions
   - Get screenshot for reference
4. Create component inventory with node IDs

PHASE 2: SHADCN DISCOVERY (shadcn MCP)
1. For each Figma component, search shadcn registry:
   - Search: '[component type]' (e.g., 'table', 'chart', 'card')
   - Get component examples
   - Retrieve add commands
2. Identify best matches
3. Get usage examples with code

PHASE 3: IMPLEMENTATION (GitHub MCP + Code Generation)
1. Create component files:
   - Path: [exact/path/to/component]
   - Use Neo-Analog classes
   - Integrate shadcn components
   - Apply design tokens
2. Create integration guide
3. Generate documentation

PHASE 4: VALIDATION
1. Run drift prevention: pnpm enforce:semantics
2. Validate tokens: pnpm validate
3. Check Figma compliance
4. Generate quality report"
```

### Parallel Processing

**Prompt Pattern:**
```
"Process multiple Figma components in parallel:
1. Extract design context for nodes: [nodeId1], [nodeId2], [nodeId3]
2. For each node simultaneously:
   - Get design context
   - Extract variables
   - Search shadcn equivalents
3. Generate component library structure
4. Create implementation files
5. Generate integration documentation"
```

---

## Advanced Techniques

### 1. Code Connect Integration

**Prompt Pattern:**
```
"Set up Code Connect mapping for Figma node [nodeId]:
1. Get existing code connect map
2. Identify component in codebase: [path/to/Component.tsx]
3. Add code connect mapping:
   - Node ID: [nodeId]
   - Component: [ComponentName]
   - Framework: React
   - Label: React
4. Verify mapping works for design-to-code generation"
```

### 2. Design System Rules Generation

**Prompt Pattern:**
```
"Generate design system rules file for Neo-Analog:
1. Use create_design_system_rules tool
2. Include:
   - Design token mappings
   - Semantic class usage
   - Component patterns
   - Drift prevention rules
   - Figma compliance standards
3. Save to: docs/DESIGN_SYSTEM_RULES.md
4. Ensure agent can reference during code generation"
```

### 3. Metadata-First Approach

**Prompt Pattern:**
```
"For large Figma designs, use metadata-first strategy:
1. Get metadata for entire page (no selection)
2. Identify component hierarchy
3. For each major component:
   - Get metadata (structure only)
   - Then get design context (styling)
4. This reduces token usage and improves efficiency"
```

### 4. Variable Extraction & Mapping

**Prompt Pattern:**
```
"Extract and map ALL Figma variables:
1. Get variable definitions for node [nodeId]
2. For each variable:
   - Name: [Figma variable name]
   - Value: [Figma value]
   - Type: [color/spacing/typography/etc.]
   - Neo-Analog equivalent: [--token-name]
   - Semantic class: [.na-class]
3. Create mapping table
4. Generate token migration guide"
```

---

## Real-World Examples

### Example 1: Data Visualization Dashboard

**Complete Prompt:**
```
"Implement the advanced data visualization dashboard from Figma:
- File: https://www.figma.com/community/file/1258847030939461287/advanced-data-visualization
- File Key: 1258847030939461287
- Target: prototypes/prototype-data-viz.html

REQUIREMENTS:
1. Extract design context for main dashboard frame
2. Map to Neo-Analog:
   - Dashboard container → .na-shell
   - Chart cards → .na-card with .na-h4 titles
   - Data tables → .na-table with .na-th, .na-tr, .na-td
   - KPI displays → .na-data-large for numbers, .na-metadata for labels
3. Integrate shadcn:
   - Search for 'dashboard' and 'chart' components
   - Use @shadcn/chart for visualizations
   - Use @shadcn/table for data tables
4. Apply design tokens:
   - Background: var(--color-void)
   - Cards: var(--color-paper)
   - Text: var(--color-lux) for data, var(--color-clay) for metadata
   - Spacing: var(--spacing-6) for card padding
5. NO arbitrary values - semantic classes only
6. Include TypeScript types if using React
7. Generate complete HTML prototype with embedded styles"
```

### Example 2: Component Library Generation

**Complete Prompt:**
```
"Generate complete component library from Figma design system:
- File: [fileKey]
- Target: components/ui/

WORKFLOW:
1. FIGMA: Get metadata for entire file
2. Identify all component variants:
   - Buttons (primary, secondary, ghost)
   - Cards (default, interactive, elevated)
   - Forms (input, select, textarea)
   - Tables (default, striped, compact)
3. For each component:
   - Extract design context
   - Get variable definitions
   - Map to Neo-Analog tokens
   - Find shadcn equivalents
4. Generate component files:
   - [ComponentName].tsx with TypeScript
   - Use .na-* classes
   - Integrate shadcn components
   - Apply design tokens
5. Create component documentation:
   - Usage examples
   - Props interface
   - Design token mapping
   - shadcn integration guide
6. Generate Storybook stories
7. Create component index file"
```

### Example 3: Design Token Migration

**Complete Prompt:**
```
"Migrate Figma design tokens to Neo-Analog:
- File: [fileKey]
- Extract: All color, spacing, typography variables

PROCESS:
1. Get variable definitions for entire file
2. Categorize variables:
   - Colors (background, text, accent, status)
   - Spacing (padding, margin, gap)
   - Typography (font size, line height, weight)
3. Map to Neo-Analog:
   - Figma colors → --color-* tokens
   - Figma spacing → --spacing-* tokens
   - Figma typography → .na-h1-.na-h6 classes
4. Identify gaps:
   - Tokens in Figma not in Neo-Analog
   - Propose additions to input.css
5. Create migration table:
   - Figma Token | Neo-Analog Token | Usage | Migration Path
6. Generate migration script (if needed)
7. Create validation checklist"
```

---

## Innovation Patterns

### 1. Progressive Enhancement

**Prompt Pattern:**
```
"Generate progressive enhancement strategy for Figma design [nodeId]:
1. BASE: Semantic HTML with Neo-Analog classes
2. ENHANCED: Interactive features with shadcn components
3. ADVANCED: Animations, micro-interactions, accessibility
4. INNOVATIVE: AI-powered features, real-time updates, adaptive UI

For each level:
- Implementation code
- Design system integration
- Performance considerations
- Accessibility features"
```

### 2. Design System Evolution

**Prompt Pattern:**
```
"Analyze Figma design [nodeId] for design system evolution opportunities:
1. Identify NEW patterns not in current system
2. Propose NEW semantic classes:
   - Naming: .na-[semantic-name]
   - Purpose: [clear description]
   - Usage: [when to use]
3. Propose NEW design tokens:
   - Type: [color/spacing/typography]
   - Name: --[semantic-name]
   - Value: [proposed value]
   - Rationale: [why needed]
4. Ensure Figma compliance
5. Generate implementation plan"
```

### 3. Cross-Framework Compatibility

**Prompt Pattern:**
```
"Create cross-framework component from Figma design [nodeId]:
1. Extract design context
2. Generate implementations:
   - React: [ComponentName].tsx
   - Vue: [ComponentName].vue
   - Svelte: [ComponentName].svelte
   - HTML/CSS: [ComponentName].html
3. For each framework:
   - Use framework-specific syntax
   - Apply Neo-Analog classes (universal)
   - Integrate framework-specific component libraries
   - Maintain design consistency
4. Create framework adapter guide
5. Generate comparison documentation"
```

### 4. Accessibility-First Implementation

**Prompt Pattern:**
```
"Generate accessibility-first implementation for Figma design [nodeId]:
1. Analyze design for accessibility:
   - Color contrast ratios
   - Focus states
   - Screen reader support
   - Keyboard navigation
2. Implement with:
   - ARIA attributes
   - Semantic HTML
   - Focus management
   - High contrast mode support
3. Use Neo-Analog:
   - Ensure color tokens meet WCAG AA
   - Use semantic classes for structure
   - Apply focus states (.na-focus)
4. Test with:
   - Screen readers
   - Keyboard navigation
   - Color blindness simulators
5. Generate accessibility report"
```

---

## Optimization Checklist

### Before Prompting

- [ ] Identify exact Figma file key and node ID
- [ ] Determine target framework (React, Vue, HTML/CSS)
- [ ] Specify file paths and structure
- [ ] List required shadcn components
- [ ] Define design system constraints
- [ ] Set quality standards (drift prevention, Figma compliance)

### During Prompting

- [ ] Use specific, context-rich prompts
- [ ] Include design system token mappings
- [ ] Specify semantic class usage
- [ ] Request multi-MCP orchestration when needed
- [ ] Ask for validation and testing
- [ ] Request documentation generation

### After Implementation

- [ ] Run drift prevention: `pnpm enforce:semantics`
- [ ] Validate tokens: `pnpm validate`
- [ ] Check Figma compliance
- [ ] Test component functionality
- [ ] Verify design system integration
- [ ] Generate quality report

---

## Quick Reference: Prompt Templates

### Template 1: Basic Component Extraction
```
"Extract [component type] from Figma file [fileKey], node-id [nodeId].
Implement using Neo-Analog classes and shadcn/ui components.
File: [path/to/component]"
```

### Template 2: Design System Mapping
```
"Map Figma design [nodeId] to Neo-Analog:
- Colors → --color-* tokens
- Spacing → --spacing-* tokens
- Typography → .na-h1-.na-h6 classes
- Components → .na-* semantic classes"
```

### Template 3: Multi-MCP Workflow
```
"Orchestrate Figma → shadcn → GitHub workflow:
1. Extract design from Figma [fileKey]/[nodeId]
2. Find shadcn equivalents
3. Generate implementation at [path]
4. Apply Neo-Analog classes and tokens"
```

### Template 4: Innovation Request
```
"Generate innovative implementation for Figma [nodeId]:
- Base: Design system compliance
- Enhanced: Interactive features
- Advanced: Micro-interactions
- Innovative: [specific innovation]"
```

---

## Conclusion

**Key Takeaways:**

1. **Specificity Wins**: The more context you provide, the better the output
2. **Design System First**: Always map to Neo-Analog tokens and classes
3. **Multi-MCP Power**: Orchestrate Figma, shadcn, and GitHub together
4. **Innovation Through Constraints**: Use design system constraints to drive creativity
5. **Validation Always**: Run drift prevention and token validation

**Next Steps:**

1. Start with Level 1 prompts (foundation)
2. Progress to Level 2 (integration)
3. Master Level 3 (orchestration)
4. Experiment with creative strategies
5. Build innovation patterns

**Resources:**

- `AI_DESIGN_PROTOCOL.md` - Semantic class reference
- `docs/DESIGN_SYSTEM.md` - Complete design system documentation
- `docs/FIGMA_SHADCN_GITHUB_MCP_INTEGRATION.md` - Multi-MCP workflow
- `input.css` - Design token definitions

---

**Status**: ✅ **Production Ready**  
**Version**: 1.0  
**Last Updated**: 2025-01-27

