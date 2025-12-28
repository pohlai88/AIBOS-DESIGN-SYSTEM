# Publishing Guide: Making Design System Available to Others

**For**: External Users / npm Package Distribution  
**Status**: ✅ **Ready to Publish**

---

## 📦 Package Configuration

Your design system is already configured for npm publishing with:

- ✅ Package name: `@aibos/design-system`
- ✅ Proper exports configuration
- ✅ Files field (what gets published)
- ✅ TypeScript definitions
- ✅ Token exports (JSON + TypeScript)

---

## 🚀 Publishing Steps

### Step 1: Prepare for Publishing

```bash
cd design_system

# 1. Build the package
pnpm build

# 2. Verify what will be published
pnpm pack --dry-run
```

### Step 2: Configure npm Registry

```bash
# If publishing to npm (public)
npm login

# If using private registry (e.g., GitHub Packages)
npm config set @aibos:registry https://npm.pkg.github.com
```

### Step 3: Publish

```bash
# Publish to npm (public)
pnpm publish --access public

# Or publish to private registry
pnpm publish --registry https://npm.pkg.github.com
```

---

## 📥 How External Users Install

### Installation

```bash
# Using npm
npm install @aibos/design-system

# Using pnpm
pnpm add @aibos/design-system

# Using yarn
yarn add @aibos/design-system
```

---

## 💻 How External Users Use It

### Option 1: Import CSS (Recommended)

#### React/Next.js

```typescript
// app/layout.tsx (Next.js App Router)
import '@aibos/design-system/css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

```typescript
// pages/_app.tsx (Next.js Pages Router)
import '@aibos/design-system/css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

```tsx
// components/Card.tsx
export function Card() {
  return (
    <div className="na-card na-p-6">
      <h1 className="na-h1">Card Title</h1>
      <div className="na-data">$12,450.00</div>
      <div className="na-metadata">PO-88219 • Feed Supply</div>
    </div>
  );
}
```

#### Vite/React

```typescript
// main.tsx
import '@aibos/design-system/css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### Vue 3

```typescript
// main.ts
import '@aibos/design-system/css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

```vue
<!-- components/Card.vue -->
<template>
  <div class="na-card na-p-6">
    <h1 class="na-h1">Card Title</h1>
    <div class="na-data">$12,450.00</div>
    <div class="na-metadata">PO-88219 • Feed Supply</div>
  </div>
</template>
```

#### Svelte

```typescript
// app.js
import '@aibos/design-system/css';
import App from './App.svelte';

const app = new App({ target: document.body });
```

```svelte
<!-- components/Card.svelte -->
<div class="na-card na-p-6">
  <h1 class="na-h1">Card Title</h1>
  <div class="na-data">$12,450.00</div>
  <div class="na-metadata">PO-88219 • Feed Supply</div>
</div>
```

#### Vanilla HTML/JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My App</title>
  <link rel="stylesheet" href="./node_modules/@aibos/design-system/style.css">
</head>
<body>
  <div class="na-card na-p-6">
    <h1 class="na-h1">Card Title</h1>
    <div class="na-data">$12,450.00</div>
  </div>
</body>
</html>
```

### Option 2: Use Design Tokens

#### TypeScript

```typescript
// components/Button.tsx
import tokens from '@aibos/design-system/tokens';
import type { DesignTokens } from '@aibos/design-system/tokens/typescript';

export function Button() {
  return (
    <button
      className="na-btn na-btn-primary"
      style={{
        backgroundColor: tokens.color.primary,
        padding: tokens.spacing[6],
        borderRadius: tokens.radius.card,
      }}
    >
      Click me
    </button>
  );
}
```

#### JavaScript

```javascript
// components/Button.js
import tokens from '@aibos/design-system/tokens';

