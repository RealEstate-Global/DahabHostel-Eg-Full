-- Dahab Hostel — tables used by the site forms.
-- Run this in the Supabase SQL editor for project gckokgjotdwfhfxplbwj.

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.tour_requests (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  guests int,
  period text,
  destinations text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.booking_requests (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  room text,
  check_in date,
  check_out date,
  guests int,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.airport_pickups (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text,
  airport text,
  arrival_date text,
  arrival_time text,
  flight_no text,
  persons int default 1,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
alter table public.tour_requests enable row level security;
alter table public.booking_requests enable row level security;
alter table public.airport_pickups enable row level security;

create policy "anon can insert contact_messages" on public.contact_messages
  for insert to anon with check (true);
create policy "anon can insert tour_requests" on public.tour_requests
  for insert to anon with check (true);
create policy "anon can insert booking_requests" on public.booking_requests
  for insert to anon with check (true);
create policy "anon can insert airport_pickups" on public.airport_pickups
  for insert to anon with check (true);
