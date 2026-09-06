# Registro rÃ¡pido â€” Sprint 5

## Fluxo

1. A pessoa digita uma frase curta em `/movimentacoes`.
2. `parseQuickCapture` extrai valor, tipo, categoria e descriÃ§Ã£o.
3. A interface mostra uma prÃ©via compacta.
4. Categorias desconhecidas usam `Outros` e abrem confirmaÃ§Ã£o explÃ­cita.
5. A confirmaÃ§Ã£o chama `TransactionService.recordQuickCapture`.

## Parser

O parser nÃ£o usa IA. Ele aplica regras determinÃ­sticas, com normalizaÃ§Ã£o de texto, palavras-chave para receitas e uma tabela de termos para categorias. Exemplos conhecidos tÃªm confianÃ§a alta; um gasto sem correspondÃªncia de categoria Ã© marcado como confianÃ§a mÃ©dia.

O contrato `QuickCaptureResult` separa interpretaÃ§Ã£o da apresentaÃ§Ã£o. Uma futura estratÃ©gia de interpretaÃ§Ã£o pode devolver o mesmo contrato sem alterar a pÃ¡gina.

## Atalhos e continuidade

- `Enter`: interpretar o texto.
- `Esc`: cancelar prÃ©via ou confirmaÃ§Ã£o e limpar o campo.
- `Ctrl+L` / `âŒ˜L`: voltar o foco para o campo.
- ApÃ³s confirmar, o campo Ã© limpo e recebe foco novamente.

## PersistÃªncia

Nesta sprint, o serviÃ§o usa armazenamento em memÃ³ria apenas como adaptador temporÃ¡rio para validar o fluxo vertical. NÃ£o hÃ¡ banco, Supabase ou migraÃ§Ã£o financeira conectada. O ponto de substituiÃ§Ã£o estÃ¡ isolado em `services/finance/transaction.service.ts`.

