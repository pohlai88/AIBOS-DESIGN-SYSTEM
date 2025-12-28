# Cursor IDE MCP (Model Context Protocol) Setup Guide

**Date**: 2025-01-27  
**Purpose**: Complete guide for configuring and using MCP servers in Cursor IDE

---

## What is MCP?

Model Context Protocol (MCP) is a standard that allows AI assistants in Cursor IDE to connect to external tools, data sources, and services. This enables enhanced capabilities like:

- Accessing design files from Figma
- Managing GitHub repositories
- Deploying to Vercel
- Browser automation and testing
- Next.js development tools
- And much more!

---

## Available MCP Servers in Cursor IDE

Based on your current setup, you have access to these MCP servers:

### 1. **Figma MCP** (`user-Figma`)
- Extract design context from Figma files
- Generate UI code from Figma designs
- Take screenshots of Figma components
- Access design variables and metadata
- Code Connect integration

### 2. **Next.js DevTools MCP** (`user-next-devtools`)
- Next.js documentation access
- Cache Components migration tools
- Dev server diagnostics
- Upgrade tools for Next.js 16
- Runtime error detection

### 3. **shadcn MCP** (`user-shadcn`)
- Search and view shadcn components
- Get component examples and demos
- Add components to projects
- View component documentation

### 4. **Vercel MCP** (`user-vercel`)
- Deploy projects to Vercel
- Manage deployments and projects
- Check domain availability
- View build logs and status

### 5. **GitHub MCP** (`user-github`)
- Create/update files in repositories
- Manage issues and pull requests
- Search repositories and code
- Fork and branch management

### 6. **Browser MCP** (`cursor-ide-browser`)
- Navigate web pages
- Take screenshots
- Interact with elements (click, type, hover)
- Test web applications
- Capture accessibility snapshots

---

## Configuration Location

MCP servers in Cursor IDE are configured in the Cursor settings file. The location depends on your operating system:

### Windows
```
%APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
```

Or via Cursor Settings UI:
- `Settings` > `Features` > `MCP`

### macOS
```
~/Library/Application Support/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
```

### Linux
```
~/.config/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json
```

---

## Configuration Format

MCP servers are configured in JSON format:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-example"],
      "env": {
        "API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Configuration Options

- **`command`**: The command to run the MCP server (e.g., `npx`, `node`, `python`)
- **`args`**: Array of arguments to pass to the command
- **`env`**: Environment variables (for API keys, tokens, etc.)
- **`transport`**: Either `stdio` (default) or `sse` for Server-Sent Events

---

## Common MCP Server Examples

### 1. Figma MCP Server

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-figma"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-token"
      }
    }
  }
}
```

**Get Figma Token**: 
1. Go to Figma Settings > Account
2. Generate a personal access token
3. Add it to the `FIGMA_ACCESS_TOKEN` environment variable

### 2. GitHub MCP Server

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-token"
      }
    }
  }
}
```

**Get GitHub Token**:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a token with appropriate permissions
3. Add it to the `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable

### 3. File System MCP Server

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    }
  }
}
```

### 4. PostgreSQL MCP Server

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@host:port/database"
      }
    }
  }
}
```

### 5. Brave Search MCP Server

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

---

## Using MCP Servers

Once configured, MCP servers are automatically available to the AI assistant in Cursor. You can:

1. **Ask the AI to use MCP tools**: "Use Figma MCP to get the design for this component"
2. **Access resources**: MCP servers expose resources (like documentation) that the AI can read
3. **Execute tools**: MCP servers provide tools (like deploying, searching, etc.) that the AI can use

### Example Prompts

- "Use GitHub MCP to create a new issue in my repository"
- "Get the design context from Figma for the login page"
- "Deploy this project to Vercel using the Vercel MCP"
- "Search for shadcn button component examples"

---

## Security Considerations

⚠️ **Important Security Notes**:

1. **Update Cursor**: Ensure you're running Cursor version 1.3 or later (a security vulnerability was fixed in this version)

2. **API Keys**: Never commit MCP configuration files with API keys to version control. Use environment variables or secure storage.

3. **Trusted Servers Only**: Only add MCP servers from trusted sources. Malicious servers could execute code on your machine.

4. **Permissions**: Review what permissions each MCP server requests and only grant necessary access.

---

## Troubleshooting

### MCP Server Not Loading

1. **Check the command**: Ensure the command and arguments are correct
2. **Verify dependencies**: Some servers require Node.js or other runtime environments
3. **Check logs**: Look at Cursor's developer console for error messages
4. **Restart Cursor**: Sometimes a restart is needed after configuration changes

### Authentication Issues

1. **Verify API keys**: Ensure environment variables are set correctly
2. **Check token permissions**: Some services require specific scopes/permissions
3. **Test manually**: Try running the MCP server command manually to verify it works

### Server Not Responding

1. **Check network**: For SSE servers, ensure network connectivity
2. **Verify server status**: Some servers may be temporarily unavailable
3. **Check server logs**: Look for error messages in the server output

---

## Additional Resources

- **Official MCP Documentation**: https://modelcontextprotocol.io
- **Cursor MCP Documentation**: https://docs.cursor.com/context/model-context-protocol
- **MCP Server Registry**: https://github.com/modelcontextprotocol/servers

---

## Quick Reference: Current MCP Resources

You currently have **37 MCP resources** available, including:

- 20 Figma MCP documentation resources
- 13 Next.js DevTools resources (Cache Components, Next.js 16 migration)
- 1 Next.js Documentation Index (llms.txt)

To see all available resources, use the `list_mcp_resources` tool in Cursor.

---

## Next Steps

1. **Review your current MCP setup**: Check which servers are already configured
2. **Add new servers**: Configure additional MCP servers based on your needs
3. **Test functionality**: Try using MCP tools with the AI assistant
4. **Secure your setup**: Ensure API keys are stored securely

---

**Last Updated**: 2025-01-27

