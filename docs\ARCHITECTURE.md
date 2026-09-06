# Arquitetura

## Camadas

`app/` contÃ©m composiÃ§Ã£o de rotas e layout do Next.js. `features/` contÃ©m mÃ³dulos verticais de domÃ­nio. `components/` contÃ©m UI compartilhada. `services/` contÃ©m integraÃ§Ãµes e casos de uso compartilhados. `lib/` contÃ©m infraestrutura (clientes, ambiente e utilitÃ¡rios base). `types/` contÃ©m contratos estÃ¡veis. `utils/` contÃ©m funÃ§Ãµes puras. `docs/` registra decisÃµes.

## DependÃªncias permitidas

Fluxo preferencial: `app â†’ features â†’ services â†’ lib`. UI compartilhada pode ser usada por `app` e `features`; `lib` nÃ£o deve importar componentes. Um mÃ³dulo de feature nÃ£o deve importar internals de outro mÃ³dulo: exponha uma API pÃºblica em `index.ts`.

## Dados e estado

Supabase serÃ¡ a fonte de verdade persistida. TanStack Query cuidarÃ¡ de cache, invalidaÃ§Ã£o e estados assÃ­ncronos. React Hook Form + Zod cuidarÃ£o dos formulÃ¡rios e contratos de entrada. Estado visual local deve permanecer local; nÃ£o introduzir store global antes de um caso concreto.

## Design system

Os tokens vivem em `styles/globals.css` como variÃ¡veis semÃ¢nticas HSL, consumidas pelo Tailwind. A paleta Ã© neutra quente com azul-marinho como aÃ§Ã£o primÃ¡ria e verde-petrÃ³leo como acento. Tipografia usa a pilha nativa do sistema para performance e aparÃªncia consistente. EspaÃ§amento segue escala de 4px; radius base de 12px; sombras suaves e discretas. Primitivos iniciais estÃ£o em `components/ui`.

## Qualidade

TypeScript estrito, ESLint, Prettier, validaÃ§Ã£o de ambiente, componentes acessÃ­veis e testes de domÃ­nio antes de qualquer tela crÃ­tica. Pull requests devem ser pequenos, com documentaÃ§Ã£o de decisÃµes que alterem o modelo ou os limites dos mÃ³dulos.

## Plataformas

O App Router serÃ¡ a base web. A camada de domÃ­nio e serviÃ§os deve permanecer independente da UI para permitir uma futura shell PWA e clientes nativos sem duplicar regras financeiras.

