# Publishing to npm via GitHub

This guide explains how to publish the Neo-Analog Design System to npm using GitHub Actions.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **npm Organization** (if using scoped package): Ensure `@aibos` organization exists on npm
3. **npm Access Token**: Generate a token with publish permissions

## Setup Steps

### 1. Create npm Access Token

1. Go to [npmjs.com](https://www.npmjs.com) and log in
2. Click your profile → **Access Tokens** → **Generate New Token**
3. Select **Automation** token type (for CI/CD)
4. Copy the token (you'll only see it once!)

### 2. Add Token to GitHub Secrets

1. Go to your GitHub repository: `https://github.com/pohlai88/AIBOS-DESIGN-SYSTEM`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

### 3. Verify Package Configuration

Ensure your `package.json` has:
- ✅ Correct `name`: `@aibos/design-system`
- ✅ Correct `version`: `1.0.0` (or next version)
- ✅ `files` array includes all necessary files
- ✅ `exports` configured correctly

## Publishing Methods

### Method 1: GitHub Release (Recommended)

**Automatic publishing when you create a GitHub Release:**

1. Go to your repository on GitHub
2. Click **Releases** → **Create a new release**
3. Choose a tag (e.g., `v1.0.0`) or create a new one
4. Fill in release title and description
5. Click **Publish release**
6. GitHub Actions will automatically:
   - Build the package
   - Run quality checks
   - Publish to npm

### Method 2: Manual Workflow Dispatch

**Publish manually via GitHub Actions:**

1. Go to **Actions** tab in your repository
2. Select **Publish to npm** workflow
3. Click **Run workflow**
4. Enter the version number (e.g., `1.0.1`)
5. Click **Run workflow**
6. The workflow will:
   - Update package.json version
   - Build and verify
   - Publish to npm
   - Create a Git tag

## Version Management

### Semantic Versioning

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backward compatible

### Updating Version Locally

If you need to update version before publishing:

```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)
npm version minor

# Major version (1.0.0 → 2.0.0)
npm version major
```

Then commit and push:
```bash
git add package.json
git commit -m "Bump version to 1.0.1"
git push origin main
```

## Workflow Details

The GitHub Actions workflow (`.github/workflows/publish-npm.yml`) does:

1. **Checkout code** - Gets the latest code
2. **Setup Node.js** - Installs Node.js 18 with pnpm
3. **Install dependencies** - Runs `pnpm install --frozen-lockfile`
4. **Quality checks** - Runs `pnpm quality` (linting, validation, semantic checks)
5. **Build package** - Runs `pnpm build` (compiles CSS, extracts tokens)
6. **Verify build** - Ensures `style.css` and `dist/tokens.json` exist
7. **Publish to npm** - Publishes with provenance (security feature)
8. **Create tag** - (If manual) Creates Git tag for the version

## Troubleshooting

### Error: "You do not have permission to publish"

**Solution:**
- Verify you're logged into npm: `npm whoami`
- Check if `@aibos` organization exists on npm
- Ensure your npm account has publish permissions for the organization
- Verify `NPM_TOKEN` secret is set correctly in GitHub

### Error: "Package name already exists"

**Solution:**
- Check if the package name is available: `npm view @aibos/design-system`
- If it exists, you need access to that package or use a different name
- Verify the package name in `package.json`

### Error: "Version already exists"

**Solution:**
- Update the version in `package.json` to a new version
- Use semantic versioning (patch/minor/major bump)

### Build fails

**Solution:**
- Check that all dependencies are in `package.json`
- Verify `pnpm-lock.yaml` is up to date
- Run `pnpm build` locally to test
- Check GitHub Actions logs for specific errors

## Post-Publishing

After successful publish:

1. **Verify on npm**: Visit `https://www.npmjs.com/package/@aibos/design-system`
2. **Test installation**: 
   ```bash
   npm install @aibos/design-system
   ```
3. **Update documentation**: If needed, update README with new version info
4. **Announce**: Share the release on your channels

## Security: npm Provenance

The workflow uses `--provenance` flag which:
- Links the npm package to the GitHub Actions run
- Provides transparency about where the package came from
- Helps users verify package authenticity

## Best Practices

1. ✅ **Always test locally first**: Run `pnpm build` and `pnpm quality` before publishing
2. ✅ **Use GitHub Releases**: More traceable and professional
3. ✅ **Follow semantic versioning**: Clear versioning helps users
4. ✅ **Write release notes**: Document what changed in each version
5. ✅ **Test after publish**: Install the published package to verify it works

## Quick Reference

```bash
# Check current version
npm view @aibos/design-system version

# Test install locally
npm pack
npm install ./aibos-design-system-1.0.0.tgz

# Verify package contents
npm pack --dry-run
```

---

**Ready to publish?** Create a GitHub Release or use the manual workflow dispatch!

