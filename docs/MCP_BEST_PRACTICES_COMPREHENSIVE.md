# MCP Best Practices - Comprehensive Guide
## Unified Recommendations from All MCP Servers

**Date**: 2025-01-27  
**Purpose**: Best practices for using MCP servers with the Neo-Analog Design System  
**Status**: ✅ **COMPREHENSIVE GUIDE**

---

## Overview

This document consolidates best practices from all available MCP servers:
- **Figma MCP** (Remote & Desktop)
- **shadcn MCP**
- **GitHub MCP**
- **Vercel MCP**
- **Next.js DevTools MCP**
- **Supabase MCP**
- **Browser MCP**

---

## 1. Figma MCP Best Practices

### Design System Integration

**From Figma Desktop MCP:**
- Analyze your codebase structure before extracting designs
- Map Figma tokens to your design system tokens
- Document token transformations and mappings
- Use semantic naming conventions

**Key Practices:**
1. **Token Definitions**
   - Document where design tokens are defined (colors, typography, spacing)
   - Use consistent format/structure for tokens
   - Implement token transformation systems

2. **Component Architecture**
   - Map Figma components to your component library structure
   - Document component variations and states
   - Maintain component documentation

3. **Asset Management**
   - Store assets in organized directories
   - Use CDN for production assets
   - Implement asset optimization

4. **Styling Approach**
   - Use semantic CSS classes (e.g., `.na-card`, `.na-h1`)
   - Avoid hardcoded values
   - Implement responsive design patterns

### Figma Desktop MCP Workflow

1. **Extract Design Context**
   - Always use `get_design_context` after `get_metadata`
   - Extract variable definitions for design tokens
   - Capture screenshots for visual reference

2. **Token Mapping**
   - Map Figma variables to Neo-Analog tokens
   - Document any transformations needed
   - Validate token usage with `pnpm validate`

3. **Implementation**
   - Use Neo-Analog semantic classes
   - Follow drift prevention guidelines
   - Run validation scripts after implementation

---

## 2. shadcn MCP Best Practices

### Component Audit Checklist

**After adding or generating components:**

- [ ] **Imports**: Ensure imports are correct (named vs default imports)
- [ ] **Next.js Image**: If using `next/image`, ensure `images.remotePatterns` in `next.config.js` is configured
- [ ] **Dependencies**: Ensure all dependencies are installed
- [ ] **Linting**: Check for linting errors or warnings
- [ ] **TypeScript**: Check for TypeScript errors
- [ ] **Testing**: Use Playwright MCP if available for browser testing

### shadcn Integration Workflow

1. **Search Registry**
   - Use `search_items_in_registries` to find matching components
   - Review component examples before adding
   - Check component dependencies

2. **Get Examples**
   - Use `get_item_examples_from_registries` for usage patterns
   - Review complete implementation code
   - Check for required dependencies

3. **Add Components**
   - Use `get_add_command_for_items` to get CLI commands
   - Run validation after adding components
   - Test component integration

---

## 3. GitHub MCP Best Practices

### Repository Management

1. **Branch Strategy**
   - Use feature branches for new components
   - Create pull requests for review
   - Use descriptive commit messages

2. **Code Quality**
   - Run linting before committing
   - Use semantic commit messages
   - Review code changes before merging

3. **Documentation**
   - Document component usage
   - Update README with new features
   - Maintain changelog

### GitHub Workflow

1. **Create Branch**: Use `create_branch` for feature work
2. **Push Changes**: Use `push_files` for multiple files
3. **Create PR**: Use `create_pull_request` for review
4. **Review**: Use `get_pull_request` to review changes

---

## 4. Vercel MCP Best Practices

### Deployment Configuration

**Best Practices:**
1. **Function Configuration**
   - Use appropriate function types (`fluid` or `standard`)
   - Configure memory allocation based on needs
   - Set appropriate timeouts

2. **Region Selection**
   - Deploy to regions closest to users
   - Use `--regions` flag for specific regions
   - Consider latency requirements

3. **Environment Variables**
   - Store sensitive data in environment variables
   - Use different environments for dev/staging/prod
   - Never commit secrets to repository

### Deployment Workflow

1. **Pre-Deployment**
   - Run validation scripts (`pnpm validate:all`)
   - Test locally before deploying
   - Check for linting errors

