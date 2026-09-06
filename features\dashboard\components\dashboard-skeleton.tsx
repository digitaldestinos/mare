import { Skeleton } from "@/components";

const summaryCards = ["Saldo", "Receitas", "Despesas", "CrÃ©dito"];

export function DashboardSkeleton() {
  return <div className="mx-auto w-full max-w-[1320px] animate-fade-in"><div className="mb-8 flex items-end justify-between gap-4"><div><Skeleton className="mb-3 h-3 w-20" /><Skeleton className="h-8 w-44" /></div><Skeleton className="hidden h-9 w-28 rounded-lg sm:block" /></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{summaryCards.map((card, index) => <div key={card} className={index === 0 ? "rounded-xl border bg-primary p-5 shadow-soft" : "rounded-xl border bg-card p-5 shadow-card"}><p className={index === 0 ? "mb-5 text-sm text-primary-foreground/70" : "mb-5 text-sm text-muted-foreground"}>{card}</p><Skeleton className={index === 0 ? "h-8 w-32 bg-primary-foreground/20" : "h-8 w-32"} /><Skeleton className={index === 0 ? "mt-3 h-3 w-24 bg-primary-foreground/10" : "mt-3 h-3 w-24"} /></div>)}</div><div className="mt-8 grid gap-4 xl:grid-cols-[1.35fr_1fr]"><PlaceholderSection title="Ãšltimas movimentaÃ§Ãµes" /><PlaceholderSection title="PrÃ³ximos vencimentos" /></div></div>;
}

function PlaceholderSection({ title }: Readonly<{ title: string }>) {
  return <section className="rounded-xl border bg-card p-5 shadow-card sm:p-6"><div className="mb-6 flex items-center justify-between"><h2 className="text-sm font-medium">{title}</h2><Skeleton className="h-7 w-16 rounded-md" /></div><div className="space-y-5">{[1, 2, 3, 4].map((item) => <div key={item} className="flex items-center gap-3"><Skeleton className="h-9 w-9 rounded-full" /><div className="flex-1"><Skeleton className="h-3 w-2/5" /><Skeleton className="mt-2 h-2.5 w-1/4" /></div><Skeleton className="h-3 w-16" /></div>)}</div></section>;
}

