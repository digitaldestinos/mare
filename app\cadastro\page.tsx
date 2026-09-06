"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components";
import { AuthShell, FieldError } from "@/features/auth";
import { signUpSchema, type SignUpInput } from "@/features/auth/schemas/auth.schema";
import { signUp } from "@/features/auth/services/auth.service";

export default function SignUpPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });
  async function onSubmit(input: SignUpInput) {
    const { data, error } = await signUp(input);
    if (error) { setError("root", { message: "NÃ£o foi possÃ­vel criar sua conta. Tente novamente." }); return; }
    if (data.session) { router.replace("/dashboard"); router.refresh(); } else { router.replace("/cadastro/confirmacao"); }
  }
  return <AuthShell eyebrow="Comece com calma" title="Crie sua conta" description="Um espaÃ§o simples para organizar sua vida financeira.">
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div><label className="mb-2 block text-sm font-medium" htmlFor="name">Nome</label><Input id="name" autoComplete="name" placeholder="Seu nome" {...register("name")} /><FieldError message={errors.name?.message} /></div>
      <div><label className="mb-2 block text-sm font-medium" htmlFor="email">E-mail</label><Input id="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" {...register("email")} /><FieldError message={errors.email?.message} /></div>
      <div><label className="mb-2 block text-sm font-medium" htmlFor="password">Senha</label><Input id="password" type="password" autoComplete="new-password" placeholder="MÃ­nimo de 8 caracteres" {...register("password")} /><FieldError message={errors.password?.message} /></div>
      <div><label className="mb-2 block text-sm font-medium" htmlFor="confirmPassword">Confirmar senha</label><Input id="confirmPassword" type="password" autoComplete="new-password" placeholder="Repita sua senha" {...register("confirmPassword")} /><FieldError message={errors.confirmPassword?.message} /></div>
      {errors.root && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</p>}
      <Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? "Criando contaâ€¦" : "Criar conta"}</Button>
      <p className="text-center text-sm text-muted-foreground">JÃ¡ tem uma conta? <Link className="font-medium text-foreground hover:underline" href="/login">Entrar</Link></p>
    </form>
  </AuthShell>;
}

