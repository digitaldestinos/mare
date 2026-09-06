"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components";
import { AuthShell, FieldError } from "@/features/auth";
import { resetPasswordSchema, type ResetPasswordInput } from "@/features/auth/schemas/auth.schema";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) });
  async function onSubmit(input: ResetPasswordInput) {
    const { error } = await createClient().auth.updateUser({ password: input.password });
    if (error) { setError("root", { message: "Não foi possível atualizar sua senha. Solicite um novo link." }); return; }
    await createClient().auth.signOut();
    router.replace("/login");
  }
  return <AuthShell eyebrow="Acesso seguro" title="Crie uma nova senha" description="Escolha uma senha forte para continuar usando o Maré."><form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate><div><label className="mb-2 block text-sm font-medium" htmlFor="password">Nova senha</label><Input id="password" type="password" autoComplete="new-password" placeholder="Mínimo de 8 caracteres" {...register("password")} /><FieldError message={errors.password?.message} /></div><div><label className="mb-2 block text-sm font-medium" htmlFor="confirmPassword">Confirmar senha</label><Input id="confirmPassword" type="password" autoComplete="new-password" placeholder="Repita sua senha" {...register("confirmPassword")} /><FieldError message={errors.confirmPassword?.message} /></div>{errors.root && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</p>}<Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? "Salvando…" : "Salvar nova senha"}</Button></form></AuthShell>;
}
