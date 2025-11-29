const express = require("express");
const loadConfig = require("./src/config/loadConfig");
const loadPlugins = require("./src/plugins/loadPlugins");

const productsRoutes = require("./src/http/routes/products");
const ordersRoutes = require("./src/http/routes/orders");
const authMiddlewareFactory = require("./src/http/middleware/auth");

const app = express();

async function start() {
  const config = loadConfig();
  const { auth, db } = loadPlugins(config);

  app.use(express.json());

  app.use("/products", productsRoutes(db));
  app.use("/orders", ordersRoutes(db, authMiddlewareFactory(auth)));

  app.listen(3000, () => console.log("Backend running on 3000"));
}

start();
