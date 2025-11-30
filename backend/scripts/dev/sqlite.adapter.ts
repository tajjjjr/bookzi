import express from "express";
import bodyParser from "body-parser";
import { createRouter } from "../../src/http/routes/routes.ts";
import { SQLiteAdapter } from "../../src/adapters/sqlite/sqlite.adapter.ts";
import mockAuth from "../../src/adapters/mock/auth.mock.ts";

const { json } = bodyParser;
const app = express();

// Initialize SQLite adapter
const db = new SQLiteAdapter({
  filepath: "./dev.sqlite"
});

// Middleware
app.use(json());

// Mount API routes with SQLite DB and mock auth
app.use("/api", createRouter({ db, auth: mockAuth }));

// Basic health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend SQLite server running on http://localhost:${PORT}`);
});
