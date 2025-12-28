# Figma Desktop MCP: Getting Node ID

**Date**: 2025-01-27  
**Purpose**: Quick guide to get nodeId for Figma Desktop MCP

---

## How to Get Node ID in Figma Desktop

### Method 1: From Figma URL
1. Open your design in Figma Desktop
2. Select the component/node you want to extract
3. Right-click → "Copy link to selection" or use Share → Copy link
4. The URL will look like: `https://www.figma.com/design/[fileKey]/[fileName]?node-id=[nodeId]`
5. Extract the `node-id` parameter (format: `1:234` or `123:456`)

### Method 2: From Figma Desktop
1. Select the component/node in Figma Desktop
2. The nodeId is shown in the bottom-left corner of Figma (in some versions)
3. Or use the Figma Dev Mode to see node IDs

### Method 3: Using Figma Plugin
- Install a Figma plugin that shows node IDs
- Select your component to see its nodeId

---

## Node ID Format

- Format: `1:234` or `123:456` (numbers separated by colon)
- Example: `1:2`, `123:456`, `1-234` (some tools accept dash format)

---

## For This Implementation

**Please provide:**
- Node ID of the component you want to extract
- OR Figma file URL with node-id parameter
- OR select the node in Figma Desktop and provide the nodeId

Once you have the nodeId, the implementation will proceed automatically.

