import express from "express";
import loadConfig from "./src/config/loadConfig.js";
import loadPlugins from "./src/plugins/loadPlugins.js";
import { createRouter } from "./src/http/routes/routes.js";

const app = express();

async function start(): Promise<void> {
  const config = loadConfig();
  const { auth, db } = await loadPlugins(config);

  app.use(express.json());
  app.use("/api", createRouter({ db, auth }));

  app.listen(3000, () => console.log("Backend running on 3000"));
}

start().catch(console.error);