# Modelo de dados â€” Supabase

O banco serÃ¡ PostgreSQL via Supabase. Esta fase define o modelo lÃ³gico; nÃ£o hÃ¡ migrations nem tabelas aplicadas.

## Entidades

### `profiles`

ExtensÃ£o 1:1 de `auth.users`. Guarda nome, avatar, locale, timezone e timestamps. O usuÃ¡rio sÃ³ pode ler e alterar o prÃ³prio perfil.

### `accounts`

Contas financeiras do usuÃ¡rio: corrente, poupanÃ§a, dinheiro, investimento ou outra. Possui moeda BRL, saldo inicial, arquivamento lÃ³gico e timestamps.

### `categories`

Categorias de receita ou despesa. Existem categorias globais (`user_id` nulo) e categorias privadas por usuÃ¡rio.

### `transactions`

LanÃ§amentos vinculados a uma conta. `amount` deve ser inteiro em centavos para evitar erro de ponto flutuante. TransferÃªncias devem ser representadas por um identificador de grupo (`transfer_id`) e duas linhas balanceadas.

### `audit_events`

Registro append-only de aÃ§Ãµes relevantes: usuÃ¡rio, aÃ§Ã£o, entidade, id da entidade, metadata e timestamp. Nunca deve guardar segredos ou dados financeiros redundantes.

## RelaÃ§Ãµes

`auth.users 1â€”1 profiles`; `profiles 1â€”N accounts`; `profiles 1â€”N transactions`; `accounts 1â€”N transactions`; `categories 1â€”N transactions`; `profiles 1â€”N audit_events`.

## Regras de integridade

- UUID como chave primÃ¡ria.
- `created_at` e `updated_at` em UTC.
- Valores monetÃ¡rios nÃ£o negativos em centavos; o tipo do lanÃ§amento determina o sentido.
- Foreign keys com Ã­ndices para `user_id`, `account_id`, `occurred_on` e `category_id`.
- Soft archive em contas; exclusÃ£o fÃ­sica de lanÃ§amentos deverÃ¡ ser evitada quando houver histÃ³rico.

## SeguranÃ§a

RLS obrigatÃ³rio em todas as tabelas expostas. A regra base Ã© `auth.uid() = user_id`; tabelas derivadas devem herdar a autorizaÃ§Ã£o pela entidade pai. Service role nunca deve chegar ao cliente.

