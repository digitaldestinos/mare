# Domínio financeiro — Sprint 4

## Limites

O domínio financeiro é independente da interface e da persistência. Esta sprint define entidades, tipos, validações e pontos de extensão; não cria tabelas, clientes Supabase, formulários, telas ou operações CRUD.

## Carteiras

`Wallet` representa o local onde o dinheiro está. Cada carteira pertence a um usuário, possui uma única moeda e pode ser ativada ou desativada sem perder seu histórico. O saldo é sempre um número não negativo.

Tipos suportados: conta corrente, carteira digital, dinheiro, carteira internacional e outro.

## Movimentações

`Transaction` pertence obrigatoriamente a uma carteira e usa `amount` positivo. O sentido financeiro é expresso por `type`, nunca pelo sinal do valor: `income`, `expense`, `transfer`, `adjustment` ou `refund`. O status é `pending`, `confirmed` ou `cancelled`.

## Categorias

Categorias padrão são imutáveis conceitualmente e identificadas por `key`. Categorias personalizadas terão `user_id` preenchido; categorias padrão podem ser compartilhadas com `user_id` nulo. A lista inicial está em `features/transactions/categories.ts`.

## Modelos futuros

`RecurringTransaction`, `FinancialCard` e `FinancialGoal` estão tipados e validados para preservar decisões de modelagem, mas não participam de nenhum fluxo. Os serviços `RecurringService`, `CardService` e `FutureGoalService` permanecem vazios.

## Invariantes

- Valores monetários nunca são negativos.
- Toda movimentação tem uma carteira.
- Toda carteira tem uma moeda.
- Um usuário pode ter várias carteiras.
- Receita e despesa são diferenciadas pelo tipo.
- Senhas, autenticação e persistência não pertencem a este domínio.

## Organização

Entidades ficam em `types/finance.ts`, inputs em `types/finance-inputs.ts`, schemas junto às features e serviços em `services/finance/`. Essa separação permite conectar persistência em uma sprint posterior sem alterar os contratos visuais.
