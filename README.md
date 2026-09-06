# Maré

Fundação de um SaaS financeiro moderno, modular e preparado para web, PWA, Android e iOS.

## Comandos

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run format:check
```

## Convenções

- Domínio em `features/`, UI compartilhada em `components/`.
- Dados persistidos somente através de serviços.
- Entradas externas validadas com Zod.
- Segredos e configuração local apenas em `.env.local`.
- Consulte `docs/ARCHITECTURE.md` antes de criar novos módulos.

## Autenticação

Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` a partir de `.env.example`. O Supabase Auth gerencia credenciais e sessão; a aplicação nunca armazena senhas. As rotas públicas de autenticação ficam em `/login`, `/cadastro`, `/esqueci-senha` e `/redefinir-senha`; `/dashboard` exige sessão e permanece vazio nesta sprint.
