import fs from "fs";
import path from "path";

interface Config {
  authAdapter: string;
  dbAdapter: string;
  callbackUrl: string;
}

export default function loadConfig(): Config {
  const filePath = path.join(process.cwd(), "config.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("config.json not found in project root.");
  }

  const config = JSON.parse(fs.readFileSync(filePath, "utf8")) as Config;

  if (!config.authAdapter || !config.dbAdapter || !config.callbackUrl) {
    throw new Error("Invalid config.json: missing required fields.");
  }

  return config;
}