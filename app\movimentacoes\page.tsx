"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownLeft, Check, Command, CornerDownLeft, Pencil, Search, Waves, X } from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, Input, Toast } from "@/components";
import { parseQuickCapture } from "@/features/transactions/services/quick-capture.parser";
import { transactionService } from "@/services/finance/transaction.service";
import type { QuickCaptureResult } from "@/types/finance";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth";
import { walletService } from "@/services/finance/wallet.service";

const examples = ["Uber 18", "iFood 42", "Mercado 180 pix", "Recebi 3200", "Gasolina 250", "Notebook 4500 10x"];

export default function TransactionsPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [source, setSource] = useState("");
  const [preview, setPreview] = useState<QuickCaptureResult | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [walletName, setWalletName] = useState("Carteira principal");

  useEffect(() => {
    if (!isLoading && user) {
      const wallet = walletService.getDefault(user.id);
      if (!wallet) { router.replace("/onboarding"); return; }
      setWalletName(wallet.name);
    }
    inputRef.current?.focus();
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") { event.preventDefault(); inputRef.current?.focus(); }
      if (event.key === "Escape") cancelCapture();
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [isLoading, router, user]);

  function interpret(value = source) {
    setSaved(false);
    setError("");
    const result = parseQuickCapture(value);
    if (!result) { setPreview(null); setError("Digite uma descrição e um valor, como “Uber 18”."); return; }
    setPreview(result);
    if (result.needs_confirmation) setDialogOpen(true);
  }

  function cancelCapture() { setDialogOpen(false); setPreview(null); setSource(""); setError(""); window.setTimeout(() => inputRef.current?.focus(), 0); }

  function confirmCapture() {
    if (!preview) return;
    const wallet = user ? walletService.getDefault(user.id) : null;
    if (!wallet) { setError("Crie uma carteira antes de registrar sua primeira movimentação."); setDialogOpen(false); return; }
    transactionService.recordQuickCapture({ wallet_id: wallet.id, parsed: preview });
    setDialogOpen(false); setPreview(null); setSource(""); setError(""); setSaved(true);
    window.setTimeout(() => { setSaved(false); inputRef.current?.focus(); }, 1800);
  }

  return <div className="mx-auto flex min-h-[calc(100vh-136px)] w-full max-w-3xl flex-col items-center justify-center py-8 animate-fade-in sm:min-h-[calc(100vh-140px)]"><div className="w-full"><div className="mb-8 text-center"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Registro rápido</p><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">O que aconteceu hoje?</h1><p className="mt-2 text-sm text-muted-foreground">Escreva em poucas palavras. O Maré organiza para você.</p></div><div className="relative"><Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={21} /><Input ref={inputRef} value={source} onChange={(event) => { setSource(event.target.value); setError(""); setSaved(false); }} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); interpret(); } }} className="h-[68px] rounded-2xl border bg-card pl-14 pr-28 text-base shadow-soft transition-shadow placeholder:text-muted-foreground/70 focus-visible:shadow-card sm:text-lg" placeholder="No que você gastou hoje?" aria-label="Captura rápida de movimentação" autoComplete="off" /><div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 text-xs text-muted-foreground sm:flex"><Command size={13} /> L</div></div><div className="mt-4 flex flex-wrap justify-center gap-2">{examples.map((example) => <button key={example} type="button" onClick={() => { setSource(example); inputRef.current?.focus(); }} className="rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{example}</button>)}</div>{error && <p role="alert" className="mt-5 text-center text-sm text-destructive">{error}</p>}{saved && <Toast className="mx-auto mt-6 max-w-sm justify-center border-accent bg-accent/50 text-accent-foreground"><Check size={16} /> Movimentação registrada.</Toast>}{!preview && !saved && !error && <EmptyState onRegister={() => inputRef.current?.focus()} />}{preview && !dialogOpen && <CapturePreview preview={preview} walletName={walletName} onConfirm={confirmCapture} onEdit={cancelCapture} />}</div><div className="mt-12 hidden items-center gap-5 text-xs text-muted-foreground sm:flex"><span className="flex items-center gap-1.5"><CornerDownLeft size={13} /> Enter para interpretar</span><span className="flex items-center gap-1.5"><X size={13} /> Esc para cancelar</span></div>{dialogOpen && preview && <ConfirmationDialog preview={preview} walletName={walletName} onConfirm={confirmCapture} onCancel={cancelCapture} />}</div>;
}

function CapturePreview({ preview, walletName, onConfirm, onEdit }: Readonly<{ preview: QuickCaptureResult; walletName: string; onConfirm: () => void; onEdit: () => void }>) {
  return <Card className="mx-auto mt-8 max-w-lg animate-slide-up"><CardHeader className="flex-row items-center justify-between space-y-0"><div><p className="text-xs uppercase tracking-wide text-muted-foreground">Prévia</p><h2 className="mt-1 text-base font-medium">Tudo certo para registrar?</h2></div><Badge className={preview.type === "income" ? "border-accent bg-accent/50 text-accent-foreground" : "bg-secondary"}>{preview.type === "income" ? "Receita" : "Despesa"}</Badge></CardHeader><CardContent><PreviewDetails preview={preview} walletName={walletName} /><div className="mt-6 flex gap-3"><Button className="flex-1" onClick={onConfirm}><Check size={16} /> Confirmar</Button><Button variant="outline" onClick={onEdit}><Pencil size={15} /> Editar</Button></div></CardContent></Card>;
}

function PreviewDetails({ preview, walletName }: Readonly<{ preview: QuickCaptureResult; walletName: string }>) {
  const rows = [["Valor", formatCurrency(preview.amount)], ["Categoria", preview.category], ["Carteira", walletName], ["Data", "Hoje"], ["Descrição", preview.description]];
  return <div className="divide-y rounded-lg border">{rows.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 px-3.5 py-3 text-sm"><span className="text-muted-foreground">{label}</span><span className={cn("text-right font-medium", label === "Valor" && "text-base")}>{value}</span></div>)}</div>;
}

function ConfirmationDialog({ preview, walletName, onConfirm, onCancel }: Readonly<{ preview: QuickCaptureResult; walletName: string; onConfirm: () => void; onCancel: () => void }>) {
  return <div role="dialog" aria-modal="true" aria-labelledby="confirmation-title" className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-[2px]"><Card className="w-full max-w-md animate-slide-up shadow-soft"><CardHeader><div className="mb-1 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Confirme os detalhes</p><button type="button" aria-label="Fechar" onClick={onCancel} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary"><X size={16} /></button></div><h2 id="confirmation-title" className="text-lg font-semibold">Interpretamos assim</h2><p className="text-sm text-muted-foreground">Não reconhecemos a categoria com certeza. Você pode confirmar ou editar.</p></CardHeader><CardContent><PreviewDetails preview={preview} walletName={walletName} /><div className="mt-6 flex gap-3"><Button className="flex-1" onClick={onConfirm}>Confirmar <ArrowDownLeft size={15} /></Button><Button variant="outline" onClick={onCancel}>Cancelar</Button></div></CardContent></Card></div>;
}

function EmptyState({ onRegister }: Readonly<{ onRegister: () => void }>) {
  return <div className="mx-auto mt-10 max-w-sm text-center animate-slide-up"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border bg-card text-muted-foreground shadow-card"><Waves size={20} /></div><p className="text-sm font-medium">Nenhuma movimentação ainda.</p><p className="mt-1.5 text-sm text-muted-foreground">Seu primeiro registro leva menos de cinco segundos.</p><button type="button" onClick={onRegister} className="mt-4 text-sm font-medium text-foreground underline-offset-4 hover:underline">Registrar agora</button></div>;
}

function formatCurrency(amount: number) { return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount); }
