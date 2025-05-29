import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export function createToolDefinitions() {
  return [
    {
      name: "ionic_generate",
      description:
        "Run 'ionic generate' to create pages, components, services, and other Ionic/Angular features",
      inputSchema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: "The type of artifact to generate (e.g., page, component, service, guard, pipe)",
            enum: ["page", "component", "service", "guard", "pipe", "directive", "class", "interface", "enum"],
          },
          name: {
            type: "string",
            description: "The name of the artifact to generate",
          },
          appRoot: {
            type: "string",
            description:
              "The absolute path to the Ionic project root directory",
          },
          options: {
            type: "object",
            description: "Additional options for the generator",
            properties: {
              "dry-run": {
                type: "boolean",
                description: "Run through and report activity without writing out results",
                default: false,
              },
              force: {
                type: "boolean",
                description: "Force overwriting of existing files",
                default: false,
              },
              "skip-tests": {
                type: "boolean",
                description: "Do not create spec files",
                default: false,
              },
              module: {
                type: "string",
                description: "The declaring NgModule",
              },
              path: {
                type: "string",
                description: "The path at which to create the files, relative to the current workspace",
              },
            },
            additionalProperties: { type: "string" },
          },
        },
        required: ["type", "name", "appRoot"],
      },
    },
    {
      name: "ionic_capacitor_add",
      description: "Add a native platform to your Ionic project using Capacitor",
      inputSchema: {
        type: "object",
        properties: {
          platform: {
            type: "string",
            description: "The platform to add (e.g. android, ios)",
            enum: ["android", "ios"],
          },
          appRoot: {
            type: "string",
            description:
              "The absolute path to the Ionic project root directory",
          },
        },
        required: ["platform", "appRoot"],
      },
    },
    {
      name: "ionic_start",
      description: "Run 'ionic start' to create a new Ionic project",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of your new project (e.g. myApp, 'My App')",
          },
          template: {
            type: "string",
            description: "The starter template to use (e.g. blank, tabs, sidemenu). Use 'list' to see all templates",
            default: "blank",
          },
          directory: {
            type: "string",
            description: "The directory to create the project in",
          },
          type: {
            type: "string",
            description: "Type of project to start (e.g. vue, angular, angular-standalone, react)",
            enum: ["angular", "angular-standalone", "react", "vue"],
          },
          capacitor: {
            type: "boolean",
            description: "Include Capacitor integration",
            default: true,
          },
          cordova: {
            type: "boolean",
            description: "(deprecated) Include Cordova integration",
            default: false,
          },
          options: {
            type: "object",
            description: "Additional options for ionic start",
            properties: {
              "no-deps": {
                type: "boolean",
                description: "Do not install npm/yarn dependencies",
                default: false,
              },
              "no-git": {
                type: "boolean",
                description: "Do not initialize a git repo",
                default: false,
              },
              "link": {
                type: "boolean",
                description: "Connect your new app to Ionic",
                default: false,
              },
              "project-id": {
                type: "string",
                description: "Specify a slug for your app (used for the directory name and package name)",
              },
              "package-id": {
                type: "string",
                description: "Specify the bundle ID/application ID for your app (reverse-DNS notation)",
              },
              "id": {
                type: "string",
                description: "Specify an Ionic App ID to link",
              },
            },
            additionalProperties: { type: "string" },
          },
        },
        required: ["name"],
      },
    },
    {
      name: "ionic_build",
      description: "Build web assets and prepare your app for any platform targets",
      inputSchema: {
        type: "object",
        properties: {
          appRoot: {
            type: "string",
            description:
              "The absolute path to the Ionic project root directory",
          },
          engine: {
            type: "string",
            description: "Target engine (e.g. browser, cordova)",
            enum: ["browser", "cordova"],
          },
          platform: {
            type: "string",
            description: "Target platform on chosen engine (e.g. ios, android)",
            enum: ["ios", "android"],
          },
        },
        required: ["appRoot"],
      },
    },
    {
      name: "ionic_serve",
      description: "Start a local dev server for app dev/testing",
      inputSchema: {
        type: "object",
        properties: {
          appRoot: {
            type: "string",
            description:
              "The absolute path to the Ionic project root directory",
          },
          external: {
            type: "boolean",
            description: "Host dev server on all network interfaces (i.e. --host=0.0.0.0)",
            default: false,
          },
          host: {
            type: "string",
            description: "Use specific host for the dev server (default: localhost)",
            default: "localhost",
          },
          port: {
            type: "number",
            description: "Use specific port for the dev server (default: 8100)",
            default: 8100,
          },
          livereload: {
            type: "boolean",
            description: "Enable live reload functionality",
            default: true,
          },
          open: {
            type: "boolean", 
            description: "Open a browser window",
            default: true,
          },
          browser: {
            type: "string",
            description: "Specifies the browser to use (safari, firefox, google chrome)",
          },
        },
        required: ["appRoot"],
      },
    },
    {
      name: "ionic_info",
      description: "Print project, system, and environment information",
      inputSchema: {
        type: "object",
        properties: {
          appRoot: {
            type: "string",
            description:
              "The absolute path to the Ionic project root directory (optional - can be run globally)",
          },
          json: {
            type: "boolean",
            description: "Print system/environment info in JSON format",
            default: false,
          },
        },
        required: [],
      },
    },
  ] as const satisfies Tool[];
}
