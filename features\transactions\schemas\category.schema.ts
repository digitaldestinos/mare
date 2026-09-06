import { z } from "zod";

export const categoryTypeSchema = z.enum(["income", "expense", "transfer", "adjustment", "refund"]);

export const createCategorySchema = z.object({
  user_id: z.string().uuid().nullable().optional(),
  name: z.string().trim().min(1, "O nome da categoria Ã© obrigatÃ³rio."),
  type: categoryTypeSchema,
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

