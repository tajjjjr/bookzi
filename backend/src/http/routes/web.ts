import express from "express";
import { ProductCatalogAdapter } from "../../adapters/interfaces/ProductCatalogAdapter.ts";
import { AttachmentAdapter } from "../../adapters/interfaces/AttachmentAdapter.ts";
import { AuthAdapter } from "../../adapters/interfaces/AuthAdapter.ts";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createWebRouter({ 
  productAdapter: _productAdapter, 
  attachmentAdapter: _attachmentAdapter,
  authAdapter: _authAdapter 
}: { 
  productAdapter: ProductCatalogAdapter;
  attachmentAdapter: AttachmentAdapter;
  authAdapter: AuthAdapter;
}): express.Router {
  const router = express.Router();

  // Serve static HTML pages
  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
  });

  return router;
}