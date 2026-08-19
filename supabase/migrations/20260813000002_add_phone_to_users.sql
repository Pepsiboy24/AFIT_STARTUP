-- Add phone number column so students can reach landlords on WhatsApp.
alter table public.users
  add column if not exists phone_number text;
