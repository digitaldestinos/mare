"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, ChevronLeft, Wallet } from "lucide-react";
import { Button, Input } from "@/components";
import { AuthLoading, FieldError, useAuth } from "@/features/auth";
import { createWalletSchema } from "@/features/accounts/schemas/wallet.schema";
import { z } from "zod";
import { walletService } from "@/services/finance/wallet.service";
import { useWallets } from "@/hooks/use-wallets";
import { useQueryClient } from "@tanstack/react-query";
import { walletKeys } from "@/lib/query-keys";

const walletExamples = ["Carteira", "Mercado Pago", "Nubank", "Banco Inter", "Wise"];
const walletFormSchema = createWalletSchema.omit({ user_id: true });
type WalletFormInput = z.infer<typeof walletFormSchema>;

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const { data: wallets, isLoading: walletsLoading, isError, refetch } = useWallets(user?.id);
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<WalletFormInput>({ resolver: zodResolver(walletFormSchema), defaultValues: { type: "checking", currency: "BRL", balance: 0 } });

  useEffect(() => {
    if (!isLoading && !walletsLoading && user && wallets && wallets.length > 0) router.replace("/dashboard");
  }, [isLoading, router, user, wallets, walletsLoading]);

  if (isLoading || walletsLoading || !user) return <AuthLoading />;
  if (isError) return <main className="flex min-h-screen items-center justify-center p-6 text-center"><div><p className="text-sm text-destructive">Não foi possível carregar o onboarding.</p><button className="mt-3 text-sm underline" onClick={() => refetch()}>Tentar novamente</button></div></main>;

  async function onSubmit(input: WalletFormInput) {
    const currentUser = user;
    if (!currentUser) return;
    await walletService.create({ user_id: currentUser.id, ...input });
    await queryClient.invalidateQueries({ queryKey: walletKeys.list(currentUser.id) });
    setStep(3);
  }

  return <main className="flex min-h-screen items-center justify-center px-5 py-10"><section className="w-full max-w-[480px] animate-fade-in"><div className="mb-8 flex items-center justify-between"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Wallet size={17} /></div><div className="flex items-center gap-2" aria-label={`Passo ${step} de 3`}>{[1, 2, 3].map((item) => <span key={item} className={`h-1.5 rounded-full transition-all duration-300 ${item <= step ? "w-7 bg-primary" : "w-2 bg-border"}`} />)}</div><span className="text-xs text-muted-foreground">{step} de 3</span></div>{step === 1 && <div className="rounded-2xl border bg-card p-7 shadow-soft sm:p-10"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Primeiro acesso</p><h1 className="text-3xl font-semibold tracking-tight">Bem-vindo ao Maré.</h1><p className="mt-4 max-w-sm text-base leading-7 text-muted-foreground">O Maré organiza seu dinheiro para que você tome decisões melhores.</p><Button className="mt-9 w-full" onClick={() => setStep(2)}>Começar <ArrowRight size={16} /></Button></div>}{step === 2 && <div className="rounded-2xl border bg-card p-6 shadow-soft sm:p-8"><button type="button" onClick={() => setStep(1)} className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ChevronLeft size={16} /> Voltar</button><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Sua primeira carteira</p><h1 className="text-2xl font-semibold tracking-tight">Onde está seu dinheiro?</h1><form className="mt-7 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate><div><label className="mb-2 block text-sm font-medium" htmlFor="wallet-name">Nome</label><Input id="wallet-name" autoFocus placeholder="Ex.: Nubank" {...register("name")} /><div className="mt-2 flex flex-wrap gap-1.5">{walletExamples.map((example) => <button key={example} type="button" onClick={() => setValue("name", example, { shouldValidate: true })} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground">{example}</button>)}</div><FieldError message={errors.name?.message} /></div><div><label className="mb-2 block text-sm font-medium" htmlFor="wallet-type">Tipo</label><select id="wallet-type" className="flex h-10 w-full rounded-md border bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" {...register("type")}><option value="checking">Conta</option><option value="digital">Carteira</option><option value="cash">Dinheiro</option><option value="international">Conta Internacional</option></select></div><div><label className="mb-2 block text-sm font-medium" htmlFor="wallet-currency">Moeda</label><select id="wallet-currency" className="flex h-10 w-full rounded-md border bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" {...register("currency")}><option value="BRL">BRL — Real brasileiro</option><option value="USD">USD — Dólar americano</option><option value="EUR">EUR — Euro</option><option value="GBP">GBP — Libra esterlina</option></select></div><div><label className="mb-2 block text-sm font-medium" htmlFor="wallet-balance">Saldo inicial</label><Input id="wallet-balance" type="number" min="0" step="0.01" inputMode="decimal" {...register("balance", { valueAsNumber: true })} /><FieldError message={errors.balance?.message} /></div><Button className="mt-2 w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? "Salvando…" : "Continuar"} <ArrowRight size={16} /></Button></form></div>}{step === 3 && <div className="rounded-2xl border bg-card p-7 text-center shadow-soft sm:p-10"><div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check size={22} /></div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Tudo pronto</p><h1 className="text-3xl font-semibold tracking-tight">Pronto.</h1><p className="mx-auto mt-4 max-w-xs text-base leading-7 text-muted-foreground">Agora registre seu primeiro lançamento.</p><Button className="mt-9 w-full" onClick={() => router.push("/movimentacoes")}>Registrar primeiro lançamento <ArrowRight size={16} /></Button></div>}<p className="mt-8 text-center text-xs text-muted-foreground">Maré · clareza para a sua vida financeira</p></section></main>;
}
