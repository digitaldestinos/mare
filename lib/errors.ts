export class AppError extends Error { constructor(message: string, public readonly code = "APP_ERROR", public readonly cause?: unknown) { super(message); this.name = "AppError"; } }
export class RepositoryError extends AppError { constructor(operation: string, cause: unknown) { super(`Não foi possível concluir ${operation}.`, "REPOSITORY_ERROR", cause); this.name = "RepositoryError"; } }
export function logError(error: unknown, context: Record<string, unknown> = {}) { console.error("[Maré] erro", { error, ...context }); }
export function toUserMessage(error: unknown, fallback = "Algo deu errado. Tente novamente.") { return error instanceof AppError ? error.message : fallback; }
