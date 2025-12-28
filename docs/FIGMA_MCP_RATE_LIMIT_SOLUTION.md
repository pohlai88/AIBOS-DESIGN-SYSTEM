# Figma MCP Rate Limit Solution Guide
## Using Figma Desktop MCP to Bypass API Rate Limits

**Date**: 2025-01-27  
**Status**: ✅ **Solution Available**  
**Purpose**: Guide to solving Figma API rate limit issues using Figma Desktop MCP

---

## Understanding the Rate Limit Issue

### Why Rate Limits Occur

**Remote Figma MCP** (API-based):
- Uses Figma's REST API
- Subject to Figma API rate limits
- Typical limits: ~200 requests/hour per token
- Shared across all API users
- Can be exhausted quickly during active development

**Figma Desktop MCP** (Direct connection):
- Connects directly to Figma Desktop app
- **Bypasses API rate limits entirely**
- No API token required
- Real-time access to open files
- No rate limit restrictions

---

## The Solution: Figma Desktop MCP

### ⚠️ Important: Requires Setup

**Figma Desktop MCP requires manual setup in Dev Mode** to work properly. Simply having the tools available doesn't mean they're using the desktop connection - they may still be using the remote API.

**See**: `FIGMA_DESKTOP_MCP_SETUP_GUIDE.md` for complete setup instructions.

### Key Difference

| Feature | Remote Figma MCP | Figma Desktop MCP |
|---------|------------------|-------------------|
| **Connection** | Via Figma API | Direct to desktop app (via Dev Mode) |
| **Rate Limits** | ⚠️ Yes (API limits) | ✅ No (direct connection) |
| **API Token** | Required | Not required |
| **File Access** | Saved files only | Live desktop files |
| **Real-time** | No | Yes |
| **Setup Required** | Just API token | Dev Mode + HTTP server config |
| **Rate Limit Issue** | ❌ Affected | ✅ **Not affected** (after setup) |

---

## How to Use Figma Desktop MCP

### Prerequisites

1. **Figma Desktop App** must be installed and running
2. **File must be open** in Figma Desktop (or accessible)
3. **Dev Mode** must be enabled in Figma Desktop
4. **Desktop MCP Server** must be enabled in Dev Mode
5. **Cursor** must be configured to use `http://127.0.0.1:3845/mcp`

**⚠️ Critical**: Without proper setup, Desktop MCP tools may still use the remote API and hit rate limits.

### Step 1: Enable Desktop MCP Server in Figma

**This is the critical step that's often missed:**

1. **Open Figma Desktop App**
2. **Enable Dev Mode** (`Shift + D` or toggle in toolbar)
3. **In Dev Mode sidebar**, find "MCP server" section
4. **Click "Enable desktop MCP server"**
5. **Copy the server URL**: `http://127.0.0.1:3845/mcp`

### Step 2: Configure Cursor to Use Desktop MCP

1. **Open Cursor Settings** → `Features` → `MCP`
2. **Add New Server** → Choose "HTTP"
3. **Enter URL**: `http://127.0.0.1:3845/mcp`
4. **Server ID**: `figma-desktop`
5. **Save and restart Cursor**

**See**: `FIGMA_DESKTOP_MCP_SETUP_GUIDE.md` for detailed instructions.

### Step 3: Verify Desktop MCP Tools

After setup, these tools should connect directly (not via API):
- `mcp_Figma_Desktop_get_design_context`
- `mcp_Figma_Desktop_get_variable_defs`
- `mcp_Figma_Desktop_get_screenshot`
- `mcp_Figma_Desktop_get_metadata`

### Step 2: Get File Key and Node ID

**From Figma URL**:
```
https://www.figma.com/design/OaaOw1abx2v0Wd7UfkjVaj/...?node-id=44-27412
```

- **File Key**: `OaaOw1abx2v0Wd7UfkjVaj`
- **Node ID**: `44:27412` (convert `44-27412` → `44:27412`)

**From Figma Desktop**:
1. Open file in Figma Desktop app
2. Select the component/node
3. Right-click → "Copy link to selection"
4. Extract fileKey and nodeId from URL

### Step 3: Use Desktop MCP Tools

**Example Prompt**:
```
"Extract design from Figma Desktop:
- File Key: OaaOw1abx2v0Wd7UfkjVaj
- Node ID: 44:27412
- Use Figma Desktop MCP (not remote API)
- Implement using Neo-Analog semantic classes"
```

---

## Why This Solves Rate Limits

### Technical Explanation

1. **Remote MCP Flow** (Rate Limited):
   ```
   Cursor → Figma API → Figma Cloud → Response
   ❌ Subject to API rate limits
   ```

2. **Desktop MCP Flow** (No Rate Limits):
   ```
   Cursor → Figma Desktop App → Local File Access → Response
   ✅ Direct connection, no API involved
   ```

### Benefits

- ✅ **No API Rate Limits**: Direct connection bypasses API entirely
- ✅ **Real-time Access**: Works with files open in desktop app
- ✅ **No Token Required**: Doesn't use API authentication
- ✅ **Faster**: Direct local connection is faster than API calls
- ✅ **More Reliable**: Not subject to API downtime or rate limit resets

---

## Best Practices

### 1. Use Desktop MCP When Available

**Always prefer Desktop MCP** for:
- Active development work
- Frequent design extractions
- Real-time design updates
- When rate limits are a concern

