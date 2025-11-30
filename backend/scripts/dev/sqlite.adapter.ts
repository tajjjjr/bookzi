import express from "express";
import bodyParser from "body-parser";
import { createRouter } from "../../src/http/routes/routes.ts";
import { SQLiteAdapter } from "../../src/adapters/sqlite/sqlite.adapter.ts";
import { ProductCatalogAdapter } from "../../src/adapters/products/products.ts";
import { LocalAttachmentAdapter } from "../../src/adapters/attachments/local.ts";
import mockAuth from "../../src/adapters/mock/auth.mock.ts";

const { json } = bodyParser;
const app = express();

// Initialize SQLite adapter
const db = new SQLiteAdapter({
  filepath: "./dev.sqlite"
});

// Initialize adapters
const attachmentAdapter = new LocalAttachmentAdapter(db);
const productAdapter = new ProductCatalogAdapter(db, attachmentAdapter);

// Middleware
app.use(json());
app.use('/uploads', express.static('uploads'));

// Mount API routes with SQLite DB and mock auth
app.use("/api", createRouter({ db, authAdapter: mockAuth, productAdapter, attachmentAdapter }));

// Basic health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend SQLite server running on http://localhost:${PORT}`);
});
