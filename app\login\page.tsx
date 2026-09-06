"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components";
import { AuthShell, FieldError } from "@/features/auth";
import { loginSchema, type LoginInput } from "@/features/auth/schemas/auth.schema";
import { signIn } from "@/features/auth/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
  async function onSubmit(input: LoginInput) {
    const { error } = await signIn(input);
    if (error) { setError("root", { message: "Não foi possível entrar. Confira seu e-mail e senha." }); return; }
    router.replace("/dashboard");
    router.refresh();
  }
  return <AuthShell eyebrow="Bem-vindo de volta" title="Entre no Maré" description="Acompanhe suas finanças com mais clareza e tranquilidade.">
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div><label className="mb-2 block text-sm font-medium" htmlFor="email">E-mail</label><Input id="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" {...register("email")} /><FieldError message={errors.email?.message} /></div>
      <div><div className="mb-2 flex items-center justify-between"><label className="block text-sm font-medium" htmlFor="password">Senha</label><Link className="text-xs font-medium text-muted-foreground hover:text-foreground" href="/esqueci-senha">Esqueci minha senha</Link></div><Input id="password" type="password" autoComplete="current-password" placeholder="Sua senha" {...register("password")} /><FieldError message={errors.password?.message} /></div>
      {errors.root && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</p>}
      <Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? "Entrando…" : "Entrar"}</Button>
      <p className="text-center text-sm text-muted-foreground">Ainda não tem uma conta? <Link className="font-medium text-foreground hover:underline" href="/cadastro">Criar conta</Link></p>
    </form>
  </AuthShell>;
}
