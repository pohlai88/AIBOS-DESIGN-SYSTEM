# Long-Term Implementation Guide

**Date**: 2025-01-27  
**Status**: 📋 **Implementation Roadmap**  
**Timeline**: 1-3 Months

---

## Overview

This guide provides step-by-step implementation instructions for the long-term goals:

1. **Figma Sync**: Automated Figma token synchronization
2. **Framework Packages**: React/Vue/Svelte integration packages
3. **Component Library**: Build component library on top of design system
4. **Documentation Site**: Create design system documentation site

---

## Phase 1: Figma Sync (Weeks 1-2)

### Goal
Automated synchronization of design tokens from Figma to codebase.

### Prerequisites

- [ ] Figma account with design system file
- [ ] Figma API access token
- [ ] Node.js environment
- [ ] Design system file key and node IDs

### Step 1: Setup Figma API Access

#### 1.1 Get Figma Access Token

1. Go to Figma → Settings → Account
2. Generate Personal Access Token
3. Store securely (use environment variables)

```bash
# .env
FIGMA_ACCESS_TOKEN=your_token_here
FIGMA_FILE_KEY=your_file_key_here
```

#### 1.2 Install Dependencies

```bash
cd design_system
pnpm add -D @figma/rest-api-sdk dotenv
```

### Step 2: Create Figma Sync Script

#### 2.1 Create Sync Tool Directory

```bash
mkdir -p tools/figma-sync
cd tools/figma-sync
```

#### 2.2 Create Sync Script

**File**: `tools/figma-sync/sync-tokens.js`

```javascript
#!/usr/bin/env node

/**
 * Figma Token Sync Tool
 * Syncs design tokens from Figma to input.css
 */

import { FigmaApi } from '@figma/rest-api-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../design_system');

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_ACCESS_TOKEN || !FIGMA_FILE_KEY) {
  console.error('❌ Missing FIGMA_ACCESS_TOKEN or FIGMA_FILE_KEY');
  process.exit(1);
}

const figma = new FigmaApi({ accessToken: FIGMA_ACCESS_TOKEN });

// Map Figma variable types to CSS tokens
const VARIABLE_MAPPING = {
  'COLOR': '--color-',
  'FLOAT': '--spacing-',
  'STRING': '--font-family-',
};

async function syncTokens() {
  try {
    console.log('🔄 Fetching variables from Figma...');
    
    // Get variables from Figma
    const { data: variables } = await figma.getFileVariables(FIGMA_FILE_KEY);
    
    console.log(`✅ Found ${variables.length} variables in Figma`);
    
    // Read current input.css
    const inputCssPath = path.join(rootDir, 'input.css');
    let inputCss = fs.readFileSync(inputCssPath, 'utf8');
    
    // Extract @theme block
    const themeRegex = /@theme\s*\{([\s\S]*?)\}/;
    const themeMatch = inputCss.match(themeRegex);
    
    if (!themeMatch) {
      console.error('❌ No @theme block found in input.css');
      process.exit(1);
    }
    
    // Process variables and update tokens
    const updatedTokens = new Map();
    
    for (const variable of variables) {
      const cssVarName = VARIABLE_MAPPING[variable.type] + variable.name.toLowerCase().replace(/\s+/g, '-');
      const cssValue = convertFigmaValueToCSS(variable);
      
      updatedTokens.set(cssVarName, cssValue);
    }
    
    // Update @theme block
    let themeContent = themeMatch[1];
    
    // Update existing tokens or add new ones
    for (const [varName, varValue] of updatedTokens) {
      const regex = new RegExp(`(${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}):\\s*[^;]+;`, 'g');
      if (regex.test(themeContent)) {
        // Update existing
        themeContent = themeContent.replace(regex, `$1: ${varValue};`);
      } else {
        // Add new token
        themeContent += `\n  ${varName}: ${varValue};`;
      }
    }
    
    // Reconstruct input.css
    inputCss = inputCss.replace(themeRegex, `@theme {\n${themeContent}\n}`);
    
    // Write updated file
    fs.writeFileSync(inputCssPath, inputCss);
    
    console.log('✅ Tokens synced successfully!');
    console.log(`   Updated ${updatedTokens.size} tokens`);
    
    // Rebuild
    console.log('🔄 Rebuilding design system...');
    // Trigger build (you can use child_process.exec if needed)
    
  } catch (error) {
    console.error('❌ Error syncing tokens:', error);
    process.exit(1);
  }
}

function convertFigmaValueToCSS(variable) {
  switch (variable.type) {
    case 'COLOR':
      return `#${variable.valuesByMode[Object.keys(variable.valuesByMode)[0]].toString(16).padStart(6, '0')}`;
    case 'FLOAT':
      return `${variable.valuesByMode[Object.keys(variable.valuesByMode)[0]]}px`;
    case 'STRING':
      return `"${variable.valuesByMode[Object.keys(variable.valuesByMode)[0]]}"`;
    default:
      return variable.valuesByMode[Object.keys(variable.valuesByMode)[0]];
  }
}

