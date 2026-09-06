export type UUID = string;
export type ISODate = string;

export type CurrencyCode = "BRL" | "USD" | "EUR" | "GBP";

export type WalletType = "checking" | "digital" | "cash" | "international" | "other";
export type TransactionType = "income" | "expense" | "transfer" | "adjustment" | "refund";
export type TransactionStatus = "pending" | "confirmed" | "cancelled";
export type CategoryType = "income" | "expense" | "transfer" | "adjustment" | "refund";
export type CaptureConfidence = "high" | "medium";

export interface Wallet {
  id: UUID;
  user_id: UUID;
  name: string;
  type: WalletType;
  currency: CurrencyCode;
  balance: number;
  active: boolean;
  created_at: ISODate;
  updated_at: ISODate;
}

export interface Transaction {
  id: UUID;
  user_id: UUID;
  wallet_id: UUID;
  category_id: UUID | null;
  type: TransactionType;
  description: string;
  amount: number;
  currency: CurrencyCode;
  status: TransactionStatus;
  date: ISODate;
  notes: string | null;
  created_at: ISODate;
  updated_at: ISODate;
}

export interface Category {
  id: UUID;
  user_id: UUID | null;
  name: string;
  type: CategoryType;
  is_default: boolean;
  active: boolean;
  created_at: ISODate;
  updated_at: ISODate;
}

export interface RecurringTransaction {
  id: UUID;
  user_id: UUID;
  wallet_id: UUID;
  category_id: UUID | null;
  type: Exclude<TransactionType, "transfer" | "adjustment">;
  description: string;
  amount: number;
  currency: CurrencyCode;
  frequency: "weekly" | "monthly" | "yearly";
  next_date: ISODate;
  active: boolean;
  created_at: ISODate;
  updated_at: ISODate;
}

export interface FinancialCard {
  id: UUID;
  user_id: UUID;
  name: string;
  brand: string | null;
  last_four_digits: string | null;
  credit_limit: number | null;
  currency: CurrencyCode;
  active: boolean;
  created_at: ISODate;
  updated_at: ISODate;
}

export interface FinancialGoal {
  id: UUID;
  user_id: UUID;
  name: string;
  target_amount: number;
  current_amount: number;
  currency: CurrencyCode;
  target_date: ISODate | null;
  active: boolean;
  created_at: ISODate;
  updated_at: ISODate;
}

export interface DefaultCategory {
  key: string;
  name: string;
  type: CategoryType;
}

export interface QuickCaptureResult {
  source: string;
  description: string;
  amount: number;
  currency: CurrencyCode;
  type: Extract<TransactionType, "income" | "expense">;
  category: string;
  category_type: CategoryType;
  confidence: CaptureConfidence;
  needs_confirmation: boolean;
}