export function Button() {
  return (
    <button
      className="na-btn na-btn-primary"
      style={{
        backgroundColor: tokens.color.primary,
        padding: tokens.spacing[6],
      }}
    >
      Click me
    </button>
  );
}
```

---

## 📚 Complete Usage Examples

### Example 1: Full Component

```tsx
// components/ProductCard.tsx
export function ProductCard({ product }) {
  return (
    <div className="na-card na-p-6">
      <div className="na-h3">{product.name}</div>
      <div className="na-data-large">${product.price}</div>
      <div className="na-metadata">{product.sku}</div>
      <button className="na-btn na-btn-primary na-mt-4">
        Add to Cart
      </button>
    </div>
  );
}
```

### Example 2: Data Table

```tsx
// components/DataTable.tsx
export function DataTable({ data }) {
  return (
    <div className="na-table-wrap">
      <table className="na-table">
        <thead>
          <tr>
            <th className="na-th">Name</th>
            <th className="na-th">Price</th>
            <th className="na-th">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="na-tr">
              <td className="na-td">{item.name}</td>
              <td className="na-td na-tabular">{item.price}</td>
              <td className="na-td">
                <span className="na-status na-status-ok">Active</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Example 3: Beast Mode Patterns

```tsx
// components/ViewSwitcher.tsx
export function ViewSwitcher() {
  return (
    <>
      <input type="radio" name="view" id="v-grid" className="na-state-radio" defaultChecked />
      <input type="radio" name="view" id="v-kanban" className="na-state-radio" />
      
      <div className="na-view-controls">
        <label htmlFor="v-grid" className="na-state-label">Grid</label>
        <label htmlFor="v-kanban" className="na-state-label">Kanban</label>
      </div>
      
      <div className="na-viewport">
        <div className="na-view-pane" data-view="grid">
          {/* Grid content */}
        </div>
        <div className="na-view-pane" data-view="kanban">
          {/* Kanban content */}
        </div>
      </div>
    </>
  );
}
```

---

## 🔧 Framework-Specific Setup

### Next.js with Tailwind

```typescript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // Design system CSS is imported separately
  // No need to configure Tailwind - design system handles it
};
```

```typescript
// app/globals.css
@import '@aibos/design-system/css';

/* Your custom styles */
```

### Vite with PostCSS

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      // Design system CSS is self-contained
      // No additional PostCSS config needed
    },
  },
});
```

---

## 📖 Documentation for External Users

### What Gets Published

When you publish, users get:

- ✅ `style.css` - Compiled CSS (155KB)
- ✅ `input.css` - Source CSS (for reference)
- ✅ `dist/tokens.json` - Design tokens (JSON)
- ✅ `dist/tokens/index.d.ts` - TypeScript definitions
- ✅ `dist/tokens/index.ts` - TypeScript runtime
- ✅ `README.md` - Documentation

### Package Exports

```typescript
// Main CSS export
import '@aibos/design-system/css'
// or
import '@aibos/design-system'

// Design tokens (JSON)
import tokens from '@aibos/design-system/tokens'

// Design tokens (TypeScript)
import type { DesignTokens } from '@aibos/design-system/tokens/typescript'
import tokens from '@aibos/design-system/tokens/typescript'
```

---

## 🎯 Version Management

### Semantic Versioning

```bash
# Patch version (bug fixes)
pnpm version patch  # 1.0.0 → 1.0.1

# Minor version (new features)
pnpm version minor  # 1.0.0 → 1.1.0

# Major version (breaking changes)
pnpm version major  # 1.0.0 → 2.0.0
```

### Publishing New Versions

```bash
# 1. Update version
pnpm version patch

# 2. Build
pnpm build

# 3. Publish
pnpm publish --access public
```

---

## ✅ Pre-Publish Checklist

Before publishing, ensure:

- [ ] `pnpm build` runs successfully
- [ ] `dist/tokens.json` exists
- [ ] `dist/tokens/index.d.ts` exists
- [ ] `style.css` is compiled
- [ ] `README.md` is up to date
- [ ] Version number is correct
- [ ] Package name is correct (`@aibos/design-system`)
- [ ] All exports are working
- [ ] Test installation: `pnpm pack --dry-run`

---

## 🚨 Common Issues

### Issue: CSS not loading

**Solution**: Ensure CSS is imported before your app code:

```typescript
// ✅ Correct
import '@aibos/design-system/css';
import './app.css';

// ❌ Wrong
import './app.css';
import '@aibos/design-system/css';
```

### Issue: TypeScript errors

**Solution**: Ensure TypeScript can resolve the package:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "types": ["@aibos/design-system/tokens/typescript"]
  }
}
```

### Issue: Tokens not found

**Solution**: Use the correct import path:

```typescript
// ✅ Correct
import tokens from '@aibos/design-system/tokens';

// ❌ Wrong
import tokens from '@aibos/design-system';
```

---

## 📝 README for npm Package

Your `README.md` is already perfect for npm! It includes:

- ✅ Installation instructions
- ✅ Usage examples
- ✅ Documentation links
- ✅ Scripts reference
- ✅ Design tokens reference

---

## 🎉 Summary

**For External Users**:

1. **Install**: `pnpm add @aibos/design-system`
2. **Import CSS**: `import '@aibos/design-system/css'`
3. **Use Classes**: `<div className="na-card">`
4. **Use Tokens** (optional): `import tokens from '@aibos/design-system/tokens'`

**That's it!** The design system is self-contained and works with any framework.

---

**Ready to publish?** Run `pnpm build && pnpm publish --access public`

