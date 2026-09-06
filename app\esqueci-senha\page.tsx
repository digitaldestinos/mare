"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/components";
import { AuthShell, FieldError } from "@/features/auth";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/features/auth/schemas/auth.schema";
import { sendPasswordResetEmail } from "@/features/auth/services/auth.service";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });
  async function onSubmit(input: ForgotPasswordInput) {
    const { error } = await sendPasswordResetEmail(input);
    if (error) { setError("root", { message: "NÃ£o foi possÃ­vel enviar o e-mail. Tente novamente." }); return; }
    setSent(true);
  }
  return <AuthShell eyebrow="Acesso seguro" title="Recupere sua senha" description="Informe seu e-mail e enviaremos um link para vocÃª criar uma nova senha.">
    {sent ? <div className="space-y-5 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">âœ“</div><p className="text-sm leading-6 text-muted-foreground">Se existir uma conta para esse e-mail, vocÃª receberÃ¡ as instruÃ§Ãµes em instantes.</p><Link className="block text-sm font-medium hover:underline" href="/login">Voltar para o login</Link></div> : <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate><div><label className="mb-2 block text-sm font-medium" htmlFor="email">E-mail</label><Input id="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" {...register("email")} /><FieldError message={errors.email?.message} /></div>{errors.root && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</p>}<Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? "Enviandoâ€¦" : "Enviar link de recuperaÃ§Ã£o"}</Button><Link className="block text-center text-sm text-muted-foreground hover:text-foreground" href="/login">Voltar para o login</Link></form>}
  </AuthShell>;
}