**Use Remote MCP only for**:
- Automated workflows
- CI/CD pipelines
- When desktop app isn't available

### 2. Keep Figma Desktop App Running

- Desktop MCP requires the app to be running
- Keep files open in desktop app for best results
- Desktop app can run in background

### 3. Batch Operations

Even with Desktop MCP, it's good practice to:
- Extract multiple components in one session
- Use metadata first for large designs
- Cache extracted designs locally

### 4. Monitor Usage

- Track which MCP you're using
- Prefer Desktop MCP for development
- Reserve Remote MCP for special cases

---

## Troubleshooting

### Issue: Desktop MCP Not Available

**Solution**:
1. Ensure Figma Desktop app is installed
2. Check MCP server configuration in Cursor
3. Verify Desktop MCP tools are listed in available tools
4. Restart Cursor if needed

### Issue: "Required parameter 'fileKey' is missing"

**Solution**:
- Always provide both `fileKey` and `nodeId`
- Extract from Figma URL or desktop app
- Format nodeId correctly: `44:27412` (colon, not dash)

### Issue: Can't Access File

**Solution**:
- Ensure file is open in Figma Desktop app
- Check file permissions
- Verify file key is correct
- Try opening file in desktop app first

---

## Migration from Remote to Desktop MCP

### Current Workflow (Remote MCP - Rate Limited)

```javascript
// Remote Figma MCP (subject to rate limits)
mcp_Figma_get_design_context({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412"
})
```

### New Workflow (Desktop MCP - No Rate Limits)

```javascript
// Figma Desktop MCP (no rate limits)
mcp_Figma_Desktop_get_design_context({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})
```

### Key Changes

1. **Tool Name**: `mcp_Figma_*` → `mcp_Figma_Desktop_*`
2. **Additional Parameters**: Add `clientLanguages` and `clientFrameworks`
3. **No API Token**: Desktop MCP doesn't require API token
4. **Same Parameters**: `fileKey` and `nodeId` work the same way

---

## Comparison: IDE vs MCP Server

### Important Clarification

**The IDE (Cursor/VS Code) does NOT affect rate limits.**

Rate limits are determined by:
- **Which MCP server you use** (Remote API vs Desktop)
- **Figma API limits** (for Remote MCP only)
- **Not by the IDE** (Cursor, VS Code, or any other IDE)

### Why This Matters

- ✅ **Cursor with Desktop MCP** = No rate limits
- ✅ **VS Code with Desktop MCP** = No rate limits
- ❌ **Any IDE with Remote MCP** = Subject to rate limits

**Solution**: Use Desktop MCP regardless of IDE choice.

---

## Recommended Workflow

### For Active Development

1. **Open Figma Desktop App**
2. **Open your design file** in desktop app
3. **Use Desktop MCP tools** in Cursor
4. **Extract designs** without rate limit concerns
5. **Implement** using Neo-Analog classes

### Example Complete Workflow

```
1. Open Figma Desktop app
2. Open file: Advanced Data Visualization
3. Select component in desktop app
4. In Cursor, use:
   "Extract design from Figma Desktop file OaaOw1abx2v0Wd7UfkjVaj, 
    node 44:27412 using Desktop MCP"
5. Implement with Neo-Analog classes
6. Validate with enforce:semantics
```

---

## Quick Reference

### Desktop MCP Tools

- `mcp_Figma_Desktop_get_design_context` - Extract design and code
- `mcp_Figma_Desktop_get_variable_defs` - Get design variables
- `mcp_Figma_Desktop_get_screenshot` - Capture screenshot
- `mcp_Figma_Desktop_get_metadata` - Get component structure

### Required Parameters

- `fileKey` (required): From Figma URL
- `nodeId` (required): From Figma URL (convert dash to colon)
- `clientLanguages` (optional): e.g., `"html,css,javascript"`
- `clientFrameworks` (optional): e.g., `"react"` or `"unknown"`

### Prompt Template

```
"Extract [component] from Figma Desktop:
- File Key: [fileKey]
- Node ID: [nodeId]
- Use Desktop MCP (not remote API)
- Implement using Neo-Analog classes"
```

---

## Summary

### ✅ Solution to Rate Limits

**Use Figma Desktop MCP instead of Remote Figma MCP**

- ✅ Bypasses API rate limits entirely
- ✅ Direct connection to desktop app
- ✅ No API token required
- ✅ Real-time access
- ✅ Works in Cursor (and any IDE with MCP support)

### ❌ Not About IDE Choice

- Rate limits are about **which MCP server** you use
- **Not about** which IDE (Cursor vs VS Code)
- Desktop MCP works in any IDE that supports MCP

### 🎯 Action Items

1. ✅ Use Desktop MCP tools (`mcp_Figma_Desktop_*`)
2. ✅ Keep Figma Desktop app running
3. ✅ Provide both `fileKey` and `nodeId`
4. ✅ Prefer Desktop MCP for active development

---

**Status**: ⚠️ **Requires Manual Setup**  
**Last Updated**: 2025-01-27  
**Related Docs**: 
- `FIGMA_DESKTOP_MCP_SETUP_GUIDE.md` ⭐ **START HERE**
- `FIGMA_DESKTOP_MCP_COMPLETE_GUIDE.md`
- `FIGMA_DESKTOP_MCP_STATUS.md`
- `FIGMA_DESKTOP_MCP_QUICK_REFERENCE.md`

