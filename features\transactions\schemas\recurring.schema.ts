import { z } from "zod";
import { currencySchema } from "@/features/accounts/schemas/wallet.schema";
import { transactionTypeSchema } from "./transaction.schema";

export const recurringTransactionSchema = z.object({
  user_id: z.string().uuid(),
  wallet_id: z.string().uuid(),
  category_id: z.string().uuid().nullable().optional(),
  type: transactionTypeSchema.exclude(["transfer", "adjustment"]),
  description: z.string().trim().min(1),
  amount: z.number().positive(),
  currency: currencySchema,
  frequency: z.enum(["weekly", "monthly", "yearly"]),
  next_date: z.string().datetime({ offset: true }),
  active: z.boolean().default(true),
});

export type RecurringTransactionSchema = z.infer<typeof recurringTransactionSchema>;

