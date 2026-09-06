"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthLoading, useAuth } from "@/features/auth";
import { useWallets } from "@/hooks/use-wallets";

export function OnboardingGate({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { data: wallets, isLoading: walletsLoading, isError, refetch } = useWallets(user?.id);
  useEffect(() => {
    if (isLoading) return;
    if (!user || walletsLoading) return;
    if (wallets?.length === 0) router.replace("/onboarding");
  }, [isLoading, router, user, wallets, walletsLoading]);
  if (isLoading || walletsLoading) return <AuthLoading />;
  if (isError) return <div className="flex min-h-screen items-center justify-center p-6 text-center"><div><p className="text-sm text-destructive">Não foi possível carregar seus dados.</p><button className="mt-3 text-sm underline" onClick={() => refetch()}>Tentar novamente</button></div></div>;
  return <>{children}</>;
}
