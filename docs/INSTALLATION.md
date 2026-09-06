# Instalação e deploy

## Requisitos

- Node.js 20.9 ou superior
- Um projeto Supabase
- Uma conta Vercel para produção

## Desenvolvimento local

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env.local`.
3. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` com as credenciais públicas do projeto Supabase.
4. Execute `supabase/migrations/202609060001_initial_schema.sql` no SQL Editor do Supabase (ou use `supabase db push` com a CLI configurada).
5. Em Authentication > URL Configuration, defina a URL local e inclua `/auth/callback` nas Redirect URLs.
6. Rode `npm run dev`.

## Verificação

`npm run lint`, `npm run typecheck`, `npm run build` e `npm run format:check` devem passar antes de publicar.

## Vercel

Configure as mesmas duas variáveis públicas no ambiente Production e adicione o domínio da Vercel às URLs permitidas do Supabase. O projeto não usa service role no navegador; a proteção dos dados depende das políticas RLS da migration.
