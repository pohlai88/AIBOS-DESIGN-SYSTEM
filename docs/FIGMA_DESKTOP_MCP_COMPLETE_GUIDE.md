# Figma Desktop MCP - Complete Guide
## Using Figma Desktop App with MCP Integration

**Date**: 2025-01-27  
**Purpose**: Complete guide for using Figma Desktop MCP tools  
**Status**: ✅ **Ready for Use**

---

## Overview

Figma Desktop MCP provides direct integration with the Figma Desktop application, allowing you to extract designs from files open in the desktop app. This is different from the remote Figma MCP which requires file keys and works with web-based files.

---

## Available Tools

### 1. `mcp_Figma_Desktop_get_design_context`
**Purpose**: Extract design and generate code from a Figma Desktop node

**Parameters**:
- `nodeId` (required): Node ID in format `44:27412` or `1:234`
- `fileKey` (required): File key from Figma URL
- `clientLanguages`: Comma-separated (e.g., `"html,css,javascript"`)
- `clientFrameworks`: Framework name (e.g., `"react"`, `"vue"`, or `"unknown"`)

**Usage**:
```javascript
mcp_Figma_Desktop_get_design_context({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})
```

### 2. `mcp_Figma_Desktop_get_variable_defs`
**Purpose**: Get design variables/tokens from a Figma Desktop node

**Parameters**:
- `nodeId` (required): Node ID
- `fileKey` (required): File key
- `clientLanguages`: Language context
- `clientFrameworks`: Framework context

### 3. `mcp_Figma_Desktop_get_screenshot`
**Purpose**: Capture screenshot of a Figma Desktop node

**Parameters**:
- `nodeId` (required): Node ID
- `fileKey` (required): File key
- `clientLanguages`: Language context
- `clientFrameworks`: Framework context

### 4. `mcp_Figma_Desktop_get_metadata`
**Purpose**: Get component structure and hierarchy (for large designs)

**Parameters**:
- `nodeId` (required): Node ID
- `fileKey` (required): File key
- `clientLanguages`: Language context
- `clientFrameworks`: Framework context

### 5. `mcp_Figma_Desktop_create_design_system_rules`
**Purpose**: Generate design system rules file for agents

**Parameters**:
- `clientLanguages`: Language context
- `clientFrameworks`: Framework context

---

## Key Differences: Desktop vs Remote MCP

| Feature | Figma Desktop MCP | Remote Figma MCP |
|---------|------------------|------------------|
| **Connection** | Direct to desktop app | Via API (requires token) |
| **File Key** | Required | Required |
| **Node Selection** | Can use selected node (if fileKey provided) | Requires explicit nodeId |
| **Real-time** | Works with live desktop app | Works with saved files |
| **Advantages** | Better integration, real-time updates | Works without desktop app |

---

## How to Use

### Step 1: Get File Key and Node ID

**From Figma URL**:
```
https://www.figma.com/design/OaaOw1abx2v0Wd7UfkjVaj/Advanced-Data-Visualization--Community-?node-id=44-27412
```

- **File Key**: `OaaOw1abx2v0Wd7UfkjVaj`
- **Node ID**: `44:27412` (convert dash to colon: `44-27412` → `44:27412`)

**From Figma Desktop**:
1. Open file in Figma Desktop app
2. Select the component/node
3. Right-click → "Copy link to selection"
4. Extract fileKey and nodeId from URL

### Step 2: Extract Design

**Example Prompt**:
```
"Extract design from Figma Desktop:
- File Key: OaaOw1abx2v0Wd7UfkjVaj
- Node ID: 44:27412
- Implement using Neo-Analog semantic classes
- Map to design tokens"
```

### Step 3: Use the Tools

```javascript
// 1. Get design context
mcp_Figma_Desktop_get_design_context({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})

// 2. Get variables
mcp_Figma_Desktop_get_variable_defs({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})

// 3. Get screenshot
mcp_Figma_Desktop_get_screenshot({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})
```

