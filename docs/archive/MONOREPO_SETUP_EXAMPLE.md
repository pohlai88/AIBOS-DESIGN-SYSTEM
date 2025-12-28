# Monorepo Setup Example

**Complete example** for setting up Neo-Analog Design System in a monorepo structure.

---

## Directory Structure

```
your-monorepo/
├── pnpm-workspace.yaml
├── package.json
│
├── packages/
│   ├── design-system-core/
│   │   ├── package.json
│   │   ├── input.css
│   │   ├── style.css
│   │   ├── dist/
│   │   │   ├── tokens.json
│   │   │   └── tokens/
│   │   │       └── index.d.ts
│   │   └── scripts/
│   │       └── extract-tokens.js
│   │
│   ├── design-system-tokens/
│   │   ├── package.json
│   │   ├── src/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   └── index.ts
│   │   └── dist/
│   │
│   └── design-system-types/
│       ├── package.json
│       ├── src/
│       │   └── classes.d.ts
│       └── dist/
│
└── apps/
    ├── web-app/
    │   ├── package.json
    │   └── src/
    │
    └── admin-dashboard/
        ├── package.json
        └── src/
```

---

## Configuration Files

### pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

### Root package.json

```json
{
  "name": "your-monorepo",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "build:ds": "pnpm --filter @aibos/design-system-core build",
    "dev": "pnpm -r --parallel dev",
    "lint": "pnpm -r lint",
    "format": "prettier --write \"**/*.{css,js,ts,json,md}\""
  },
  "devDependencies": {
    "prettier": "^3.7.4"
  }
}
```

### packages/design-system-core/package.json

```json
{
  "name": "@aibos/design-system-core",
  "version": "1.0.0",
  "type": "module",
  "main": "./style.css",
  "exports": {
    ".": "./style.css",
    "./css": "./style.css",
    "./tokens": "./dist/tokens.json",
    "./tokens/typescript": "./dist/tokens/index.d.ts"
  },
  "files": [
    "style.css",
    "input.css",
    "dist/**/*"
  ],
  "scripts": {
    "build": "pnpm exec postcss input.css -o style.css && pnpm extract:tokens",
    "extract:tokens": "node scripts/extract-tokens.js",
    "dev": "pnpm exec postcss input.css -o style.css --watch"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "postcss": "^8.5.6",
    "postcss-cli": "^11.0.1",
    "tailwindcss": "^4.1.18"
  }
}
```

### packages/design-system-tokens/package.json

```json
{
  "name": "@aibos/design-system-tokens",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./package.json": "./package.json"
  },
  "dependencies": {
    "@aibos/design-system-core": "workspace:*"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### apps/web-app/package.json

```json
{
  "name": "@aibos/web-app",
  "version": "1.0.0",
  "dependencies": {
    "@aibos/design-system-core": "workspace:*",
    "@aibos/design-system-tokens": "workspace:*"
  }
}
```

---

## Usage Example

```typescript
// apps/web-app/src/app/globals.css
@import "@aibos/design-system-core/css";

// apps/web-app/src/components/Card.tsx
import '@aibos/design-system-core';
import { tokens } from '@aibos/design-system-tokens';

export function Card({ children }) {
  return (
    <div className="na-card" style={{
      padding: tokens.spacing[6],
    }}>
      {children}
    </div>
  );
}
```

---

## Installation

```bash
# Install all dependencies
pnpm install

# Build design system
pnpm build:ds

# Build all packages
pnpm build

# Run in development
pnpm dev
```

---

**See [REPO_ARCHITECTURE_GUIDE.md](./REPO_ARCHITECTURE_GUIDE.md) for complete details.**

