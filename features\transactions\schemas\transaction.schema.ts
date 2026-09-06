import { z } from "zod";
import { currencySchema } from "@/features/accounts/schemas/wallet.schema";

export const transactionTypeSchema = z.enum(["income", "expense", "transfer", "adjustment", "refund"]);
export const transactionStatusSchema = z.enum(["pending", "confirmed", "cancelled"]);

export const createTransactionSchema = z.object({
  wallet_id: z.string().uuid(),
  category_id: z.string().uuid().nullable().optional(),
  type: transactionTypeSchema,
  description: z.string().trim().min(1, "A descrição é obrigatória."),
  amount: z.number().positive("O valor deve ser maior que zero."),
  currency: currencySchema,
  status: transactionStatusSchema.default("confirmed"),
  date: z.string().datetime({ offset: true }),
  notes: z.string().trim().nullable().optional(),
});

export const updateTransactionSchema = createTransactionSchema.omit({ wallet_id: true }).partial();

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionSchema = z.infer<typeof updateTransactionSchema>;
