import path from "path";
import { pathToFileURL } from "url";

export default async function loadPlugins(config) {
  // Dynamic import() requires absolute file URLs, not just paths.
  const authModule = await import(pathToFileURL(path.resolve(config.authAdapter)));
  const dbModule = await import(pathToFileURL(path.resolve(config.dbAdapter)));

  const auth = authModule.default;
  const db = dbModule.default;

  // Validation
  if (typeof auth.isAuthenticated !== "function") {
    throw new Error("Auth adapter missing isAuthenticated()");
  }

  if (typeof db.getProducts !== "function") {
    throw new Error("DB adapter missing getProducts()");
  }

  return { auth, db };
};
  