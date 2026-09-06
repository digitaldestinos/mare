import type { Transaction } from "@/types/finance";
import type { RecordQuickCaptureInput } from "@/types/finance-inputs";
import { createTransactionSchema } from "@/features/transactions/schemas/transaction.schema";
import { TransactionRepository } from "@/repositories/finance/transaction.repository";
export class TransactionService {
  constructor(private readonly repository = new TransactionRepository()) {}
  list(userId: string, walletId: string): Promise<Transaction[]> { return this.repository.listByWallet(userId, walletId); }
  async recordQuickCapture(input: RecordQuickCaptureInput & { user_id: string; category_id?: string | null }) {
    const payload = createTransactionSchema.parse({ wallet_id: input.wallet_id, category_id: input.category_id ?? null, type: input.parsed.type, description: input.parsed.description, amount: input.parsed.amount, currency: input.parsed.currency, status: "confirmed", date: input.date ?? new Date().toISOString(), notes: null });
    return this.repository.create({ ...payload, user_id: input.user_id });
  }
}
export const transactionService = new TransactionService();
