"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigationItems } from "./navigation";

const mobileItems = navigationItems.slice(0, 4);

export function MobileNav() {
  const pathname = usePathname();
  return <><button type="button" aria-label="Novo lançamento" className="fixed bottom-[76px] right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-6 sm:right-8"><Plus size={20} /></button><nav aria-label="Navegação mobile" className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-center justify-around border-t bg-card/95 px-2 backdrop-blur lg:hidden">{mobileItems.map(({ label, href, icon: Icon }) => { const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href); return <Link key={href} href={href} className={cn("flex min-w-16 flex-col items-center gap-1 rounded-lg px-2 py-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground", active && "font-medium text-foreground")}><Icon size={17} strokeWidth={active ? 2.2 : 1.8} /><span>{label === "Movimentações" ? "Movimentos" : label}</span></Link>; })}</nav></>;
}
