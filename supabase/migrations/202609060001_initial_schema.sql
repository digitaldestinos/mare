create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, avatar_url text, timezone text not null default 'UTC', locale text not null default 'pt-BR',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0), type text not null check (type in ('checking','digital','cash','international','other')),
  currency text not null check (currency in ('BRL','USD','EUR','GBP')), balance numeric(14,2) not null default 0 check (balance >= 0), active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) > 0), type text not null check (type in ('income','expense','transfer','adjustment','refund')),
  is_default boolean not null default false, active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  wallet_id uuid not null references public.wallets(id) on delete restrict, category_id uuid references public.categories(id) on delete set null,
  type text not null check (type in ('income','expense','transfer','adjustment','refund')), description text not null check (char_length(trim(description)) > 0),
  amount numeric(14,2) not null check (amount > 0), currency text not null check (currency in ('BRL','USD','EUR','GBP')),
  status text not null default 'confirmed' check (status in ('pending','confirmed','cancelled')), date timestamptz not null default now(), notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at() returns trigger language plpgsql security invoker set search_path = public as $$ begin new.updated_at = now(); return new; end; $$;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data ->> 'full_name') on conflict (id) do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
do $$ declare table_name text; begin foreach table_name in array array['profiles','wallets','categories','transactions'] loop execute format('drop trigger if exists %I_set_updated_at on public.%I', table_name, table_name); execute format('create trigger %I_set_updated_at before update on public.%I for each row execute procedure public.set_updated_at()', table_name, table_name); end loop; end $$;

insert into public.categories (id, name, type, is_default) values
 ('00000000-0000-0000-0000-000000000101','Alimentação','expense',true), ('00000000-0000-0000-0000-000000000102','Transporte','expense',true),
 ('00000000-0000-0000-0000-000000000103','Mercado','expense',true), ('00000000-0000-0000-0000-000000000104','Saúde','expense',true),
 ('00000000-0000-0000-0000-000000000105','Assinaturas','expense',true), ('00000000-0000-0000-0000-000000000106','Celular','expense',true),
 ('00000000-0000-0000-0000-000000000107','Receitas','income',true)
on conflict (id) do nothing;

create index if not exists wallets_user_id_idx on public.wallets(user_id);
create index if not exists categories_user_id_idx on public.categories(user_id);
create index if not exists transactions_user_date_idx on public.transactions(user_id, date desc);
create index if not exists transactions_wallet_date_idx on public.transactions(wallet_id, date desc);
create index if not exists transactions_category_id_idx on public.transactions(category_id);

alter table public.profiles enable row level security; alter table public.wallets enable row level security; alter table public.categories enable row level security; alter table public.transactions enable row level security;
create policy "profiles own rows" on public.profiles for all using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "wallets own rows" on public.wallets for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "categories readable" on public.categories for select using (user_id is null or (select auth.uid()) = user_id);
create policy "categories own rows" on public.categories for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "transactions own rows" on public.transactions for all using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id and exists (select 1 from public.wallets w where w.id = wallet_id and w.user_id = (select auth.uid())));
