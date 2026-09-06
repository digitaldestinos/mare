# MarÃ©

FundaÃ§Ã£o de um SaaS financeiro moderno, modular e preparado para web, PWA, Android e iOS.

## Comandos

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run format:check
```

## ConvenÃ§Ãµes

- DomÃ­nio em `features/`, UI compartilhada em `components/`.
- Dados persistidos somente atravÃ©s de serviÃ§os.
- Entradas externas validadas com Zod.
- Segredos e configuraÃ§Ã£o local apenas em `.env.local`.
- Consulte `docs/ARCHITECTURE.md` antes de criar novos mÃ³dulos.

## AutenticaÃ§Ã£o

Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` a partir de `.env.example`. O Supabase Auth gerencia credenciais e sessÃ£o; a aplicaÃ§Ã£o nunca armazena senhas. As rotas pÃºblicas de autenticaÃ§Ã£o ficam em `/login`, `/cadastro`, `/esqueci-senha` e `/redefinir-senha`; `/dashboard` exige sessÃ£o e permanece vazio nesta sprint.

