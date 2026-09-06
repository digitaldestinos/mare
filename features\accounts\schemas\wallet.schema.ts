import { z } from "zod";

export const walletTypeSchema = z.enum(["checking", "digital", "cash", "international", "other"]);
export const currencySchema = z.enum(["BRL", "USD", "EUR", "GBP"]);

export const createWalletSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string().trim().min(1, "O nome da carteira Ã© obrigatÃ³rio."),
  type: walletTypeSchema,
  currency: currencySchema,
  balance: z.number().nonnegative("O saldo nÃ£o pode ser negativo."),
});

export const updateWalletSchema = createWalletSchema.omit({ user_id: true }).partial();

export type CreateWalletSchema = z.infer<typeof createWalletSchema>;
export type UpdateWalletSchema = z.infer<typeof updateWalletSchema>;

