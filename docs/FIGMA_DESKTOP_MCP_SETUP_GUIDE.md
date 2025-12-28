# Figma Desktop MCP Setup Guide
## Enabling True Desktop Connection to Bypass Rate Limits

**Date**: 2025-01-27  
**Status**: ⚠️ **Requires Manual Setup**  
**Purpose**: Complete guide for setting up Figma Desktop MCP server to bypass API rate limits

---

## The Problem

Even when using `mcp_Figma_Desktop_*` tools, you may still hit rate limits if the MCP server is configured to use the remote API instead of the true desktop connection.

**Solution**: Enable the Figma Desktop MCP server in Dev Mode and configure it properly.

---

## Prerequisites

1. ✅ **Figma Desktop App** installed (latest version)
2. ✅ **Figma file** open in desktop app
3. ✅ **Cursor IDE** (or VS Code) with MCP support
4. ✅ **Dev Mode** access in Figma Desktop

---

## Step-by-Step Setup

### Step 1: Enable Desktop MCP Server in Figma

1. **Open Figma Desktop App**
   - Launch the Figma desktop application
   - Open your design file: `Advanced-Data-Visualization--Community-`

2. **Enable Dev Mode**
   - Click the **Dev Mode** toggle in the toolbar
   - Or press `Shift + D` (Windows/Linux) or `Shift + D` (macOS)
   - The right sidebar will switch to Dev Mode

3. **Enable Desktop MCP Server**
   - In the Dev Mode sidebar, locate the **MCP server** section
   - Click **"Enable desktop MCP server"**
   - A confirmation message will appear
   - **Copy the server URL**: `http://127.0.0.1:3845/mcp`
   - Keep this URL - you'll need it for Cursor configuration

### Step 2: Configure Cursor to Use Desktop MCP Server

#### Option A: Via Cursor Settings UI

1. **Open Cursor Settings**
   - Go to `Settings` > `Features` > `MCP`

2. **Add New MCP Server**
   - Click "Add Server" or "+"
   - Choose **"HTTP"** as the transport type

3. **Enter Server Details**
   - **Server URL**: `http://127.0.0.1:3845/mcp`
   - **Server ID**: `figma-desktop` (or any name you prefer)
   - **Scope**: Choose "Workspace" or "Global" as needed

4. **Save Configuration**
   - Click "Save" or "OK"
   - Restart Cursor if prompted

#### Option B: Via Configuration File (Windows)

1. **Locate Configuration File**
   ```
   %APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
   ```

2. **Edit Configuration**
   ```json
   {
     "mcpServers": {
       "figma-desktop": {
         "url": "http://127.0.0.1:3845/mcp",
         "transport": "sse"
       }
     }
   }
   ```

3. **Save and Restart Cursor**

### Step 3: Verify Connection

1. **Check MCP Tools Available**
   - In Cursor, the Desktop MCP tools should now be available
   - Tools should connect directly to desktop app (not API)

2. **Test Connection**
   - Try extracting a design from an open file
   - Should work without rate limit errors

---

## Key Differences: Remote vs Desktop MCP

### Remote Figma MCP (Current - Rate Limited)

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-figma"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

**Characteristics**:
- ❌ Uses Figma API
- ❌ Subject to rate limits
- ❌ Requires API token
- ❌ Works with any file (saved)

### Desktop Figma MCP (True Desktop - No Rate Limits)

```json
{
  "mcpServers": {
    "figma-desktop": {
      "url": "http://127.0.0.1:3845/mcp",
      "transport": "sse"
    }
  }
}
```

**Characteristics**:
- ✅ Direct connection to desktop app
- ✅ No rate limits
- ✅ No API token required
- ✅ Real-time access to open files
- ✅ Requires Dev Mode enabled

---

## Troubleshooting

### Issue: "Enable desktop MCP server" Not Visible

**Solutions**:
1. Ensure you're in **Dev Mode** (`Shift + D`)
2. Check that you have the latest Figma Desktop app version
3. Verify the file is open in desktop app (not browser)
4. Try restarting Figma Desktop app

### Issue: Connection Refused (127.0.0.1:3845)

