const fs = require("fs");
const path = require("path");

module.exports = function loadConfig() {
  const filePath = path.join(process.cwd(), "config.json");

  if (!fs.existsSync(filePath)) {
    throw new Error("config.json not found in project root.");
  }

  const config = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!config.authAdapter || !config.dbAdapter || !config.callbackUrl) {
    throw new Error("Invalid config.json: missing required fields.");
  }

  return config;
};
