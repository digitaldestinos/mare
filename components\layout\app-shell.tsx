import type { ReactNode } from "react";
import { Header } from "./header";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="flex min-h-screen bg-background"><Sidebar /><div className="flex min-w-0 flex-1 flex-col"><Header /><main className="flex-1 overflow-x-hidden px-5 py-7 pb-24 sm:px-8 lg:px-10 lg:py-9 lg:pb-10">{children}</main></div><MobileNav /></div>;
}

