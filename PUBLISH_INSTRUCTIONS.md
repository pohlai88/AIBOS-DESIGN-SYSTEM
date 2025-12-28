# Publishing to npm - Step by Step

## Current Status

✅ **Package is ready to publish**
- Build completed successfully
- All files are in place
- Package size: 52.7 KB (357.3 KB unpacked)

## Steps to Publish

### Step 1: Login to npm

You need to log in to npm first. Run this command:

```bash
cd design_system
npm login
```

This will:
1. Open a browser window for authentication
2. Or prompt for username, password, and email
3. Create an authentication token

**Note**: If you don't have an npm account, create one at https://www.npmjs.com/signup

### Step 2: Verify Login

```bash
npm whoami
```

This should show your npm username.

### Step 3: Publish

```bash
cd design_system
npm publish --access public
```

**Important**: The `--access public` flag is required because the package name starts with `@aibos/` (scoped package).

## What Will Be Published

- ✅ `style.css` (159KB) - Compiled CSS
- ✅ `input.css` (105KB) - Source CSS  
- ✅ `dist/tokens.json` (15.5KB) - Design tokens
- ✅ `dist/tokens/index.d.ts` (29.5KB) - TypeScript definitions
- ✅ `dist/tokens/index.ts` (309B) - TypeScript runtime
- ✅ `dist/headless-map.json` (36.3KB) - Headless map
- ✅ `README.md` (9.5KB) - Documentation
- ✅ `package.json` (2.2KB) - Package metadata

**Total**: 52.7 KB compressed, 357.3 KB unpacked

## After Publishing

Once published, users can install with:

```bash
npm install @aibos/design-system
```

And use it with:

```typescript
import '@aibos/design-system/css';
```

## Troubleshooting

### Error: "Access token expired or revoked"

**Solution**: Run `npm login` again to refresh your token.

### Error: "You do not have permission to publish"

**Solution**: 
1. Make sure you're logged in with the correct account
2. If the package name `@aibos/design-system` is taken, you may need to:
   - Use a different scope (e.g., `@your-username/design-system`)
   - Or contact npm support to transfer ownership

### Error: "Package name already exists"

**Solution**: 
1. Check if the package exists: https://www.npmjs.com/package/@aibos/design-system
2. If it exists and you own it, you can publish updates
3. If it exists and you don't own it, change the package name in `package.json`

## Next Steps After Publishing

1. **Verify Installation**:
   ```bash
   npm install @aibos/design-system
   ```

2. **Update Version** for future releases:
   ```bash
   npm version patch  # 1.0.0 → 1.0.1
   npm version minor  # 1.0.0 → 1.1.0
   npm version major  # 1.0.0 → 2.0.0
   ```

3. **Publish Updates**:
   ```bash
   npm publish --access public
   ```

---

**Ready?** Run `npm login` first, then `npm publish --access public`

