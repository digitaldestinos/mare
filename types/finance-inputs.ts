import type { CategoryType, CurrencyCode, TransactionStatus, TransactionType, WalletType } from "./finance";

export interface CreateWalletInput {
  user_id: string;
  name: string;
  type: WalletType;
  currency: CurrencyCode;
  balance: number;
}

export interface CreateTransactionInput {
  user_id?: string;
  wallet_id: string;
  category_id?: string | null;
  type: TransactionType;
  description: string;
  amount: number;
  currency: CurrencyCode;
  status?: TransactionStatus;
  date: string;
  notes?: string | null;
}

export interface CreateCategoryInput {
  user_id?: string | null;
  name: string;
  type: CategoryType;
}

export interface RecordQuickCaptureInput {
  wallet_id: string;
  parsed: import("./finance").QuickCaptureResult;
  date?: string;
}
