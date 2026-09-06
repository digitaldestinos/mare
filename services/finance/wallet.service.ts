import type { Wallet } from "@/types/finance";
import type { CreateWalletInput } from "@/types/finance-inputs";
import { createWalletSchema } from "@/features/accounts/schemas/wallet.schema";
import { WalletRepository } from "@/repositories/finance/wallet.repository";
export class WalletService {
  constructor(private readonly repository = new WalletRepository()) {}
  list(userId: string): Promise<Wallet[]> { return this.repository.listByUser(userId); }
  getDefault(userId: string): Promise<Wallet | null> { return this.repository.getDefaultByUser(userId); }
  create(input: CreateWalletInput): Promise<Wallet> { return this.repository.create(createWalletSchema.parse(input)); }
}
export const walletService = new WalletService();
