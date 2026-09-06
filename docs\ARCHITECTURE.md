# Arquitetura

## Camadas

`app/` contém composição de rotas e layout do Next.js. `features/` contém módulos verticais de domínio. `components/` contém UI compartilhada. `services/` contém integrações e casos de uso compartilhados. `lib/` contém infraestrutura (clientes, ambiente e utilitários base). `types/` contém contratos estáveis. `utils/` contém funções puras. `docs/` registra decisões.

## Dependências permitidas

Fluxo preferencial: `app → features → services → lib`. UI compartilhada pode ser usada por `app` e `features`; `lib` não deve importar componentes. Um módulo de feature não deve importar internals de outro módulo: exponha uma API pública em `index.ts`.

## Dados e estado

Supabase será a fonte de verdade persistida. TanStack Query cuidará de cache, invalidação e estados assíncronos. React Hook Form + Zod cuidarão dos formulários e contratos de entrada. Estado visual local deve permanecer local; não introduzir store global antes de um caso concreto.

## Design system

Os tokens vivem em `styles/globals.css` como variáveis semânticas HSL, consumidas pelo Tailwind. A paleta é neutra quente com azul-marinho como ação primária e verde-petróleo como acento. Tipografia usa a pilha nativa do sistema para performance e aparência consistente. Espaçamento segue escala de 4px; radius base de 12px; sombras suaves e discretas. Primitivos iniciais estão em `components/ui`.

## Qualidade

TypeScript estrito, ESLint, Prettier, validação de ambiente, componentes acessíveis e testes de domínio antes de qualquer tela crítica. Pull requests devem ser pequenos, com documentação de decisões que alterem o modelo ou os limites dos módulos.

## Plataformas

O App Router será a base web. A camada de domínio e serviços deve permanecer independente da UI para permitir uma futura shell PWA e clientes nativos sem duplicar regras financeiras.
