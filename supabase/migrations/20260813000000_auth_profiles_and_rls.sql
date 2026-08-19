-- AFIT Off-K Link: auth profiles + RLS policies
-- Run in the Supabase SQL editor, or via `supabase db push`.

-- 1) public.users profile table (mirror of auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null default 'student' check (role in ('student', 'landlord', 'admin')),
  created_at timestamptz not null default now()
);

-- 2) Auto-create a public.users row whenever an auth user signs up.
--    This makes the landlord_id FK (properties -> users) resolvable.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    coalesce(new.raw_user_meta_data ->> 'role', 'student')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3) Backfill rows for users who already signed up before the trigger existed
insert into public.users (id, email, full_name, role)
select
  id,
  email,
  raw_user_meta_data ->> 'full_name',
  coalesce(raw_user_meta_data ->> 'role', 'student')
from auth.users
on conflict (id) do nothing;

-- 4) Enable Row Level Security
alter table public.users enable row level security;
alter table public.properties enable row level security;
alter table public.saved_properties enable row level security;
alter table public.appointments enable row level security;

-- 5) RLS policies

-- public.users: users manage their own profile
drop policy if exists "users select own" on public.users;
create policy "users select own"
  on public.users for select
  using (auth.uid() = id);

drop policy if exists "users insert own" on public.users;
create policy "users insert own"
  on public.users for insert
  with check (auth.uid() = id);

drop policy if exists "users update own" on public.users;
create policy "users update own"
  on public.users for update
  using (auth.uid() = id);

-- public.properties: everyone can read, landlords manage their own listings
drop policy if exists "properties select all" on public.properties;
create policy "properties select all"
  on public.properties for select
  using (true);

drop policy if exists "properties insert own" on public.properties;
create policy "properties insert own"
  on public.properties for insert
  with check (auth.uid() = landlord_id);

drop policy if exists "properties update own" on public.properties;
create policy "properties update own"
  on public.properties for update
  using (auth.uid() = landlord_id);

drop policy if exists "properties delete own" on public.properties;
create policy "properties delete own"
  on public.properties for delete
  using (auth.uid() = landlord_id);

-- public.saved_properties: students manage their own saved listings
drop policy if exists "saved properties select own" on public.saved_properties;
create policy "saved properties select own"
  on public.saved_properties for select
  using (auth.uid() = student_id);

drop policy if exists "saved properties insert own" on public.saved_properties;
create policy "saved properties insert own"
  on public.saved_properties for insert
  with check (auth.uid() = student_id);

drop policy if exists "saved properties delete own" on public.saved_properties;
create policy "saved properties delete own"
  on public.saved_properties for delete
  using (auth.uid() = student_id);

-- public.appointments: students manage their own viewings
drop policy if exists "appointments select own" on public.appointments;
create policy "appointments select own"
  on public.appointments for select
  using (auth.uid() = student_id);

drop policy if exists "appointments insert own" on public.appointments;
create policy "appointments insert own"
  on public.appointments for insert
  with check (auth.uid() = student_id);

drop policy if exists "appointments update own" on public.appointments;
create policy "appointments update own"
  on public.appointments for update
  using (auth.uid() = student_id);

drop policy if exists "appointments delete own" on public.appointments;
create policy "appointments delete own"
  on public.appointments for delete
  using (auth.uid() = student_id);
