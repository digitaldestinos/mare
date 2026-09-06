import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import { logError, RepositoryError } from "@/lib/errors";
import type { CreateWalletInput } from "@/types/finance-inputs";
export class WalletRepository {
  constructor(private readonly client?: SupabaseClient<Database>) {}
  async listByUser(userId: string) { const { data, error } = await this.clientInstance.from("wallets").select("*").eq("user_id", userId).order("created_at", { ascending: true }); if (error) return this.fail("listar carteiras", error); return data; }
  async getDefaultByUser(userId: string) { const { data, error } = await this.clientInstance.from("wallets").select("*").eq("user_id", userId).eq("active", true).order("created_at", { ascending: true }).limit(1).maybeSingle(); if (error) return this.fail("buscar carteira principal", error); return data; }
  async create(input: CreateWalletInput) { const { data, error } = await this.clientInstance.from("wallets").insert(input).select().single(); if (error) return this.fail("criar carteira", error); return data; }
  private get clientInstance() { return this.client ?? createClient(); }
  private fail(operation: string, error: unknown): never { logError(error, { operation, repository: "wallets" }); throw new RepositoryError(operation, error); }
}
