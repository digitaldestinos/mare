# Modelo de dados — Supabase

O banco será PostgreSQL via Supabase. Esta fase define o modelo lógico; não há migrations nem tabelas aplicadas.

## Entidades

### `profiles`

Extensão 1:1 de `auth.users`. Guarda nome, avatar, locale, timezone e timestamps. O usuário só pode ler e alterar o próprio perfil.

### `accounts`

Contas financeiras do usuário: corrente, poupança, dinheiro, investimento ou outra. Possui moeda BRL, saldo inicial, arquivamento lógico e timestamps.

### `categories`

Categorias de receita ou despesa. Existem categorias globais (`user_id` nulo) e categorias privadas por usuário.

### `transactions`

Lançamentos vinculados a uma conta. `amount` deve ser inteiro em centavos para evitar erro de ponto flutuante. Transferências devem ser representadas por um identificador de grupo (`transfer_id`) e duas linhas balanceadas.

### `audit_events`

Registro append-only de ações relevantes: usuário, ação, entidade, id da entidade, metadata e timestamp. Nunca deve guardar segredos ou dados financeiros redundantes.

## Relações

`auth.users 1—1 profiles`; `profiles 1—N accounts`; `profiles 1—N transactions`; `accounts 1—N transactions`; `categories 1—N transactions`; `profiles 1—N audit_events`.

## Regras de integridade

- UUID como chave primária.
- `created_at` e `updated_at` em UTC.
- Valores monetários não negativos em centavos; o tipo do lançamento determina o sentido.
- Foreign keys com índices para `user_id`, `account_id`, `occurred_on` e `category_id`.
- Soft archive em contas; exclusão física de lançamentos deverá ser evitada quando houver histórico.

## Segurança

RLS obrigatório em todas as tabelas expostas. A regra base é `auth.uid() = user_id`; tabelas derivadas devem herdar a autorização pela entidade pai. Service role nunca deve chegar ao cliente.
