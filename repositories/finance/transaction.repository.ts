import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import { logError, RepositoryError } from "@/lib/errors";
import type { CreateTransactionInput } from "@/types/finance-inputs";
export class TransactionRepository {
  constructor(private readonly client?: SupabaseClient<Database>) {}
  async listByWallet(userId: string, walletId: string) { const { data, error } = await this.clientInstance.from("transactions").select("*").eq("user_id", userId).eq("wallet_id", walletId).order("date", { ascending: false }); if (error) { logError(error, { operation: "listar movimentações" }); throw new RepositoryError("listar movimentações", error); } return data; }
  async create(input: CreateTransactionInput & { user_id: string }) { const { data, error } = await this.clientInstance.from("transactions").insert(input).select().single(); if (error) { logError(error, { operation: "criar movimentação" }); throw new RepositoryError("criar movimentação", error); } return data; }
  private get clientInstance() { return this.client ?? createClient(); }
}
