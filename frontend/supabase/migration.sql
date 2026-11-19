-- ============================================================================
-- Wayfera / Dahab Hostel — Full Supabase Migration
-- Run in Supabase SQL Editor (project: gckokgjotdwfhfxplbwj)
-- Covers: all data tables, auth (profiles), storage (media), RLS policies
-- ============================================================================

-- ============================================================================
-- 0. EXTENSIONS
-- ============================================================================
create extension if not exists "uuid-ossp";

-- ============================================================================
-- 1. AUTH — user profiles linked to auth.users
-- ============================================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  role text not null default 'guest' check (role in ('guest', 'admin', 'staff')),
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Centralized admin predicate. SECURITY DEFINER avoids recursive evaluation of
-- the profiles table's own RLS policies. Keep the search path fixed/empty.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $function$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
  );
$function$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- A row-ownership policy alone does not protect privileged columns such as role.
create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
begin
  if new.role is distinct from old.role
    and coalesce(auth.role(), '') <> 'service_role'
    and not public.is_admin() then
    raise exception 'Only an administrator can change profile roles'
      using errcode = '42501';
  end if;
  return new;
end;
$function$;

revoke all on function public.prevent_profile_role_escalation() from public;
drop trigger if exists profiles_role_guard on public.profiles;
create trigger profiles_role_guard
  before update of role on public.profiles
  for each row execute function public.prevent_profile_role_escalation();

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    public.is_admin()
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 2. ROOMS
-- ============================================================================
create table if not exists public.rooms (
  id bigint generated always as identity primary key,
  name text not null,
  slug text unique not null,
  price_egp int not null,
  price_label text not null,
  description text,
  category text not null check (category in ('dorm', 'private')),
  capacity int default 1,
  amenities text[] default '{}',
  image_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.rooms enable row level security;

create policy "Anyone can read rooms"
  on public.rooms for select to anon, authenticated
  using (true);

create policy "Admins can manage rooms"
  on public.rooms for all
  using (
    public.is_admin()
  );

-- ============================================================================
-- 3. TOURS
-- ============================================================================
create table if not exists public.tours (
  id bigint generated always as identity primary key,
  slug text unique not null,
  title text not null,
  card_title text,
  category text not null check (category in ('history', 'adventure', 'leisure')),
  duration text,
  description text,
  image_url text,
  highlights text[] default '{}',
  inclusions text[] default '{}',
  exclusions text[] default '{}',
  notes text[] default '{}',
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tours enable row level security;

create policy "Anyone can read tours"
  on public.tours for select to anon, authenticated
  using (true);

create policy "Admins can manage tours"
  on public.tours for all
  using (
    public.is_admin()
  );

-- ============================================================================
-- 3a. TOUR ITINERARY (child of tours)
-- ============================================================================
create table if not exists public.tour_itinerary (
  id bigint generated always as identity primary key,
  tour_id bigint not null references public.tours(id) on delete cascade,
  day_label text not null,
  description text not null,
  sort_order int default 0
);

alter table public.tour_itinerary enable row level security;

create policy "Anyone can read tour itinerary"
  on public.tour_itinerary for select to anon, authenticated
  using (true);

create policy "Admins can manage tour itinerary"
  on public.tour_itinerary for all
  using (
    public.is_admin()
  );

-- ============================================================================
-- 3b. TOUR GALLERY (child of tours)
-- ============================================================================
create table if not exists public.tour_gallery (
  id bigint generated always as identity primary key,
  tour_id bigint not null references public.tours(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order int default 0
);

alter table public.tour_gallery enable row level security;

create policy "Anyone can read tour gallery"
  on public.tour_gallery for select to anon, authenticated
  using (true);

create policy "Admins can manage tour gallery"
  on public.tour_gallery for all
  using (
    public.is_admin()
  );

-- ============================================================================
-- 4. ENTRANCE FEES
-- ============================================================================
create table if not exists public.fee_groups (
  id bigint generated always as identity primary key,
  group_name text not null,
  tagline text,
  note text,
  sort_order int default 0
);

create table if not exists public.fee_items (
  id bigint generated always as identity primary key,
  group_id bigint not null references public.fee_groups(id) on delete cascade,
  site_name text not null,
  price text not null,
  is_addon boolean default false,
  sort_order int default 0
);

alter table public.fee_groups enable row level security;
alter table public.fee_items enable row level security;

create policy "Anyone can read fee_groups" on public.fee_groups for select to anon, authenticated using (true);
create policy "Anyone can read fee_items" on public.fee_items for select to anon, authenticated using (true);
create policy "Admins can manage fee_groups" on public.fee_groups for all using (public.is_admin());
create policy "Admins can manage fee_items" on public.fee_items for all using (public.is_admin());

-- ============================================================================
-- 5. GALLERY / PHOTOS
-- ============================================================================
create table if not exists public.gallery (
  id bigint generated always as identity primary key,
  image_url text not null,
  caption text,
  group_tag text check (group_tag in ('room', 'terrace', 'tour', 'general')),
  sort_order int default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery enable row level security;

create policy "Anyone can read gallery" on public.gallery for select to anon, authenticated using (true);
create policy "Admins can manage gallery" on public.gallery for all using (public.is_admin());

-- ============================================================================
-- 6. BLOG POSTS
-- ============================================================================
create table if not exists public.blog_posts (
  id bigint generated always as identity primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  image_url text,
  author_id uuid references public.profiles(id),
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Anyone can read published blog posts"
  on public.blog_posts for select to anon, authenticated
  using (is_published = true);

create policy "Admins can manage blog posts"
  on public.blog_posts for all
  using (public.is_admin());

-- ============================================================================
-- 7. REVIEWS
-- ============================================================================
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  author_name text not null,
  author_email text,
  user_id uuid references public.profiles(id),
  rating int check (rating between 1 and 5),
  title text,
  body text not null,
  is_approved boolean default false,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create policy "Anyone can read approved reviews"
  on public.reviews for select to anon, authenticated
  using (is_approved = true);

create policy "Authenticated users can insert reviews"
  on public.reviews for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Anon can insert reviews"
  on public.reviews for insert to anon
  with check (true);

create policy "Admins can manage reviews"
  on public.reviews for all
  using (public.is_admin());

-- ============================================================================
-- 8. SITE SETTINGS (key-value config store)
-- ============================================================================
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Anyone can read site settings"
  on public.site_settings for select to anon, authenticated
  using (true);

create policy "Admins can manage site settings"
  on public.site_settings for all
  using (public.is_admin());

-- ============================================================================
-- 9. EXISTING FORM TABLES (keep from schema.sql, adding missing policies)
-- ============================================================================

-- contact_messages
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
do $$ begin
  create policy "anon can insert contact_messages" on public.contact_messages for insert to anon with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Admins can read contact_messages" on public.contact_messages for select using (public.is_admin());
exception when duplicate_object then null;
end $$;

-- tour_requests
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
alter table public.tour_requests enable row level security;
do $$ begin
  create policy "anon can insert tour_requests" on public.tour_requests for insert to anon with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Admins can read tour_requests" on public.tour_requests for select using (public.is_admin());
exception when duplicate_object then null;
end $$;

-- booking_requests
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
alter table public.booking_requests enable row level security;
do $$ begin
  create policy "anon can insert booking_requests" on public.booking_requests for insert to anon with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Admins can read booking_requests" on public.booking_requests for select using (public.is_admin());
exception when duplicate_object then null;
end $$;

-- airport_pickups
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
alter table public.airport_pickups enable row level security;
do $$ begin
  create policy "anon can insert airport_pickups" on public.airport_pickups for insert to anon with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "Admins can read airport_pickups" on public.airport_pickups for select using (public.is_admin());
exception when duplicate_object then null;
end $$;

-- ============================================================================
-- 10. STORAGE BUCKETS
-- ============================================================================

-- Create storage buckets for media
insert into storage.buckets (id, name, public) values ('media', 'media', true)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

-- Storage policies: anyone can read public media
create policy "Public media read access"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Public avatars read access"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Authenticated users can upload to avatars
create policy "Authenticated users can upload avatars"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Admins can upload to media bucket
create policy "Admins can upload media"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'media' and
    public.is_admin()
  );

create policy "Admins can update media"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'media' and
    public.is_admin()
  );

create policy "Admins can delete media"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'media' and
    public.is_admin()
  );

-- ============================================================================
-- 11. UPDATED_AT TRIGGERS
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger rooms_updated_at before update on public.rooms
  for each row execute function public.set_updated_at();

create trigger tours_updated_at before update on public.tours
  for each row execute function public.set_updated_at();

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger blog_posts_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();

create trigger site_settings_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();
