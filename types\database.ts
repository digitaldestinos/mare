/** Contratos persistidos e aliases de compatibilidade da camada de dados. */
export * from "./finance";

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  timezone: string;
  locale: string;
  created_at: string;
  updated_at: string;
}

export interface AuditEvent {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

