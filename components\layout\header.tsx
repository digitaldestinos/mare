"use client";

import { Bell, Menu, Search, Waves } from "lucide-react";
import { useAuth } from "@/features/auth";

export function Header() {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name ?? "Sua conta";
  const initials = name.split(" ").map((part: string) => part[0]).join("").slice(0, 2).toUpperCase();
  return <header className="flex h-[68px] items-center justify-between gap-4 border-b px-5 sm:px-8 lg:px-10">
    <div className="flex items-center gap-3 lg:hidden"><span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground"><Waves size={16} /></span><span className="text-sm font-semibold">MarÃ©</span></div>
    <div className="relative hidden max-w-md flex-1 sm:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} /><input aria-label="Pesquisar" className="h-9 w-full rounded-lg border-0 bg-secondary/70 pl-9 pr-16 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:bg-secondary focus:ring-2 focus:ring-ring/30" placeholder="Pesquisar no MarÃ©" /></div>
    <div className="ml-auto flex items-center gap-1"><button type="button" aria-label="NotificaÃ§Ãµes" className="hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:block"><Bell size={17} /></button><button type="button" aria-label="Abrir menu" className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"><Menu size={19} /></button><div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground">{initials}</div></div>
  </header>;
}

