"use client";

import Link from "next/link";
import { LogOut, Waves } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth";
import { signOut } from "@/features/auth/services/auth.service";
import { cn } from "@/lib/utils";
import { navigationItems } from "./navigation";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name ?? "Sua conta";
  const email = user?.email ?? "";
  const initials = name.split(" ").map((part: string) => part[0]).join("").slice(0, 2).toUpperCase();

  async function handleSignOut() {
    await signOut();
    window.location.assign("/login");
  }

  return (
    <aside className="hidden h-screen w-[248px] shrink-0 flex-col border-r bg-card/80 px-3 py-4 lg:flex">
      <Link href="/dashboard" className="mb-8 flex items-center gap-2.5 px-3 text-[15px] font-semibold tracking-tight">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-primary text-primary-foreground"><Waves size={15} strokeWidth={2.2} /></span>
        Maré
      </Link>
      <nav aria-label="Navegação principal" className="space-y-1">
        {navigationItems.map(({ label, href, icon: Icon }) => {
          const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
          return <Link key={href} href={href} className={cn("group flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground", active && "bg-secondary font-medium text-foreground shadow-sm")}><Icon size={17} strokeWidth={active ? 2.1 : 1.8} /><span>{label}</span></Link>;
        })}
      </nav>
      <div className="mt-auto border-t pt-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">{initials}</div>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{name}</p><p className="truncate text-xs text-muted-foreground">{email}</p></div>
          <button type="button" title="Sair" aria-label="Sair" onClick={handleSignOut} className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><LogOut size={16} /></button>
        </div>
      </div>
    </aside>
  );
}
