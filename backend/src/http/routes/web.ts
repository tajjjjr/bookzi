import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createWebRouter(): express.Router {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
  });

  return router;
}