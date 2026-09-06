# Features

Cada domÃ­nio Ã© isolado em um mÃ³dulo vertical. A convenÃ§Ã£o interna sugerida Ã©:

```text
feature/
â”œâ”€â”€ components/   # UI exclusiva do domÃ­nio
â”œâ”€â”€ hooks/        # comportamento React exclusivo do domÃ­nio
â”œâ”€â”€ schemas/      # contratos Zod de entrada
â”œâ”€â”€ services/     # casos de uso e chamadas ao backend
â”œâ”€â”€ types.ts      # tipos do domÃ­nio
â””â”€â”€ index.ts      # API pÃºblica do mÃ³dulo
```

Componentes compartilhados devem ir para `components/`; regras de negÃ³cio nÃ£o devem vazar para essa camada.

