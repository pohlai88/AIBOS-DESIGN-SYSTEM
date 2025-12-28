# GitHub Repositories for Cursor IDE MCP

**Date**: 2025-01-27  
**Purpose**: Comprehensive list of GitHub repositories related to Cursor IDE MCP configuration and setup

---

## Top Recommended Repositories

### 1. **cursor-mcp-guide** ⭐
**Repository**: [md-anbari/cursor-mcp-guide](https://github.com/md-anbari/cursor-mcp-guide)

**Description**: A comprehensive guide to setting up and using MCP server with Cursor IDE, including GitHub integration and AI agent configuration.

**Key Features**:
- Complete MCP setup instructions
- GitHub MCP integration guide
- Installation methods (Smithery CLI, manual configuration)
- Usage examples

**Installation Methods**:
```bash
# Method 1: Using Smithery CLI
npx -y @smithery/cli@latest install @smithery-ai/github \
  --client cursor \
  --config '{"githubPersonalAccessToken":"your_token_here"}'

# Method 2: Manual Configuration
# Edit ~/.cursor/mcp.json
```

---

### 2. **mcp-linker**
**Repository**: [milisp/mcp-linker](https://github.com/milisp/mcp-linker)

**Description**: MCP store manager that adds & syncs MCP server configurations across clients like Claude Code, Cursor, and other AI development tools.

**Features**:
- Sync MCP configurations across multiple clients
- Centralized MCP server management
- Support for multiple IDE clients

---

### 3. **ls-mcp**
**Repository**: [lirantal/ls-mcp](https://github.com/lirantal/ls-mcp)

**Description**: List MCP Server configurations in your system used by AI applications like Cursor, Claude Desktop, VS Code and others.

**Use Case**: Useful for discovering and managing existing MCP configurations.

---

### 4. **example-mcp-server**
**Repository**: [kirill-markin/example-mcp-server](https://github.com/kirill-markin/example-mcp-server)

**Description**: A ready-to-use MCP (Model Context Protocol) server template for extending Cursor IDE with custom tools. Deploy your own server to Heroku with one click.

**Features**:
- Template for custom MCP servers
- One-click Heroku deployment
- Perfect for creating custom tools

---

### 5. **mcp-server-node**
**Repository**: [lucianoayres/mcp-server-node](https://github.com/lucianoayres/mcp-server-node)

**Description**: MCP Server implemented in JavaScript using Node.js that demonstrates how to build an MCP server with custom prompts and tools for Cursor IDE.

**Features**:
- Complete Node.js implementation
- Custom prompt examples
- Environment variable configuration
- Integration examples

---

## Configuration Management Tools

### **Alph** - Universal MCP Server Configuration Manager
**Repository**: [Aqualia/Alph](https://github.com/Aqualia/Alph)

**Description**: Universal MCP Server Configuration Manager for managing MCP servers across different clients.

---

### **glooit** - Sync AI Agent Rules and MCP Configurations
**Repository**: [nikuscs/glooit](https://github.com/nikuscs/glooit)

**Description**: Keeps your AI agent rules and MCP configurations in perfect sync across Claude Code, Cursor, Roo Code, and other AI development tools.

---

### **mcpixy** - Zero-Config MCP Server Builder
**Repository**: [jondot/mcpixy](https://github.com/jondot/mcpixy)

**Description**: Zero-configuration MCP server builder that allows you to create MCP servers with just YAML configuration.

---

## Specialized MCP Servers

### **cursor-azure-devops-mcp**
**Repository**: [maximtitovich/cursor-azure-devops-mcp](https://github.com/maximtitovich/cursor-azure-devops-mcp)

**Description**: Azure DevOps Cursor IDE MCP server plugin.

---

### **mcp-server-cloudflare**
**Repository**: [GutMutCode/mcp-server-cloudflare](https://github.com/GutMutCode/mcp-server-cloudflare)

**Description**: Cloudflare MCP server for IDE (Cline, Windsurf, Cursor, etc).

---

### **neo4j-mcp**
**Repository**: [ezedinff/neo4j-mcp](https://github.com/ezedinff/neo4j-mcp)

**Description**: A Cursor MCP server that enables seamless interaction with Neo4j databases directly from the Cursor IDE.

---

### **mysql-mcp-server**
**Repository**: [myheisenberg/mysql-mcp-server](https://github.com/myheisenberg/mysql-mcp-server)

**Description**: MySQL MCP Server for Model Context Protocol. Features include executing queries, listing databases, and describing table structures.

---

## Configuration Examples

### **cursor-MCP-settings**
**Repository**: [matiascam02/cursor-MCP-settings](https://github.com/matiascam02/cursor-MCP-settings)

**Description**: Repository for Cursor MCP settings and configurations.

---

### **mcp-config**
**Repository**: [philhosophy/mcp-config](https://github.com/philhosophy/mcp-config)

**Description**: My Model Context Protocol (MCP) configuration for Cursor.

---

### **cursor-mcp-config**
**Repository**: [griffingilreath/cursor-mcp-config](https://github.com/griffingilreath/cursor-mcp-config)

**Description**: MCP server configuration and custom servers for Cursor IDE.

---

### **cursor-template**
**Repository**: [d0whc3r/cursor-template](https://github.com/d0whc3r/cursor-template)

**Description**: Template of basic rules + MCP configuration for Cursor.

---

## Browser & Automation Tools

### **mcp-playwright**
**Repository**: [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright)

**Description**: Playwright Model Context Protocol Server - Tool to automate Browsers and APIs in Claude Desktop, Cline, Cursor IDE and More.

---

### **consolespy**
**Repository**: [mgsrevolver/consolespy](https://github.com/mgsrevolver/consolespy)

**Description**: This tool captures browser console logs and makes them available to Cursor IDE through the Model Context Protocol (MCP).

---

## Development Tools

### **mcp-server-runner**
**Repository**: [xzebra/mcp-server-runner](https://github.com/xzebra/mcp-server-runner)

**Description**: Cursor extension to store MCP server configurations and run them.

---

### **rust-analyzer-mcp-server**
**Repository**: [ciresnave/rust-analyzer-mcp-server](https://github.com/ciresnave/rust-analyzer-mcp-server)

**Description**: MCP server for rust-analyzer with cross-platform installers, comprehensive testing, and auto-configuration for VS Code, Claude Desktop, and Cursor.

---

## Quick Setup Guide

### Step 1: Install GitHub MCP Server

**Using Smithery CLI (Recommended)**:
```bash
npx -y @smithery/cli@latest install @smithery-ai/github \
  --client cursor \
  --config '{"githubPersonalAccessToken":"your_token_here"}'
```

### Step 2: Manual Configuration

1. **Locate Cursor MCP Configuration File**:
   - **Windows**: `%APPDATA%\Cursor\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
   - **macOS**: `~/Library/Application Support/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
   - **Linux**: `~/.config/Cursor/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. **Add GitHub MCP Configuration**:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

### Step 3: Get GitHub Personal Access Token

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with appropriate permissions:
   - `repo` (full control of private repositories)
   - `workflow` (update GitHub Action workflows)
   - `read:org` (read org and team membership)
3. Copy the token and add it to your MCP configuration

---

## Useful Resources

### Official Documentation
- **MCP Specification**: https://modelcontextprotocol.io
- **Cursor MCP Docs**: https://docs.cursor.com/context/model-context-protocol
- **Smithery MCP Registry**: https://smithery.dev

### Community Resources
- **MCP Server Registry**: https://github.com/modelcontextprotocol/servers
- **MCP Examples**: Search GitHub for "cursor mcp" or "mcp server"

---

## Common MCP Servers Available

1. **GitHub MCP** - Repository management, issues, PRs
2. **Figma MCP** - Design file access and code generation
3. **Vercel MCP** - Deployment and project management
4. **File System MCP** - Local file operations
5. **PostgreSQL MCP** - Database queries
6. **Brave Search MCP** - Web search capabilities
7. **Browser MCP** - Browser automation
8. **Next.js DevTools MCP** - Next.js development tools

---

## Next Steps

1. **Explore Repositories**: Browse the repositories listed above
2. **Choose Setup Method**: Use Smithery CLI or manual configuration
3. **Configure Servers**: Add MCP servers based on your needs
4. **Test Integration**: Verify MCP servers are working in Cursor IDE
5. **Create Custom Servers**: Use example repositories as templates

---

**Last Updated**: 2025-01-27  
**Total Repositories Found**: 167+ related to Cursor IDE MCP

