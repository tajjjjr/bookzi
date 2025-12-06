import { Request, Response, NextFunction } from "express";
import { z } from "zod";

declare global {
  namespace Express {
    interface Request {
      validated?: unknown;
    }
  }
}

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parse = schema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parse.error.flatten()
      });
    }

    req.validated = parse.data;
    next();
  };
}