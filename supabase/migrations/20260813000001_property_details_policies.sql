-- Allow authenticated users to read landlord profiles so the property
-- details page can display the landlord's name and contact email via the
-- `landlord:users(full_name, email)` join.

drop policy if exists "users select landlord profiles" on public.users;
create policy "users select landlord profiles"
  on public.users for select
  using (auth.uid() is not null and role = 'landlord');