2. **Deployment**
   - Use `deploy_to_vercel` for automated deployments
   - Monitor deployment status
   - Check build logs for errors

3. **Post-Deployment**
   - Verify deployment URL
   - Test critical functionality
   - Monitor error logs

---

## 5. Next.js DevTools MCP Best Practices

### Development Workflow

1. **Initialize Context**
   - Always call `init` at the start of Next.js sessions
   - Use `nextjs_docs` for documentation queries
   - Query runtime with `nextjs_index` before making changes

2. **Error Detection**
   - Use `nextjs_call` to get compilation errors
   - Check runtime diagnostics
   - Validate routes before deployment

3. **Documentation**
   - Always query Next.js docs for concepts
   - Use `get` action with paths from llms.txt index
   - Follow official Next.js patterns

---

## 6. Supabase MCP Best Practices

### Security Best Practices

**Critical Recommendations:**

1. **Read-Only Mode**
   - Use `--read-only` flag for development
   - Prevents unintended database modifications
   - Still allows project management operations

2. **Project Scoping**
   - Use `--project-ref=<project-ref>` to limit access
   - Prevents access to other projects
   - Reduces security surface area

3. **Branching**
   - Use Supabase branching for development
   - Test changes in isolated environments
   - Merge to production after validation

4. **Feature Groups**
   - Enable/disable specific tool groups
   - Control which tools are available
   - Reduce attack surface

### Security Risks & Mitigation

**Prompt Injection:**
- Always review tool calls before execution
- Keep manual approval enabled
- Don't connect to production databases
- Use read-only mode when possible

**Recommendations:**
- ✅ Use development projects only
- ✅ Don't give MCP access to customers
- ✅ Use read-only mode for real data
- ✅ Scope to specific projects
- ✅ Use branching for testing

### Realtime Best Practices

1. **Private Channels**
   - Always use private channels for production
   - Implement proper authorization
   - Use RLS policies for access control

2. **Naming Conventions**
   - Use pattern: `scope:id:entity`
   - Examples: `room:123:messages`, `user:789:notifications`
   - Keep topic names descriptive

3. **Cleanup**
   - Always unsubscribe from channels
   - Clean up subscriptions in useEffect cleanup
   - Free up resources when done

---

## 7. Browser MCP Best Practices

### Testing Workflow

1. **Page Verification**
   - Use browser automation for Next.js projects
   - Captures runtime errors and hydration issues
   - Verifies full user experience

2. **Error Detection**
   - Check console messages for errors
   - Monitor network requests
   - Capture screenshots for debugging

3. **Testing Strategy**
   - Test critical user flows
   - Verify responsive design
   - Check accessibility

---

## 8. Neo-Analog Design System Integration

### Semantic Class Usage

**STRICT REQUIREMENTS:**
- ✅ Use semantic classes (`.na-*`)
- ✅ Use design tokens (`var(--spacing-*)`, `var(--color-*)`)
- ❌ NO arbitrary Tailwind classes
- ❌ NO hardcoded values

### Validation Workflow

1. **Drift Prevention**
   ```bash
   pnpm enforce:semantics
   ```
   - Validates semantic class usage
   - Detects hardcoded values
   - Prevents design drift

2. **Token Validation**
   ```bash
   pnpm validate
   ```
   - Validates design token usage
   - Checks component classes
   - Verifies typography hierarchy

3. **Full Quality Check**
   ```bash
   pnpm validate:all
   ```
   - Runs linting
   - Validates tokens
   - Enforces semantics

---

## 9. Complete Implementation Workflow

### Step-by-Step Process

1. **Figma Extraction**
   - Extract design context from Figma
   - Get variable definitions
   - Capture screenshots

2. **Token Mapping**
   - Map Figma tokens to Neo-Analog
   - Document transformations
   - Create mapping table

3. **Component Discovery**
   - Search shadcn registry
   - Get component examples
   - Review dependencies

4. **Implementation**
   - Create component files
   - Use Neo-Analog semantic classes
   - Integrate shadcn components

5. **Validation**
   - Run `pnpm enforce:semantics`
   - Run `pnpm validate`
   - Fix any issues

6. **Testing**
   - Test in browser
   - Check console for errors
   - Verify responsive design

7. **Documentation**
   - Document component usage
   - Update token mappings
   - Create examples