**Solutions**:
1. Verify Desktop MCP server is enabled in Figma Dev Mode
2. Check that Figma Desktop app is running
3. Ensure the file is open in desktop app
4. Try disabling and re-enabling Desktop MCP server
5. Check firewall isn't blocking localhost connections

### Issue: Still Getting Rate Limit Errors

**Solutions**:
1. Verify you're using the Desktop MCP server (check configuration)
2. Ensure Dev Mode is active in Figma Desktop
3. Check that the server URL is correct: `http://127.0.0.1:3845/mcp`
4. Restart both Figma Desktop and Cursor
5. Verify no other MCP servers are using the remote API

### Issue: MCP Tools Not Available

**Solutions**:
1. Check Cursor MCP configuration
2. Verify server URL is correct
3. Restart Cursor after configuration changes
4. Check Cursor version (MCP support requires recent version)
5. Verify MCP feature is enabled in Cursor settings

---

## Verification Checklist

After setup, verify:

- [ ] Figma Desktop app is running
- [ ] Dev Mode is enabled in Figma Desktop
- [ ] Desktop MCP server is enabled in Dev Mode
- [ ] Server URL is copied: `http://127.0.0.1:3845/mcp`
- [ ] Cursor MCP configuration includes Desktop MCP server
- [ ] Cursor has been restarted after configuration
- [ ] MCP tools are available in Cursor
- [ ] Test extraction works without rate limit errors

---

## Usage After Setup

### Once Configured, Use Desktop MCP

**Example Prompt**:
```
"Extract design from Figma Desktop:
- File Key: OaaOw1abx2v0Wd7UfkjVaj
- Node ID: 541:148634
- Use Desktop MCP connection
- Implement using Neo-Analog semantic classes"
```

### Benefits After Setup

- ✅ **No Rate Limits**: Direct connection bypasses API
- ✅ **Real-time**: Works with live desktop files
- ✅ **Faster**: Local connection is faster than API
- ✅ **More Reliable**: Not subject to API downtime

---

## Current Status for Your Project

**File**: `OaaOw1abx2v0Wd7UfkjVaj`  
**Node**: `541:148634`  
**Status**: ⚠️ **Requires Desktop MCP Setup**

### Next Steps

1. **Enable Desktop MCP** in Figma Desktop Dev Mode
2. **Configure Cursor** to use `http://127.0.0.1:3845/mcp`
3. **Restart Cursor** to apply configuration
4. **Test extraction** from node `541:148634`
5. **Implement** using Neo-Analog classes

---

## Alternative: Wait for Rate Limit Reset

If you can't set up Desktop MCP immediately:

1. **Wait for rate limit reset** (typically 1 hour)
2. **Use Remote MCP** with rate limit awareness
3. **Batch operations** to minimize API calls
4. **Cache extracted designs** locally

---

## Resources

### Official Documentation
- **Figma Desktop MCP**: https://www.figma.com/developers/api#mcp
- **Figma Dev Mode**: https://help.figma.com/hc/en-us/articles/360055204533

### Related Guides
- `FIGMA_DESKTOP_MCP_COMPLETE_GUIDE.md` - Complete Desktop MCP guide
- `FIGMA_DESKTOP_MCP_STATUS.md` - Status and connection test
- `FIGMA_MCP_RATE_LIMIT_SOLUTION.md` - Rate limit solutions
- `CURSOR_MCP_SETUP.md` - General MCP setup in Cursor

---

## Summary

### The Solution

**Enable Figma Desktop MCP Server in Dev Mode** and configure Cursor to connect to `http://127.0.0.1:3845/mcp`

### Why This Works

- Direct connection to desktop app (no API)
- Bypasses all rate limits
- Real-time access to open files
- No API token required

### Action Required

1. ✅ Enable Dev Mode in Figma Desktop
2. ✅ Enable Desktop MCP server in Dev Mode
3. ✅ Configure Cursor with server URL
4. ✅ Restart and test

---

**Status**: ⚠️ **Setup Required**  
**Last Updated**: 2025-01-27  
**Priority**: 🔴 **High** (Required to bypass rate limits)

