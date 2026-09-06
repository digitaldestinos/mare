"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLoading, useAuth } from "@/features/auth";
import { walletService } from "@/services/finance/wallet.service";

export function OnboardingGate({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    if (isLoading) return;
    if (!user) { setChecking(false); return; }
    if (walletService.list(user.id).length === 0) router.replace("/onboarding");
    else setChecking(false);
  }, [isLoading, router, user]);
  if (isLoading || checking) return <AuthLoading />;
  return <>{children}</>;
}

