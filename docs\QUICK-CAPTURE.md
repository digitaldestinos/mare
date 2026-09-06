# Registro rápido — Sprint 5

## Fluxo

1. A pessoa digita uma frase curta em `/movimentacoes`.
2. `parseQuickCapture` extrai valor, tipo, categoria e descrição.
3. A interface mostra uma prévia compacta.
4. Categorias desconhecidas usam `Outros` e abrem confirmação explícita.
5. A confirmação chama `TransactionService.recordQuickCapture`.

## Parser

O parser não usa IA. Ele aplica regras determinísticas, com normalização de texto, palavras-chave para receitas e uma tabela de termos para categorias. Exemplos conhecidos têm confiança alta; um gasto sem correspondência de categoria é marcado como confiança média.

O contrato `QuickCaptureResult` separa interpretação da apresentação. Uma futura estratégia de interpretação pode devolver o mesmo contrato sem alterar a página.

## Atalhos e continuidade

- `Enter`: interpretar o texto.
- `Esc`: cancelar prévia ou confirmação e limpar o campo.
- `Ctrl+L` / `⌘L`: voltar o foco para o campo.
- Após confirmar, o campo é limpo e recebe foco novamente.

## Persistência

Nesta sprint, o serviço usa armazenamento em memória apenas como adaptador temporário para validar o fluxo vertical. Não há banco, Supabase ou migração financeira conectada. O ponto de substituição está isolado em `services/finance/transaction.service.ts`.
