const path = require("path");

module.exports = function loadPlugins(config) {
  const auth = require(path.resolve(config.authAdapter));
  const db = require(path.resolve(config.dbAdapter));

  // Validation
  if (typeof auth.isAuthenticated !== "function") {
    throw new Error("Auth adapter missing isAuthenticated()");
  }

  if (typeof db.listProducts !== "function") {
    throw new Error("DB adapter missing listProducts()");
  }

  return { auth, db };
};
  