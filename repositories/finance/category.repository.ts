import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import { logError, RepositoryError } from "@/lib/errors";
export class CategoryRepository {
  constructor(private readonly client?: SupabaseClient<Database>) {}
  async listForUser(userId: string) { const { data, error } = await this.clientInstance.from("categories").select("*").or(`user_id.is.null,user_id.eq.${userId}`).eq("active", true).order("is_default", { ascending: false }).order("name", { ascending: true }); if (error) { logError(error, { operation: "listar categorias" }); throw new RepositoryError("listar categorias", error); } return data; }
  private get clientInstance() { return this.client ?? createClient(); }
}
