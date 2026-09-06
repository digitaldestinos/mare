import type { ReactNode } from "react";
import { AppShell, OnboardingGate } from "@/components/layout";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <OnboardingGate><AppShell>{children}</AppShell></OnboardingGate>;
}

