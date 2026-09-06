export const walletKeys = { all: ["wallets"] as const, list: (userId: string) => ["wallets", "list", userId] as const };
export const categoryKeys = { all: ["categories"] as const, list: (userId: string) => ["categories", "list", userId] as const };
export const transactionKeys = { all: ["transactions"] as const, list: (userId: string, walletId: string) => ["transactions", "list", userId, walletId] as const };