8. **Deployment**
   - Run final validation
   - Deploy to Vercel
   - Monitor deployment

---

## 10. Security Checklist

### Before Using MCP

- [ ] Use read-only mode when possible
- [ ] Scope to specific projects
- [ ] Use development environments
- [ ] Review all tool calls before execution
- [ ] Keep manual approval enabled
- [ ] Don't connect to production databases
- [ ] Use branching for testing
- [ ] Enable feature groups to limit tools

### During Development

- [ ] Validate all inputs
- [ ] Review generated code
- [ ] Test in isolated environment
- [ ] Check for security vulnerabilities
- [ ] Monitor error logs
- [ ] Use environment variables for secrets

### Before Deployment

- [ ] Run full validation suite
- [ ] Test all functionality
- [ ] Review security advisor recommendations
- [ ] Check for exposed secrets
- [ ] Verify environment variables
- [ ] Test in staging environment

---

## 11. Performance Best Practices

### Optimization Strategies

1. **Asset Optimization**
   - Use CDN for static assets
   - Optimize images
   - Minimize bundle size

2. **Code Splitting**
   - Lazy load components
   - Split routes
   - Use dynamic imports

3. **Caching**
   - Implement proper caching strategies
   - Use Vercel edge caching
   - Cache static assets

4. **Database**
   - Optimize queries
   - Use indexes
   - Implement connection pooling

---

## 12. Documentation Best Practices

### Component Documentation

1. **Usage Examples**
   - Provide code examples
   - Show different variants
   - Include props documentation

2. **Token Mapping**
   - Document Figma to Neo-Analog mappings
   - Explain transformations
   - Provide reference tables

3. **Integration Notes**
   - Document shadcn integration
   - Note any customizations
   - List dependencies

---

## 13. Troubleshooting Guide

### Common Issues

1. **Figma Access Denied**
   - Check file permissions
   - Verify Figma plan/seat type
   - Use Figma Desktop MCP as alternative

2. **Token Validation Failures**
   - Check token definitions
   - Verify semantic class usage
   - Review drift prevention rules

3. **Component Integration Issues**
   - Check dependencies
   - Verify imports
   - Review TypeScript errors

4. **Deployment Failures**
   - Check build logs
   - Verify environment variables
   - Review Vercel configuration

---

## 14. Quick Reference

### Essential Commands

```bash
# Validation
pnpm enforce:semantics    # Check semantic class usage
pnpm validate             # Validate design tokens
pnpm validate:all         # Full quality check

# Development
pnpm dev                  # Start dev server
pnpm build                # Build for production
pnpm watch                # Watch mode

# Quality
pnpm lint                 # Run linter
pnpm lint:fix             # Fix linting issues
pnpm format               # Format code
```

### MCP Tool Quick Reference

**Figma:**
- `get_design_context` - Extract design
- `get_variable_defs` - Get tokens
- `get_screenshot` - Visual reference

**shadcn:**
- `search_items_in_registries` - Find components
- `get_item_examples_from_registries` - Get examples
- `get_add_command_for_items` - Add components

**GitHub:**
- `create_branch` - Create feature branch
- `push_files` - Push changes
- `create_pull_request` - Create PR

**Vercel:**
- `deploy_to_vercel` - Deploy project
- `get_deployment` - Check deployment
- `get_deployment_build_logs` - View logs

**Supabase:**
- `execute_sql` - Query database
- `apply_migration` - Run migrations
- `get_advisors` - Security checks

---

## 15. Conclusion

This comprehensive guide consolidates best practices from all MCP servers. Follow these recommendations to:

- ✅ Maintain design system consistency
- ✅ Ensure security and safety
- ✅ Optimize performance
- ✅ Streamline development workflow
- ✅ Prevent common issues

**Remember:** Always validate, test, and review before deploying to production.

---

## Resources

- [Figma Desktop MCP Guide](./FIGMA_DESKTOP_MCP_COMPLETE_GUIDE.md)
- [shadcn Integration Guide](./SHADCN_INTEGRATION_GUIDE.md)
- [Figma MCP Prompt Optimization](./FIGMA_MCP_PROMPT_OPTIMIZATION.md)
- [Neo-Analog Design System Protocol](../AI_DESIGN_PROTOCOL.md)

---

**Last Updated**: 2025-01-27  
**Status**: ✅ Comprehensive Best Practices Guide

