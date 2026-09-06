"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionKeys } from "@/lib/query-keys";
import { transactionService } from "@/services/finance/transaction.service";
import type { RecordQuickCaptureInput } from "@/types/finance-inputs";
export function useTransactions(userId?: string, walletId?: string) { return useQuery({ queryKey: transactionKeys.list(userId ?? "", walletId ?? ""), queryFn: () => transactionService.list(userId!, walletId!), enabled: Boolean(userId && walletId) }); }
export function useRecordQuickCapture(userId: string | undefined, walletId: string | undefined) { const client = useQueryClient(); return useMutation({ mutationFn: (input: RecordQuickCaptureInput & { category_id?: string | null }) => transactionService.recordQuickCapture({ ...input, user_id: userId!, wallet_id: walletId! }), onSuccess: () => client.invalidateQueries({ queryKey: transactionKeys.all }) }); }
