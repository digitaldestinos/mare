import type { Wallet, WalletType, CurrencyCode } from "@/types/finance";

export type CreateWalletInput = { user_id: string; name: string; type: WalletType; currency: CurrencyCode; balance: number };

const storageKey = "mare:wallets";

function readWallets(): Wallet[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as Wallet[]; } catch { return []; }
}

function writeWallets(wallets: Wallet[]) { window.localStorage.setItem(storageKey, JSON.stringify(wallets)); }

export class WalletService {
  list(userId: string) { return readWallets().filter((wallet) => wallet.user_id === userId); }
  getDefault(userId: string) { return this.list(userId).find((wallet) => wallet.active) ?? null; }
  create(input: CreateWalletInput): Wallet {
    const now = new Date().toISOString();
    const wallet: Wallet = { id: crypto.randomUUID(), ...input, active: true, created_at: now, updated_at: now };
    writeWallets([...readWallets(), wallet]);
    return wallet;
  }
}

export const walletService = new WalletService();