---

## Quick Reference

### Extract Component
```
"Get design context from Figma Desktop:
- File: [fileKey]
- Node: [nodeId]
- Use Neo-Analog classes
- Map to design tokens"
```

### Get Variables
```
"Extract all variables from Figma Desktop node [nodeId] in file [fileKey]
Map to Neo-Analog design tokens"
```

### Get Screenshot
```
"Get screenshot of Figma Desktop node [nodeId] in file [fileKey]
for visual reference"
```

---

## Best Practices

### 1. Always Provide Both fileKey and nodeId
- Desktop MCP requires both parameters
- Extract from Figma URL or desktop app

### 2. Use Metadata First for Large Designs
- For very large designs, use `get_metadata` first
- Then extract specific components with `get_design_context`

### 3. Specify Client Context
- Always provide `clientLanguages` and `clientFrameworks`
- Helps generate appropriate code

### 4. Map to Design System
- Extract variables first
- Map to Neo-Analog tokens
- Then generate implementation

---

## Example Workflow

### Complete Extraction Workflow

```javascript
// Step 1: Get metadata (optional, for large designs)
mcp_Figma_Desktop_get_metadata({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})

// Step 2: Get design context
mcp_Figma_Desktop_get_design_context({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})

// Step 3: Get variables
mcp_Figma_Desktop_get_variable_defs({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})

// Step 4: Get screenshot (optional)
mcp_Figma_Desktop_get_screenshot({
  fileKey: "OaaOw1abx2v0Wd7UfkjVaj",
  nodeId: "44:27412",
  clientLanguages: "html,css,javascript",
  clientFrameworks: "unknown"
})
```

---

## Troubleshooting

### Error: "Required parameter 'fileKey' is missing"
**Solution**: Always provide both `fileKey` and `nodeId`

### Error: "Required parameter 'nodeId' is missing"
**Solution**: Extract nodeId from Figma URL or desktop app

### Node ID Format
- **Correct**: `44:27412` (colon separator)
- **From URL**: `44-27412` → convert to `44:27412`

### File Key Extraction
- From URL: `https://www.figma.com/design/[fileKey]/...`
- File key is the alphanumeric string after `/design/`

---

## Integration with Neo-Analog

### Prompt Template
```
"Extract design from Figma Desktop file [fileKey], node [nodeId]:
1. Get design context
2. Extract all variables
3. Map to Neo-Analog:
   - Colors → --color-* tokens
   - Spacing → --spacing-* tokens
   - Typography → .na-h1-.na-h6 classes
4. Generate implementation using semantic classes
5. Validate with enforce:semantics"
```

---

## Comparison: Desktop vs Remote

### When to Use Desktop MCP
- ✅ Working with files open in Figma Desktop
- ✅ Need real-time updates from desktop app
- ✅ Better integration with desktop workflow
- ✅ Working with local/private files

### When to Use Remote MCP
- ✅ Working with web-based files
- ✅ No desktop app available
- ✅ Need API-based access
- ✅ Automated workflows

---

## Current Status

### ✅ Available Tools
- `mcp_Figma_Desktop_get_design_context` ✅
- `mcp_Figma_Desktop_get_variable_defs` ✅
- `mcp_Figma_Desktop_get_screenshot` ✅
- `mcp_Figma_Desktop_get_metadata` ✅
- `mcp_Figma_Desktop_create_design_system_rules` ✅

### ⚠️ Requirements
- Both `fileKey` and `nodeId` are required
- Figma Desktop app should be running (for best results)
- File must be accessible

---

## Quick Start

1. **Get File Key and Node ID** from Figma URL or desktop app
2. **Use the tools** with both parameters
3. **Map to Neo-Analog** design tokens
4. **Generate implementation** using semantic classes
5. **Validate** with scripts

---

**Status**: ✅ **Ready to Use**  
**Last Updated**: 2025-01-27

