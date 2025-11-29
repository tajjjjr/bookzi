import express from "express";
import bodyParser from "body-parser";
const { json } = bodyParser;
import { createRouter } from "./src/http/routes/routes.mock.js";
import mockDb from "./src/adapters/mock/db.mock.js";
import mockAuth from "./src/adapters/mock/auth.mock.js";

const app = express();

// Middleware
app.use(json());

// Mount API routes with mocks
app.use("/api", createRouter({ db: mockDb, auth: mockAuth }));

// Basic health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Backend test server running on http://localhost:${PORT}`);
});
