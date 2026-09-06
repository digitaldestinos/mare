import type { Transaction } from "@/types/finance";
import type { RecordQuickCaptureInput } from "@/types/finance-inputs";

const sessionTransactions: Transaction[] = [];

/** Boundary for transaction persistence; a repository can replace this later. */
export class TransactionService {
  recordQuickCapture(input: RecordQuickCaptureInput): Transaction {
    const now = new Date().toISOString();
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      wallet_id: input.wallet_id,
      category_id: null,
      type: input.parsed.type,
      description: input.parsed.description,
      amount: input.parsed.amount,
      currency: input.parsed.currency,
      status: "confirmed",
      date: input.date ?? now,
      notes: null,
      created_at: now,
      updated_at: now,
    };
    sessionTransactions.push(transaction);
    return transaction;
  }
}

export const transactionService = new TransactionService();

