import path from "path";
import { pathToFileURL } from "url";
import { AuthAdapter } from "../adapters/interfaces/AuthAdapter.ts";
import { DBAdapter } from "../adapters/interfaces/DBAdapter.ts";

interface Config {
  authAdapter: string;
  dbAdapter: string;
  callbackUrl: string;
}

interface LoadedPlugins {
  auth: AuthAdapter;
  db: DBAdapter;
}

export default async function loadPlugins(config: Config): Promise<LoadedPlugins> {
  const authModule = await import(pathToFileURL(path.resolve(config.authAdapter)).href);
  const dbModule = await import(pathToFileURL(path.resolve(config.dbAdapter)).href);

  const auth: AuthAdapter = authModule.default;
  const db: DBAdapter = dbModule.default;

  if (typeof auth.isAuthenticated !== "function") {
    throw new Error("Auth adapter missing isAuthenticated()");
  }

  if (typeof db.listProducts !== "function") {
    throw new Error("DB adapter missing listProducts()");
  }

  return { auth, db };
}