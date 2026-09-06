"use client";
import { useQuery } from "@tanstack/react-query";
import { walletKeys } from "@/lib/query-keys";
import { walletService } from "@/services/finance/wallet.service";
export function useWallets(userId?: string) { return useQuery({ queryKey: walletKeys.list(userId ?? ""), queryFn: () => walletService.list(userId!), enabled: Boolean(userId) }); }
