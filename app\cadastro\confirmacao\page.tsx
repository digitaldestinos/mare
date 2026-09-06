import Link from "next/link";
import { AuthShell } from "@/features/auth";

export default function ConfirmationPage() {
  return <AuthShell eyebrow="Quase lÃ¡" title="Confirme seu e-mail" description="Enviamos um link de confirmaÃ§Ã£o para o endereÃ§o informado. Depois, vocÃª poderÃ¡ entrar no MarÃ©."><p className="text-center text-sm leading-6 text-muted-foreground">NÃ£o encontrou a mensagem? Confira sua caixa de spam ou tente criar a conta novamente.</p><Link className="mt-6 block text-center text-sm font-medium hover:underline" href="/login">Voltar para o login</Link></AuthShell>;
}

