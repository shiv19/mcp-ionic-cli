import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { spawn } from "child_process";

export async function handleToolCall(
  name: string,
  args: any,
  server: any
): Promise<CallToolResult> {
  try {
    let command = "";
    let commandArgs: string[] = [];
    let cwd = args.appRoot || process.cwd();

    switch (name) {
      case "ionic_generate": {
        command = "ionic";
        commandArgs = ["generate", args.type, args.name];
        if (args.options) {
          for (const [key, value] of Object.entries(args.options)) {
            if (typeof value === "boolean" && value) {
              commandArgs.push(`--${key}`);
            } else if (typeof value === "string") {
              commandArgs.push(`--${key}`, value);
            }
          }
        }
        break;
      }
      case "ionic_capacitor_add": {
        command = "ionic";
        commandArgs = ["capacitor", "add", args.platform];
        break;
      }
      case "ionic_start": {
        command = "ionic";
        commandArgs = ["start", args.name];
        if (args.template) {
          commandArgs.push(args.template);
        }
        if (args.type) {
          commandArgs.push("--type", args.type);
        }
        if (args.capacitor) {
          commandArgs.push("--capacitor");
        }
        if (args.cordova) {
          commandArgs.push("--cordova");
        }
        if (args.directory) {
          cwd = args.directory;
        }
        if (args.options) {
          for (const [key, value] of Object.entries(args.options)) {
            if (typeof value === "boolean" && value) {
              commandArgs.push(`--${key}`);
            } else if (typeof value === "string") {
              commandArgs.push(`--${key}`, value);
            }
          }
        }
        break;
      }
      case "ionic_build": {
        command = "ionic";
        commandArgs = ["build"];
        if (args.engine) {
          commandArgs.push("--engine", args.engine);
        }
        if (args.platform) {
          commandArgs.push("--platform", args.platform);
        }
        break;
      }
      case "ionic_serve": {
        command = "ionic";
        commandArgs = ["serve"];
        if (args.external) {
          commandArgs.push("--external");
        }
        if (args.host && args.host !== "localhost") {
          commandArgs.push("--host", args.host);
        }
        if (args.port && args.port !== 8100) {
          commandArgs.push("--port", String(args.port));
        }
        if (!args.livereload) {
          commandArgs.push("--no-livereload");
        }
        if (!args.open) {
          commandArgs.push("--no-open");
        }
        if (args.browser) {
          commandArgs.push("--browser", args.browser);
        }
        break;
      }
      case "ionic_info": {
        command = "ionic";
        commandArgs = ["info"];
        if (args.json) {
          commandArgs.push("--json");
        }
        if (args.appRoot) {
          cwd = args.appRoot;
        }
        break;
      }
      default:
        return {
          content: [{ type: "text", text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }

    const output = await runCommand(command, commandArgs, cwd);
    return {
      content: [{ type: "text", text: output }],
      isError: false,
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: error instanceof Error ? error.message : String(error),
        },
      ],
      isError: true,
    };
  }
}

function runCommand(
  command: string,
  args: string[],
  cwd: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { cwd, shell: true });
    let stdout = "";
    let stderr = "";
    proc.stdout.on("data", (data) => {
      stdout += data.toString();
    });
    proc.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    proc.on("close", (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(stderr || `Process exited with code ${code}`);
      }
    });
    proc.on("error", (err) => {
      reject(err);
    });
  });
}
