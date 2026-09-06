import Link from "next/link";
import { AuthShell } from "@/features/auth";

export default function ConfirmationPage() {
  return <AuthShell eyebrow="Quase lá" title="Confirme seu e-mail" description="Enviamos um link de confirmação para o endereço informado. Depois, você poderá entrar no Maré."><p className="text-center text-sm leading-6 text-muted-foreground">Não encontrou a mensagem? Confira sua caixa de spam ou tente criar a conta novamente.</p><Link className="mt-6 block text-center text-sm font-medium hover:underline" href="/login">Voltar para o login</Link></AuthShell>;
}
