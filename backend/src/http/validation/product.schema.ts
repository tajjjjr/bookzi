import { z } from "zod";

export const ProductIdSchema = z.object({
  id: z.number().int().positive()
});