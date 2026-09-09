-- Review Engine — Supabase schema (run this in the Supabase SQL editor)

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  business_name text not null,
  business_description text not null,
  google_review_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  review_text text not null,
  created_at timestamptz not null default now()
);

-- Tags the customer selected for this review (e.g. Food, Service). Kept as
-- text so dashboards can report how often each tag is praised (4-5 stars) vs
-- criticized (1-3 stars) without a lookup join.
alter table public.reviews add column if not exists tags text[];

create index if not exists reviews_client_id_idx on public.reviews (client_id);

-- RLS
alter table public.clients enable row level security;
alter table public.reviews enable row level security;

-- Anyone (anonymous visitors on the public review page) can read client profiles
drop policy if exists "public read clients" on public.clients;
create policy "public read clients"
  on public.clients for select
  using (true);

-- Anyone can record a review. Inserts come through the anon key; admin reads
-- use the service-role key which bypasses RLS.
drop policy if exists "public insert reviews" on public.reviews;
create policy "public insert reviews"
  on public.reviews for insert
  with check (true);

-- Admin reads reviews via the service-role key (RLS-bypassing), so no read
-- policy is required for the anon role.

-- The private `feedback` table was removed: low ratings are now reviews too and
-- go to Google like any other. Drop it if a database from an older schema still
-- has it.
drop table if exists public.feedback;

-- Business owners. One row per Supabase Auth user (admins create them; the
-- password hash lives in auth.users, which Supabase manages).
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,           -- denormalized for easy admin listing
  name text not null,
  max_clients integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Owners may read their own profile (used by the portal).
drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Owner portal reads/writes go through the service-role key with explicit
-- owner_id filters in server code, so no owner-scoped policies are required.

-- Ownership on clients. Existing rows stay NULL = "Unassigned" until an admin
-- assigns an owner. Deleting an owner leaves their clients unassigned.
alter table public.clients add column if not exists owner_id uuid
  references public.profiles(id) on delete set null;

create index if not exists clients_owner_id_idx on public.clients (owner_id);

-- Tags an owner configures per business (e.g. Food, Service, Ambiance). On the
-- public review page 5 random tags are shown and the customer picks which stood
-- out (high ratings) or need work (low ratings); the AI review is written from
-- rating + chosen tags + an optional note.
create table if not exists public.client_tags (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  label text not null,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  unique (client_id, label)
);

create index if not exists client_tags_client_id_idx on public.client_tags (client_id);

alter table public.client_tags enable row level security;

-- Anyone (anonymous visitors on the public review page) can read a client's tags.
-- Owner writes go through the service-role key with an explicit owner check in
-- server code, so no anon write policy is required.
drop policy if exists "public read client_tags" on public.client_tags;
create policy "public read client_tags"
  on public.client_tags for select
  using (true);