syncTokens();
```

#### 2.3 Add Script to package.json

```json
{
  "scripts": {
    "figma:sync": "node tools/figma-sync/sync-tokens.js"
  }
}
```

### Step 3: Setup CI/CD Integration

#### 3.1 GitHub Actions Workflow

**File**: `.github/workflows/figma-sync.yml`

```yaml
name: Sync Figma Tokens

on:
  schedule:
    - cron: '0 0 * * *' # Daily at midnight
  workflow_dispatch: # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Sync Figma tokens
        env:
          FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
        run: |
          cd design_system
          pnpm figma:sync
          pnpm build
      
      - name: Create PR if changes
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'chore: sync tokens from Figma'
          title: 'Sync Design Tokens from Figma'
          body: 'Automated sync of design tokens from Figma design system'
```

### Step 4: Drift Detection

#### 4.1 Create Drift Detection Script

**File**: `tools/figma-sync/validate-drift.js`

```javascript
import { FigmaApi } from '@figma/rest-api-sdk';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function validateDrift() {
  // Get Figma tokens
  const figmaTokens = await getFigmaTokens();
  
  // Get local tokens
  const localTokens = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'design_system/dist/tokens.json'), 'utf8')
  );
  
  // Compare and report drift
  const drift = compareTokens(figmaTokens, localTokens);
  
  if (drift.length > 0) {
    console.error('❌ Token drift detected:', drift);
    process.exit(1);
  }
  
  console.log('✅ No drift detected');
}
```

---

## Phase 2: Framework Packages (Weeks 3-4)

### Goal
Create framework-specific integration packages for React, Vue, and Svelte.

### Step 1: Setup Monorepo Structure

#### 1.1 Create Packages Directory

```bash
mkdir -p packages/design-system-react
mkdir -p packages/design-system-vue
mkdir -p packages/design-system-svelte
```

#### 1.2 Create pnpm-workspace.yaml

**File**: `pnpm-workspace.yaml`

```yaml
packages:
  - 'design_system'
  - 'packages/*'
  - 'apps/*'
```

### Step 2: React Package

#### 2.1 Create Package Structure

```bash
mkdir -p packages/design-system-react/src
cd packages/design-system-react
```

#### 2.2 Create package.json

**File**: `packages/design-system-react/package.json`

```json
{
  "name": "@aibos/design-system-react",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./css": "@aibos/design-system/css"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@aibos/design-system": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

#### 2.3 Create React Components

**File**: `packages/design-system-react/src/Button.tsx`

```typescript
import React from 'react';
import '@aibos/design-system/css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  className = '',
  children,
  ...props 
}: ButtonProps) {
  const baseClasses = 'na-btn';
  const variantClasses = {
    primary: 'na-btn-primary',
    secondary: 'na-btn-secondary',
    ghost: 'na-btn-ghost',
  };
  const sizeClasses = {
    sm: 'na-btn-sm',
    md: 'na-btn-md',
    lg: 'na-btn-lg',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

#### 2.4 Create Index File

**File**: `packages/design-system-react/src/index.ts`

```typescript
export * from './Button';
export * from './Card';
export * from './Input';
// ... export all components
```

### Step 3: Vue Package

#### 3.1 Create Package Structure

Similar to React package, but with Vue components.

**File**: `packages/design-system-vue/src/Button.vue`

```vue
<template>
  <button
    :class="buttonClasses"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import '@aibos/design-system/css';

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
});

const buttonClasses = computed(() => {
  return [
    'na-btn',
    `na-btn-${props.variant}`,
    `na-btn-${props.size}`,
  ];
});
</script>
```

### Step 4: Svelte Package

#### 4.1 Create Package Structure

Similar to React/Vue, but with Svelte components.

**File**: `packages/design-system-svelte/src/Button.svelte`

```svelte
<script lang="ts">
  import '@aibos/design-system/css';
  
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<button
  class="na-btn na-btn-{variant} na-btn-{size}"
  {...$$restProps}
>
  <slot />
</button>
```

---

## Phase 3: Component Library (Weeks 5-8)

### Goal
Build a comprehensive component library on top of the design system.

### Step 1: Component Planning

#### 1.1 Component Inventory

Create list of components to build:

- [ ] Button (variants, sizes, states)
- [ ] Card (with header, footer, actions)
- [ ] Input (text, number, email, password)
- [ ] Select (single, multi, searchable)
- [ ] Checkbox
- [ ] Radio
- [ ] Switch
- [ ] Table (sortable, filterable, paginated)
- [ ] Modal/Dialog
- [ ] Drawer
- [ ] Toast/Notification
- [ ] Tooltip
- [ ] Dropdown
- [ ] Tabs
- [ ] Accordion
- [ ] Breadcrumbs
- [ ] Pagination
- [ ] Form (validation, error states)

### Step 2: Component Development

#### 2.1 Component Template

**File**: `packages/design-system-react/src/components/ComponentName.tsx`

```typescript
import React from 'react';
import { cn } from '../utils/cn'; // className utility

export interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
}

export function ComponentName({ 
  className,
  children,
  ...props 
}: ComponentNameProps) {
  return (
    <div className={cn('na-component-name', className)} {...props}>
      {children}
    </div>
  );
}
```

#### 2.2 Component Documentation

**File**: `packages/design-system-react/src/components/ComponentName.stories.tsx`

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: 'Component content',
  },
};
```

### Step 3: Storybook Setup

#### 3.1 Install Storybook

```bash
cd packages/design-system-react
npx storybook@latest init
```

#### 3.2 Configure Storybook

**File**: `.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-design-tokens',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
```

---

## Phase 4: Documentation Site (Weeks 9-12)

### Goal
Create a comprehensive documentation site for the design system.

### Step 1: Choose Documentation Tool

**Options**:
- **Docusaurus** (Recommended) - React-based, great for design systems
- **VitePress** - Vue-based, fast
- **Nextra** - Next.js-based
- **Storybook** - Component-focused

**Recommendation**: **Docusaurus** for comprehensive documentation

### Step 2: Setup Docusaurus

#### 2.1 Initialize Docusaurus

```bash
npx create-docusaurus@latest docs-site classic
cd docs-site
```

#### 2.2 Configure Docusaurus

**File**: `docusaurus.config.js`

```javascript
const config = {
  title: 'Neo-Analog Design System',
  tagline: 'Enterprise-grade design system',
  url: 'https://your-docs-site.com',
  baseUrl: '/',
  
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  
  themeConfig: {
    navbar: {
      title: 'Neo-Analog',
      items: [
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Docs' },
        { to: '/components', label: 'Components', position: 'left' },
        { to: '/tokens', label: 'Tokens', position: 'left' },
      ],
    },
  },
};

module.exports = config;
```

#### 2.3 Import Design System

**File**: `src/css/custom.css`

```css
@import '@aibos/design-system/css';
```

### Step 3: Create Documentation Content

#### 3.1 Token Documentation

**File**: `docs/tokens/colors.md`

```markdown
# Colors

## Primitives

### Void
The main background color.

\`\`\`css
--color-void: #09090b;
\`\`\`

### Paper
Panel background color.

\`\`\`css
--color-paper: #121214;
\`\`\`
```

#### 3.2 Component Documentation

**File**: `docs/components/button.md`

```markdown
# Button

Buttons are used to trigger actions.

## Usage

\`\`\`tsx
import { Button } from '@aibos/design-system-react';

<Button variant="primary">Click me</Button>
\`\`\`

## Variants

- `primary` - Primary action
- `secondary` - Secondary action
- `ghost` - Subtle action
```

### Step 4: Deploy Documentation

#### 4.1 GitHub Pages

**File**: `.github/workflows/docs-deploy.yml`

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: |
          cd docs-site
          npm install
          npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs-site/build
```

---

## Implementation Checklist

### Phase 1: Figma Sync
- [ ] Setup Figma API access
- [ ] Create sync script
- [ ] Setup CI/CD workflow
- [ ] Create drift detection
- [ ] Test sync process

### Phase 2: Framework Packages
- [ ] Setup monorepo structure
- [ ] Create React package
- [ ] Create Vue package
- [ ] Create Svelte package
- [ ] Write integration guides

### Phase 3: Component Library
- [ ] Plan component inventory
- [ ] Setup Storybook
- [ ] Build core components
- [ ] Write component stories
- [ ] Document components

### Phase 4: Documentation Site
- [ ] Choose documentation tool
- [ ] Setup documentation site
- [ ] Write token documentation
- [ ] Write component documentation
- [ ] Deploy documentation

---

## Timeline

| Phase | Duration | Start Week | End Week |
|-------|----------|------------|----------|
| Phase 1: Figma Sync | 2 weeks | Week 1 | Week 2 |
| Phase 2: Framework Packages | 2 weeks | Week 3 | Week 4 |
| Phase 3: Component Library | 4 weeks | Week 5 | Week 8 |
| Phase 4: Documentation Site | 4 weeks | Week 9 | Week 12 |

**Total**: 12 weeks (3 months)

---

## Resources

- **Figma API Docs**: https://www.figma.com/developers/api
- **Docusaurus Docs**: https://docusaurus.io
- **Storybook Docs**: https://storybook.js.org
- **React Docs**: https://react.dev
- **Vue Docs**: https://vuejs.org
- **Svelte Docs**: https://svelte.dev

---

**Last Updated**: 2025-01-27  
**Status**: 📋 **Ready for Implementation**

