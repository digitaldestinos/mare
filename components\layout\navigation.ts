import { CreditCard, LayoutDashboard, Settings, Target, UserRound, WalletCards, type LucideIcon } from "lucide-react";

export type NavigationItem = { label: string; href: string; icon: LucideIcon };

export const navigationItems: NavigationItem[] = [
  { label: "Hoje", href: "/dashboard", icon: LayoutDashboard },
  { label: "MovimentaÃ§Ãµes", href: "/movimentacoes", icon: CreditCard },
  { label: "Carteiras", href: "/carteiras", icon: WalletCards },
  { label: "Objetivos", href: "/objetivos", icon: Target },
  { label: "Perfil", href: "/perfil", icon: UserRound },
  { label: "ConfiguraÃ§Ãµes", href: "/configuracoes", icon: Settings },
];

