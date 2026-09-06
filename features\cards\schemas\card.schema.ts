import { z } from "zod";
import { currencySchema } from "@/features/accounts/schemas/wallet.schema";

export const futureCardSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string().trim().min(1),
  brand: z.string().trim().nullable().optional(),
  last_four_digits: z.string().regex(/^\d{4}$/).nullable().optional(),
  credit_limit: z.number().nonnegative().nullable().optional(),
  currency: currencySchema,
  active: z.boolean().default(true),
});

export type FutureCardSchema = z.infer<typeof futureCardSchema>;

