import express from "express";
import bodyParser from "body-parser";
import { createRouter } from "../../src/http/routes/routes.ts";
import { SQLiteAdapter } from "../../src/adapters/sqlite/sqlite.adapter.ts";
import { AuthAdapter } from "../../src/adapters/auth/auth.ts";

const { json } = bodyParser;
const app = express();

// Initialize SQLite adapter
const db = new SQLiteAdapter({
  filepath: "./dev.sqlite"
});

// Initialize Auth adapter with JWT secret and SQLite dependency
const authAdapter = new AuthAdapter(
  process.env.JWT_SECRET || "dev-secret",
  db
);

// Middleware
app.use(json());

// Mount API routes with SQLite DB and Auth adapter
app.use("/api", createRouter({ db, authAdapter }));

// Basic health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend Auth server running on http://localhost:${PORT}`);
});