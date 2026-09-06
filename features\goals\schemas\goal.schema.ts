import { z } from "zod";
import { currencySchema } from "@/features/accounts/schemas/wallet.schema";

export const futureGoalSchema = z.object({
  user_id: z.string().uuid(),
  name: z.string().trim().min(1),
  target_amount: z.number().nonnegative(),
  current_amount: z.number().nonnegative(),
  currency: currencySchema,
  target_date: z.string().datetime({ offset: true }).nullable().optional(),
  active: z.boolean().default(true),
});

export type FutureGoalSchema = z.infer<typeof futureGoalSchema>;

