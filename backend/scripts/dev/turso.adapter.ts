import express from "express";
import bodyParser from "body-parser";
import { createRouter } from "../../src/http/routes/routes.ts";
import { TursoAdapter } from "../../src/adapters/turso/turso.adapter.ts";
import mockAuth from "../../src/adapters/mock/auth.mock.ts";
import mockProduct from "../../src/adapters/mock/product.mock.ts";
import mockAttachment from "../../src/adapters/mock/attachment.mock.ts";

const { json } = bodyParser;
const app = express();

// Initialize Turso adapter
const db = new TursoAdapter({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

// Initialize database schema
await db.init();

// Middleware
app.use(json());

// Mount API routes with Turso DB and mock adapters
app.use("/api", createRouter({ 
  db, 
  authAdapter: mockAuth, 
  productAdapter: mockProduct, 
  attachmentAdapter: mockAttachment 
}));

// Basic health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend Turso server running on http://localhost:${PORT}`);
});