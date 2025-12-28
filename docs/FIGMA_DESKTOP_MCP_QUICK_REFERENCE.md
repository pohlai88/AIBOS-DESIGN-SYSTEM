# Figma Desktop MCP - Quick Reference Card

**One-page cheat sheet for Figma Desktop MCP usage**

---

## 🚀 Quick Start

### Extract Design from Figma Desktop

```
"Extract design from Figma Desktop:
- File Key: [fileKey]
- Node ID: [nodeId]
- Implement using Neo-Analog semantic classes"
```

### Get File Key & Node ID from URL

```
URL: https://www.figma.com/design/[fileKey]/[name]?node-id=[nodeId]

Example:
https://www.figma.com/design/OaaOw1abx2v0Wd7UfkjVaj/...?node-id=44-27412

→ fileKey: OaaOw1abx2v0Wd7UfkjVaj
→ nodeId: 44:27412 (convert dash to colon)
```

---

## 📋 Available Tools

| Tool | Purpose | Required Params |
|------|---------|----------------|
| `get_design_context` | Extract design & code | `fileKey`, `nodeId` |
| `get_variable_defs` | Get design tokens | `fileKey`, `nodeId` |
| `get_screenshot` | Capture visual | `fileKey`, `nodeId` |
| `get_metadata` | Get structure | `fileKey`, `nodeId` |

---

## 💡 Common Patterns

### Pattern 1: Full Extraction
```
1. get_design_context (fileKey, nodeId)
2. get_variable_defs (fileKey, nodeId)
3. get_screenshot (fileKey, nodeId)
4. Map to Neo-Analog tokens
5. Generate implementation
```

### Pattern 2: Quick Check
```
1. get_metadata (fileKey, nodeId)
2. Analyze structure
3. Extract specific components
```

---

## ⚡ Example Prompts

### Extract Component
```
"Get design context from Figma Desktop file OaaOw1abx2v0Wd7UfkjVaj, 
node 44:27412. Map to Neo-Analog and implement."
```

### Get Variables
```
"Extract all variables from Figma Desktop node 44:27412 in file 
OaaOw1abx2v0Wd7UfkjVaj. Map to Neo-Analog design tokens."
```

### Full Workflow
```
"Extract from Figma Desktop (fileKey: OaaOw1abx2v0Wd7UfkjVaj, 
nodeId: 44:27412):
1. Get design context
2. Extract variables
3. Map to Neo-Analog
4. Generate HTML with semantic classes
5. Validate"
```

---

## 🔧 Parameters

### Required
- `fileKey`: From Figma URL (after `/design/`)
- `nodeId`: From URL or desktop app (format: `44:27412`)

### Optional
- `clientLanguages`: `"html,css,javascript"` (default)
- `clientFrameworks`: `"react"`, `"vue"`, or `"unknown"`

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Missing fileKey | Extract from URL: `/design/[fileKey]/` |
| Missing nodeId | Extract from URL: `?node-id=44-27412` → `44:27412` |
| Wrong format | Convert dash to colon: `44-27412` → `44:27412` |

---

## ✅ Best Practices

1. ✅ Always provide both `fileKey` and `nodeId`
2. ✅ Convert URL node-id format (dash → colon)
3. ✅ Use metadata first for large designs
4. ✅ Map to Neo-Analog tokens after extraction
5. ✅ Validate with `pnpm enforce:semantics`

---

## 📚 Full Documentation

See `docs/FIGMA_DESKTOP_MCP_COMPLETE_GUIDE.md` for detailed guide.

---

**Quick Reference v1.0** | Last Updated: 2025-01-27

