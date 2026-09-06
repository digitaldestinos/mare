# DomÃ­nio financeiro â€” Sprint 4

## Limites

O domÃ­nio financeiro Ã© independente da interface e da persistÃªncia. Esta sprint define entidades, tipos, validaÃ§Ãµes e pontos de extensÃ£o; nÃ£o cria tabelas, clientes Supabase, formulÃ¡rios, telas ou operaÃ§Ãµes CRUD.

## Carteiras

`Wallet` representa o local onde o dinheiro estÃ¡. Cada carteira pertence a um usuÃ¡rio, possui uma Ãºnica moeda e pode ser ativada ou desativada sem perder seu histÃ³rico. O saldo Ã© sempre um nÃºmero nÃ£o negativo.

Tipos suportados: conta corrente, carteira digital, dinheiro, carteira internacional e outro.

## MovimentaÃ§Ãµes

`Transaction` pertence obrigatoriamente a uma carteira e usa `amount` positivo. O sentido financeiro Ã© expresso por `type`, nunca pelo sinal do valor: `income`, `expense`, `transfer`, `adjustment` ou `refund`. O status Ã© `pending`, `confirmed` ou `cancelled`.

## Categorias

Categorias padrÃ£o sÃ£o imutÃ¡veis conceitualmente e identificadas por `key`. Categorias personalizadas terÃ£o `user_id` preenchido; categorias padrÃ£o podem ser compartilhadas com `user_id` nulo. A lista inicial estÃ¡ em `features/transactions/categories.ts`.

## Modelos futuros

`RecurringTransaction`, `FinancialCard` e `FinancialGoal` estÃ£o tipados e validados para preservar decisÃµes de modelagem, mas nÃ£o participam de nenhum fluxo. Os serviÃ§os `RecurringService`, `CardService` e `FutureGoalService` permanecem vazios.

## Invariantes

- Valores monetÃ¡rios nunca sÃ£o negativos.
- Toda movimentaÃ§Ã£o tem uma carteira.
- Toda carteira tem uma moeda.
- Um usuÃ¡rio pode ter vÃ¡rias carteiras.
- Receita e despesa sÃ£o diferenciadas pelo tipo.
- Senhas, autenticaÃ§Ã£o e persistÃªncia nÃ£o pertencem a este domÃ­nio.

## OrganizaÃ§Ã£o

Entidades ficam em `types/finance.ts`, inputs em `types/finance-inputs.ts`, schemas junto Ã s features e serviÃ§os em `services/finance/`. Essa separaÃ§Ã£o permite conectar persistÃªncia em uma sprint posterior sem alterar os contratos visuais.

