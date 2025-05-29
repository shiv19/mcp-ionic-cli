# Ionic CLI MCP Server ⚡

A Model Context Protocol server that provides Ionic CLI automation capabilities. This server enables LLMs and agents to interact with Ionic projects, generate pages/components/services, add native platforms, build and serve apps, and manage Ionic projects via the Ionic CLI.

## Features

- Run `ionic start` to create new Ionic projects with various templates and frameworks
- Run `ionic generate` to scaffold Ionic/Angular artifacts (pages, components, services, etc.)
- Run `ionic capacitor add` to add native platforms (iOS, Android) to your project
- Run `ionic build` to build your app for different platforms and engines
- Run `ionic serve` to start a development server with live reload
- Run `ionic info` to get project and environment information

- All via the Model Context Protocol (MCP) for agent/LLM integration

## Installation

You can install the package globally using npm:

```bash
npm install -g @shiv19/mcp-ionic-cli
```

Or use it locally in your project:

```bash
npm install --save-dev @shiv19/mcp-ionic-cli
```

## Usage

You can run the server directly:

```bash
npx @shiv19/mcp-ionic-cli
```

Or, if you want to use it as a custom MCP server in your agent or tool, configure it like this:

### Example MCP Configuration

```json
{
  "mcpServers": {
    "ionic-cli": {
      "command": "npx",
      "args": ["-y", "@shiv19/mcp-ionic-cli"]
    }
  }
}
```

## Example Tool Usage

- **Create a new Ionic project:**
  ```json
  {
    "name": "my-ionic-app",
    "template": "tabs",
    "type": "angular",
    "capacitor": true,
    "directory": "/absolute/path/to/where/you/want/it"
  }
  ```
- **Generate a page:**
  ```json
  {
    "type": "page",
    "name": "home",
    "appRoot": "/absolute/path/to/your/ionic/project"
  }
  ```
- **Add a native platform:**
  ```json
  {
    "platform": "ios",
    "appRoot": "/absolute/path/to/your/ionic/project"
  }
  ```
- **Build your app:**
  ```json
  {
    "appRoot": "/absolute/path/to/your/ionic/project",
    "engine": "browser"
  }
  ```
- **Serve your app:**
  ```json
  {
    "appRoot": "/absolute/path/to/your/ionic/project",
    "port": 8100,
    "external": true
  }
  ```

---

**Star this repo if you find it useful!**

## Publishing to npm

To publish a new version of this package to npm, run:

```bash
npm run publish-npm
```

This will automatically build the project and publish it as a public package.

## Develop

If you want to test or develop this server locally, you need to point your MCP server configuration to your local build output. After building the project (e.g., with `npm run build`), set your MCP server file (e.g., `.mcp.json` or similar) to use the local `dist/index.js` file:

```json
{
  "angular-cli": {
    "command": "node",
    "args": ["/path/to/your/mcp-angular-cli/dist/index.js"]
  }
}
```
