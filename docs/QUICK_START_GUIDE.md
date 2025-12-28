# Design System Quick Start Guide

**For**: Single Repo & Monorepo Development  
**Status**: ✅ **Ready to Use**

---

## Quick Start: Single Repository

### 1. Install Design System

```bash
# In your project root
pnpm add @aibos/design-system
```

### 2. Import CSS

```typescript
// app/globals.css or main.css
@import "@aibos/design-system/css";
```

### 3. Use Classes

```tsx
// components/Card.tsx
export function Card() {
  return (
    <div className="na-card na-p-6">
      <h1 className="na-h1">Title</h1>
      <p className="na-data">Content</p>
    </div>
  );
}
```

---

## Quick Start: Monorepo

### 1. Setup Workspace

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

### 2. Install in App

```bash
# In your app
pnpm add @aibos/design-system-core
```

### 3. Import & Use

```typescript
import '@aibos/design-system-core';
import { tokens } from '@aibos/design-system-tokens';

// Use classes
<div className="na-card">Content</div>

// Or use tokens
<div style={{ padding: tokens.spacing[6] }}>Content</div>
```

---

## Next Steps

See [REPO_ARCHITECTURE_GUIDE.md](./REPO_ARCHITECTURE_GUIDE.md) for detailed setup instructions.

