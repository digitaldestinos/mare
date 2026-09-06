# Features

Cada domínio é isolado em um módulo vertical. A convenção interna sugerida é:

```text
feature/
├── components/   # UI exclusiva do domínio
├── hooks/        # comportamento React exclusivo do domínio
├── schemas/      # contratos Zod de entrada
├── services/     # casos de uso e chamadas ao backend
├── types.ts      # tipos do domínio
└── index.ts      # API pública do módulo
```

Componentes compartilhados devem ir para `components/`; regras de negócio não devem vazar para essa camada.
