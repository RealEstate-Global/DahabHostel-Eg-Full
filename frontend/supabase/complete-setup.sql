-- ============================================================================
-- Wayfera / Dahab Hostel — COMPLETE SETUP (tables + data in one file)
-- Paste this ENTIRE file into Supabase SQL Editor and click RUN
-- Safe to re-run: uses IF NOT EXISTS and ON CONFLICT everywhere
-- ============================================================================

-- ============================================================================
-- 0. EXTENSIONS
-- ============================================================================
create extension if not exists "uuid-ossp";

-- ============================================================================
-- 1. DROP EXISTING POLICIES (safe cleanup so re-run never fails)
-- ============================================================================
do $$ 
declare
  r record;
begin
  -- Drop all policies on our tables so we can recreate them cleanly
  for r in (
    select policyname, tablename, schemaname
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'profiles','rooms','tours','tour_itinerary','tour_gallery',
        'fee_groups','fee_items','gallery','blog_posts','reviews',
        'site_settings','contact_messages','tour_requests',
        'booking_requests','airport_pickups'
      )
  ) loop
    execute format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename);
  end loop;

  -- Drop storage policies we created
  for r in (
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname in (
        'Public media read access','Public avatars read access',
        'Authenticated users can upload avatars',
        'Admins can upload media','Admins can update media','Admins can delete media'
      )
  ) loop
    execute format('drop policy if exists %I on storage.objects', r.policyname);
  end loop;
end $$;

-- Drop triggers so we can recreate
drop trigger if exists rooms_updated_at on public.rooms;
drop trigger if exists tours_updated_at on public.tours;
drop trigger if exists profiles_updated_at on public.profiles;
drop trigger if exists blog_posts_updated_at on public.blog_posts;
drop trigger if exists site_settings_updated_at on public.site_settings;
drop trigger if exists on_auth_user_created on auth.users;

-- ============================================================================
-- 2. AUTH — profiles linked to auth.users
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
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Admins can view all profiles"
  on public.profiles for select
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id, new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', '')
  );
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- 3. ROOMS
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
create policy "Anyone can read rooms" on public.rooms for select to anon, authenticated using (true);
create policy "Admins can manage rooms" on public.rooms for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 4. TOURS
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
create policy "Anyone can read tours" on public.tours for select to anon, authenticated using (true);
create policy "Admins can manage tours" on public.tours for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 4a. TOUR ITINERARY
-- ============================================================================
create table if not exists public.tour_itinerary (
  id bigint generated always as identity primary key,
  tour_id bigint not null references public.tours(id) on delete cascade,
  day_label text not null,
  description text not null,
  sort_order int default 0
);
alter table public.tour_itinerary enable row level security;
create policy "Anyone can read tour itinerary" on public.tour_itinerary for select to anon, authenticated using (true);
create policy "Admins can manage tour itinerary" on public.tour_itinerary for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 4b. TOUR GALLERY
-- ============================================================================
create table if not exists public.tour_gallery (
  id bigint generated always as identity primary key,
  tour_id bigint not null references public.tours(id) on delete cascade,
  image_url text not null,
  caption text,
  sort_order int default 0
);
alter table public.tour_gallery enable row level security;
create policy "Anyone can read tour gallery" on public.tour_gallery for select to anon, authenticated using (true);
create policy "Admins can manage tour gallery" on public.tour_gallery for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 5. ENTRANCE FEES
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
create policy "Admins can manage fee_groups" on public.fee_groups for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can manage fee_items" on public.fee_items for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 6. GALLERY
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
create policy "Admins can manage gallery" on public.gallery for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 7. BLOG POSTS
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
create policy "Anyone can read published blog posts" on public.blog_posts for select to anon, authenticated using (is_published = true);
create policy "Admins can manage blog posts" on public.blog_posts for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 8. REVIEWS
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
create policy "Anyone can read approved reviews" on public.reviews for select to anon, authenticated using (is_approved = true);
create policy "Authenticated users can insert reviews" on public.reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "Anon can insert reviews" on public.reviews for insert to anon with check (true);
create policy "Admins can manage reviews" on public.reviews for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 9. SITE SETTINGS
-- ============================================================================
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
create policy "Anyone can read site settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins can manage site settings" on public.site_settings for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 10. EXISTING FORM TABLES
-- ============================================================================
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null, email text not null, subject text, message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "anon can insert contact_messages" on public.contact_messages for insert to anon with check (true);
create policy "auth can insert contact_messages" on public.contact_messages for insert to authenticated with check (true);
create policy "Admins can read contact_messages" on public.contact_messages for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create table if not exists public.tour_requests (
  id bigint generated always as identity primary key,
  name text not null, email text not null, guests int, period text, destinations text, message text,
  created_at timestamptz not null default now()
);
alter table public.tour_requests enable row level security;
create policy "anon can insert tour_requests" on public.tour_requests for insert to anon with check (true);
create policy "auth can insert tour_requests" on public.tour_requests for insert to authenticated with check (true);
create policy "Admins can read tour_requests" on public.tour_requests for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create table if not exists public.booking_requests (
  id bigint generated always as identity primary key,
  name text not null, email text not null, room text, check_in date, check_out date, guests int, message text,
  created_at timestamptz not null default now()
);
alter table public.booking_requests enable row level security;
create policy "anon can insert booking_requests" on public.booking_requests for insert to anon with check (true);
create policy "auth can insert booking_requests" on public.booking_requests for insert to authenticated with check (true);
create policy "Admins can read booking_requests" on public.booking_requests for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

create table if not exists public.airport_pickups (
  id bigint generated always as identity primary key,
  name text not null, email text not null, phone text, airport text,
  arrival_date text, arrival_time text, flight_no text, persons int default 1,
  created_at timestamptz not null default now()
);
alter table public.airport_pickups enable row level security;
create policy "anon can insert airport_pickups" on public.airport_pickups for insert to anon with check (true);
create policy "auth can insert airport_pickups" on public.airport_pickups for insert to authenticated with check (true);
create policy "Admins can read airport_pickups" on public.airport_pickups for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 11. STORAGE BUCKETS
-- ============================================================================
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict (id) do nothing;

create policy "Public media read access" on storage.objects for select using (bucket_id = 'media');
create policy "Public avatars read access" on storage.objects for select using (bucket_id = 'avatars');
create policy "Authenticated users can upload avatars" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Admins can upload media" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can update media" on storage.objects for update to authenticated
  using (bucket_id = 'media' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Admins can delete media" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- ============================================================================
-- 12. UPDATED_AT TRIGGERS
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger rooms_updated_at before update on public.rooms for each row execute function public.set_updated_at();
create trigger tours_updated_at before update on public.tours for each row execute function public.set_updated_at();
create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();
create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();


-- ============================================================================
-- ============================================================================
--                        SEED DATA BELOW
-- ============================================================================
-- ============================================================================

-- Clear old seed data first (safe to re-run)
truncate public.fee_items, public.fee_groups cascade;
truncate public.tour_gallery, public.tour_itinerary, public.tours cascade;
truncate public.rooms cascade;
truncate public.gallery cascade;
truncate public.blog_posts cascade;
delete from public.site_settings;

-- ============================================================================
-- ROOMS (8 rooms)
-- ============================================================================
insert into public.rooms (name, slug, price_egp, price_label, description, category, sort_order, image_url) values
  ('Bed in a Mixed 6 beds Dorm room', 'mixed-6-dorm', 600, '600 EGP', 'Deluxe mixed dorm with a private bathroom and A/C', 'dorm', 1, '/images/tours--collage.webp'),
  ('Deluxe Single; Ensuite', 'deluxe-single-ensuite', 1200, '1200 EGP', 'Deluxe room with Private Bathroom and Fan', 'private', 2, '/images/tours--terrace.webp'),
  ('Single; Shared bathroom', 'single-shared', 900, '900 EGP', 'Standard room with Fan', 'private', 3, '/images/tours--collage.webp'),
  ('Deluxe Double; Ensuite', 'deluxe-double-ensuite', 1800, '1800 EGP', 'Deluxe room with Private bathroom and A/C', 'private', 4, '/images/tours--terrace.webp'),
  ('Double; Shared bathroom', 'double-shared', 1300, '1300 EGP', 'Standard room with 2 Single beds and Fan', 'private', 5, '/images/tours--collage.webp'),
  ('Deluxe 3-Bed; Ensuite', 'deluxe-3bed-ensuite', 2400, '2400 EGP', 'Deluxe room with 3 Single bed, Private Bathroom and A/C', 'private', 6, '/images/tours--terrace.webp'),
  ('3-Bed; Shared bathroom', '3bed-shared', 1800, '1800 EGP', 'Standard room with 3 Single beds and Fan', 'private', 7, '/images/tours--collage.webp'),
  ('Female Dorm Room', 'female-dorm', 600, '600 EGP', 'Female-only dorm available with a private bathroom and A/C', 'dorm', 8, '/images/tours--collage.webp');

-- ============================================================================
-- TOURS (11 tours)
-- ============================================================================
insert into public.tours (slug, title, card_title, category, duration, description, image_url, highlights, inclusions, exclusions, notes, sort_order) values
  ('giza-pyramids', 'Giza Pyramids & Sphinx', 'Giza Pyramids & Sphinx; Day trip (Very Popular)', 'history', 'Day trip',
   'The Giza Necropolis stands on the Giza Plateau, on the outskirts of Cairo, Egypt. The complex includes the three Great Pyramids and the massive Great Sphinx, 25 km southwest of Cairo city center. The Great Pyramid is the only remaining monument of the Seven Wonders of the Ancient World.',
   '/images/tours--giza.webp',
   ARRAY['Giza Pyramids and Sphinx area', 'Sakkara (The Step Pyramid) area', 'Memphis Museum', 'Dahshour (The Red Pyramid)'],
   ARRAY['Full day trip transportation with a private car and English speaking driver', 'Entrance fees to touristic sites (optional add-on)'],
   ARRAY['Tourist guides are optional for an extra charge (English, French, Spanish and German available)', 'Personal expenses and extras not mentioned'],
   ARRAY['This tour starts early in the morning and ends in the afternoon.', 'All sights open at 8:00 AM and close at 4:00 PM; times are flexible upon request.', 'Special Offer 2026: this tour is FREE when you book our 4 Nights Aswan, Luxor & Abu Simbel or 3 Nights Aswan, Luxor with Nile Cruise tours.'],
   1),
  ('giza-grand-egyptian-museum', 'Giza Pyramids & Grand Egyptian Museum', 'Giza Pyramids & Grand Egyptian Museum', 'history', 'Day trip',
   'Combine the Giza Pyramids and Sphinx with the Grand Egyptian Museum (GEM), the largest archaeological museum in the world, home to the complete collection of Tutankhamun''s treasures.',
   '/images/tours--giza.webp',
   ARRAY['Giza Pyramids and Sphinx', 'Grand Egyptian Museum', 'Grand Staircase', 'Tutankhamun galleries'],
   ARRAY['Private car and English speaking driver', 'GEM tickets booked for you'],
   ARRAY['Tourist guides optional for an extra charge', 'Personal expenses'],
   ARRAY['All sights open at 8:00 AM and close at 4:00 PM.'],
   2),
  ('islamic-coptic-cairo', 'Islamic & Coptic Cairo', 'City tour (Islamic and Coptic Cairo); Day trip', 'history', 'Day trip',
   'Islamic Cairo is part of central Cairo noted for its historically important mosques and monuments, overlooked by the Cairo Citadel. Coptic Cairo was a stronghold for Christianity until the Islamic era.',
   '/images/tours--islamic.webp',
   ARRAY['The Citadel of Saladin (El-Qala)', 'Mohamed Ali Alabaster Mosque', 'Mosque of Amr Ibn Al As', 'Sultan Hassan Madrassa and Mosque', 'The Hanging Church', 'Church of St. Sergius (Abu Serga)', 'The Synagogue of Ben Ezra'],
   ARRAY['Transportation', 'Professional tour guide'],
   ARRAY['Entrance fees to sites', 'Personal expenses'],
   ARRAY['Times are flexible upon request.'],
   3),
  ('alexandria', 'Alexandria', 'Alexandria; Day trip', 'history', 'Day trip',
   'As Egypt''s second largest city, Alexandria has plenty to see and do. We offer a one day tour for those short on time but still wanting to see all that they can.',
   '/images/tours--alexandria.webp',
   ARRAY['Qaitbay Citadel', 'El Morsi Abu El Abais Mosque', 'The Library of Alexandria', 'Pompeii''s Pillar', 'Montaza beach and palace'],
   ARRAY['Full day private driver'],
   ARRAY['Entrance fees', 'Guide (optional)', 'Personal expenses'],
   ARRAY['Long day trip — approximately 6 AM to 10 PM.'],
   4),
  ('aswan-luxor-abu-simbel', 'Aswan, Luxor & Abu Simbel', '3 Nights, 4 Days; Aswan, Luxor & Abu Simbel with Nile Cruise (Best Seller)', 'history', '3 Nights, 4 Days',
   'Our best selling Nile Cruise. Luxor is known as the world''s greatest open air museum. Book now and get a FREE Giza Pyramids day trip and a FREE hot air balloon ride in Luxor.',
   '/images/tours--aswan.webp',
   ARRAY['Karnak & Luxor Temples', 'Valley of the Kings', 'Abu Simbel', 'Philae Temple', 'Hot air balloon in Luxor'],
   ARRAY['Pickups and transfers as mentioned', '1st class train tickets Cairo - Luxor and Aswan - Cairo', 'English speaking Egyptologist guide', '3 nights on 5-star Nile Cruise including all meals', 'All taxes and service charge'],
   ARRAY['Entrance fees to sites', 'Beverages on the cruise', 'Any extras not mentioned'],
   ARRAY['Upgrade to sleeper train: 100 USD per person in a double cabin, including dinner and breakfast.', 'Tour available every day; sightseeing in small groups.', 'Reach us on +201090400310 for inquiries during your trip.'],
   5),
  ('aswan-luxor-hostels-budget-trip', 'Aswan, Luxor Hostels & Felucca Budget Trip', '3 Nights, 4 Days; Aswan, Abu Simbel, Felucca & Luxor Hostels Budget Trip', 'adventure', '3 Nights, 4 Days',
   'Budget 3 nights, 4 days trip from Cairo: Aswan, Abu Simbel, a night on a felucca and Luxor, staying in hostels. Night bus and transfers included.',
   '/images/tours--aswan.webp',
   ARRAY['Philae Temple', 'Abu Simbel', 'Felucca overnight', 'Karnak & Luxor Temples', 'Valley of the Kings'],
   ARRAY['1 night in an Aswan hostel and 1 night in a Luxor hostel', '1 night on a traditional felucca with lunch, dinner and breakfast', 'All transportation for scheduled tours', 'Professional tour guides (except Abu Simbel)'],
   ARRAY['Entrance fees (paid by card at each site)', 'Meals and drinks not mentioned', 'Personal expenses'],
   ARRAY['Abu Simbel departure at 4 AM, return to Aswan around noon.', 'Itinerary subject to minor changes depending on local conditions.'],
   6),
  ('bahareya-oasis-white-desert', 'Bahareya Oasis, White and Black Deserts', 'Bahareya Oasis (White Desert); 2 Nights, 3 Days (Great Value for Money)', 'adventure', '1 or 2 Nights',
   'The White Desert has massive chalk rock formations created by occasional sandstorms. A night under the stars here is an experience never forgotten, as the sky turns pink then fiery orange.',
   '/images/tours--bahareya.webp',
   ARRAY['4x4 Jeep Safari', 'White Desert camping', 'Crystal Mountain', 'Black Desert', 'Bedouin BBQ dinner'],
   ARRAY['1 night camp-style hotel', '1 night camping in the White Desert', '4x4 Jeep Safari', 'Bedouin BBQ dinner', 'English speaking driver'],
   ARRAY['Extras not mentioned', 'Optional tour guides', 'Drinks'],
   ARRAY['Tour starts early in the morning from Cairo.', 'Sightseeing in small groups.'],
   7),
  ('dahab-red-sea', 'Dahab (Red Sea)', 'Dahab (Red Sea); 2 Nights, 3 Days', 'adventure', '2 Nights, 3 Days',
   'One of Sinai''s most treasured diving destinations. The Blue Hole and Canyon are internationally famous dive spots.',
   '/images/tours--dahab.webp', '{}', '{}', '{}', '{}', 8),
  ('siwa-oasis', 'Siwa Oasis', 'Siwa Oasis Tour from Cairo, 2 Nights 3 Days', 'adventure', '2 Nights, 3 Days',
   'Salt lakes, Cleopatra Spring, Shali Fortress, Oracle Temple, desert safari and hot springs.',
   '/images/7f5e910fdb3056ca3aba57fbdcf2a476.webp', '{}', '{}', '{}', '{}', 9),
  ('aswan-luxor-nile-cruise', 'Aswan & Luxor with Nile Cruise', 'Aswan, Luxor with Nile Cruise; 3 Nights, 4 Days', 'history', '3 Nights, 4 Days',
   'A 5-star Nile cruise from Luxor or Aswan with hot air balloon ride and Abu Simbel.',
   '/images/tours--aswan.webp', '{}', '{}', '{}', '{}', 10),
  ('aswan-luxor-hotels', 'Aswan, Luxor & Abu Simbel Hotels', 'Aswan, Luxor & Abu Simbel 2 Nights, 3 Days', 'history', '2 Nights, 3 Days',
   'Classic 3-day trip by 1st class train staying in 3-star hotels.',
   '/images/tours--aswan.webp', '{}', '{}', '{}', '{}', 11);

-- ============================================================================
-- TOUR ITINERARIES
-- ============================================================================
insert into public.tour_itinerary (tour_id, day_label, description, sort_order)
select t.id, 'Full day',
  'You will be picked up from Dahab Hostel''s reception early morning by our English speaking driver, and transferred to the Giza Pyramids and Sphinx area, Sakkara (The Step Pyramid) area, Memphis Museum and Dahshour (The Red Pyramid). The driver waits for you until you finish sightseeing and brings you back to the hostel.', 1
from public.tours t where t.slug = 'giza-pyramids';

insert into public.tour_itinerary (tour_id, day_label, description, sort_order)
select t.id, 'Full day',
  'Morning visit to the Giza Pyramids and Sphinx, followed by the Grand Egyptian Museum. Grand Egyptian Museum tickets are sold online only for a set time slot; we will book it for you when you join our tour.', 1
from public.tours t where t.slug = 'giza-grand-egyptian-museum';

insert into public.tour_itinerary (tour_id, day_label, description, sort_order)
select t.id, 'Full day',
  'A guided city tour through Islamic Cairo (the Citadel, Mohamed Ali Mosque, Ibn Tulun Mosque, Sultan Hassan Mosque) and Coptic Cairo (the Hanging Church, Abu Serga, Ben Ezra Synagogue, St. Barbara Church).', 1
from public.tours t where t.slug = 'islamic-coptic-cairo';

insert into public.tour_itinerary (tour_id, day_label, description, sort_order)
select t.id, 'Full day',
  'Early in the morning our driver will pick you up from reception. You will have the driver for the whole day to see a number of sights before returning to Cairo in the evening.', 1
from public.tours t where t.slug = 'alexandria';

insert into public.tour_itinerary (tour_id, day_label, description, sort_order)
select t.id, v.day_label, v.description, v.sort_order
from public.tours t, (values
  ('Day 1', 'Check in to the 5-star Nile cruise; visit Karnak and Luxor Temples on the East Bank. Overnight on board.', 1),
  ('Day 2', 'Free hot air balloon ride, then the West Bank: Valley of the Kings, Temple of Queen Hatshepsut and Colossi of Memnon. Sail towards Aswan.', 2),
  ('Day 3', 'Visit the Temple of Horus in Edfu and the Temple of Sobek in Kom Ombo. Continue to Aswan.', 3),
  ('Day 4', 'Abu Simbel, Philae Temple and the Aswan High Dam. Evening train back to Cairo.', 4)
) as v(day_label, description, sort_order) where t.slug = 'aswan-luxor-abu-simbel';

insert into public.tour_itinerary (tour_id, day_label, description, sort_order)
select t.id, v.day_label, v.description, v.sort_order
from public.tours t, (values
  ('Day 1', 'Depart Cairo by bus at 8 PM. Visit Philae Temple in Aswan; overnight in the Aswan hostel.', 1),
  ('Day 2', 'At 4 AM transfer to Abu Simbel. Return around 1 PM, then a traditional felucca sailing with lunch and dinner; overnight under the stars.', 2),
  ('Day 3', 'Arrive Aqaba Port around 7 AM, transfer to Luxor. Explore Karnak and Luxor Temples; overnight in the Luxor hostel.', 3),
  ('Day 4', 'Visit the Valley of the Kings, Colossi of Memnon and Hatshepsut Temple; night bus back to Cairo.', 4)
) as v(day_label, description, sort_order) where t.slug = 'aswan-luxor-hostels-budget-trip';

insert into public.tour_itinerary (tour_id, day_label, description, sort_order)
select t.id, v.day_label, v.description, v.sort_order
from public.tours t, (values
  ('Day 1', 'Depart Cairo by bus to Bahareya Oasis (about 4 hrs). Transfer to a camp-style hotel, lunch, then a local village tour, sand dunes, English Mountain, Flower Stone, Salt Lake and hot springs.', 1),
  ('Day 2', '4x4 Jeep Safari: hot water spring, Bedouin villages, Akabat Desert dunes and Crystal Mountain. Camp overnight in the White Desert with a Bedouin BBQ dinner under the stars.', 2),
  ('Day 3', 'After breakfast, visit the Black Desert with its dark cones and rocks. Return to Cairo around 5 PM.', 3)
) as v(day_label, description, sort_order) where t.slug = 'bahareya-oasis-white-desert';

-- ============================================================================
-- TOUR GALLERY IMAGES
-- ============================================================================
insert into public.tour_gallery (tour_id, image_url, caption, sort_order)
select t.id, v.url, v.caption, v.sort_order from public.tours t, (values
  ('/images/tours--giza-1.webp', 'Pyramids of Giza', 1),
  ('/images/tours--giza-2.webp', 'Sakkara Pyramid', 2),
  ('/images/tours--giza-3.webp', 'Red Pyramid, Dahshour', 3),
  ('/images/tours--giza-4.webp', 'Bent Pyramid, Dahshour', 4)
) as v(url, caption, sort_order) where t.slug = 'giza-pyramids';

insert into public.tour_gallery (tour_id, image_url, caption, sort_order)
select t.id, v.url, v.caption, v.sort_order from public.tours t, (values
  ('/images/tours--gem-1.webp', 'The Grand Egyptian Museum', 1),
  ('/images/tours--gem-2.webp', 'Colossus of Ramses II, GEM atrium', 2),
  ('/images/tours--gem-3.webp', 'The Grand Staircase, GEM', 3),
  ('/images/tours--gem-6.webp', 'View of the Pyramids of Giza from the GEM', 4)
) as v(url, caption, sort_order) where t.slug = 'giza-grand-egyptian-museum';

insert into public.tour_gallery (tour_id, image_url, caption, sort_order)
select t.id, v.url, v.caption, v.sort_order from public.tours t, (values
  ('/images/tours--islamic-1.webp', 'Mohamed Ali (Alabaster) Mosque at the Citadel', 1),
  ('/images/tours--islamic-5.webp', 'Inside Sultan Hassan Mosque', 2),
  ('/images/tours--islamic-7.webp', 'Entrance of the Hanging Church Basilica', 3),
  ('/images/tours--islamic-8.webp', 'Ibn Tulun Mosque', 4)
) as v(url, caption, sort_order) where t.slug = 'islamic-coptic-cairo';

insert into public.tour_gallery (tour_id, image_url, caption, sort_order)
select t.id, v.url, v.caption, v.sort_order from public.tours t, (values
  ('/images/tours--aswan-1.webp', 'Pillars of Karnak Temple, Luxor', 1),
  ('/images/tours--aswan-2.webp', 'Abu Simbel', 2),
  ('/images/tours--aswan-7.webp', '5-Star Nile Cruise', 3),
  ('/images/tours--aswan-13.webp', 'Valley of the Kings, Luxor West Bank', 4)
) as v(url, caption, sort_order) where t.slug = 'aswan-luxor-abu-simbel';

insert into public.tour_gallery (tour_id, image_url, caption, sort_order)
select t.id, v.url, v.caption, v.sort_order from public.tours t, (values
  ('/images/tours--aswan-5.webp', 'Feluccas on the Nile in magical Aswan', 1),
  ('/images/tours--aswan-6.webp', 'Nile in Aswan', 2),
  ('/images/tours--aswan-10.webp', 'Colossi of Memnon, Luxor', 3),
  ('/images/tours--aswan-12.webp', 'Philae Temple, Aswan', 4)
) as v(url, caption, sort_order) where t.slug = 'aswan-luxor-hostels-budget-trip';

insert into public.tour_gallery (tour_id, image_url, caption, sort_order)
select t.id, v.url, v.caption, v.sort_order from public.tours t, (values
  ('/images/tours--wd-1.webp', 'The White Desert', 1),
  ('/images/tours--wd-2.webp', 'The Black Desert', 2),
  ('/images/tours--wd-3.webp', 'Chalky rock formations', 3),
  ('/images/tours--wd-5.webp', '4x4 Jeep Safari', 4),
  ('/images/tours--wd-7.webp', 'Crystal Mountain', 5)
) as v(url, caption, sort_order) where t.slug = 'bahareya-oasis-white-desert';

insert into public.tour_gallery (tour_id, image_url, caption, sort_order)
select t.id, v.url, v.caption, v.sort_order from public.tours t, (values
  ('/images/tours--dahab-1.webp', 'Dahab City', 1),
  ('/images/tours--dahab-3.webp', 'The famous Blue Hole', 2),
  ('/images/tours--dahab-6.webp', 'Red Sea corals', 3)
) as v(url, caption, sort_order) where t.slug = 'dahab-red-sea';

-- ============================================================================
-- ENTRANCE FEES
-- ============================================================================
insert into public.fee_groups (group_name, sort_order) values
  ('Discover Giza with Us', 1),
  ('Discover the heart of Cairo''s history', 2),
  ('Uncover the secrets of Luxor, Aswan & Abu Simbel', 3),
  ('Come Sail into Alexandria''s Timeless Charm', 4),
  ('Experience the Chill Vibes of Dahab', 5),
  ('Discover Siwa with Us', 6),
  ('Uncover the Magic of the White Desert', 7);

-- Giza fees
insert into public.fee_items (group_id, site_name, price, is_addon, sort_order)
select g.id, v.site_name, v.price, false, v.sort_order from public.fee_groups g, (values
  ('Giza Pyramids and Sphinx Area', 'EGP 700', 1), ('Saqqara', 'EGP 600', 2),
  ('Grand Egyptian Museum', 'EGP 1830', 3), ('Dahshur (The Red & Bent Pyramid)', 'EGP 200', 4),
  ('Inside Khufu Pyramid', 'EGP 1500', 5), ('Pyramids Sound & Light Show', 'EGP 1000', 6)
) as v(site_name, price, sort_order) where g.group_name = 'Discover Giza with Us';

-- Islamic Cairo fees
insert into public.fee_items (group_id, site_name, price, is_addon, sort_order)
select g.id, 'Islamic & Coptic Cairo', 'EGP 550', false, 1
from public.fee_groups g where g.group_name = 'Discover the heart of Cairo''s history';
insert into public.fee_items (group_id, site_name, price, is_addon, sort_order)
select g.id, 'Sound & Light shows', 'EGP 220', true, 2
from public.fee_groups g where g.group_name = 'Discover the heart of Cairo''s history';

-- Luxor / Aswan fees
insert into public.fee_items (group_id, site_name, price, is_addon, sort_order)
select g.id, v.site_name, v.price, false, v.sort_order from public.fee_groups g, (values
  ('Karnak Temple', 'EGP 500', 1), ('Luxor Temple', 'EGP 500', 2),
  ('Valley of the Kings', 'EGP 750', 3), ('Temple of Queen Hatshepsut', 'EGP 440', 4),
  ('Temple of Horus (Edfu)', 'EGP 450', 5), ('Temple of Sobek (Kom Ombo)', 'EGP 450', 6),
  ('Philae Temple', 'EGP 450', 7), ('Aswan High Dam', 'EGP 450', 8)
) as v(site_name, price, sort_order) where g.group_name = 'Uncover the secrets of Luxor, Aswan & Abu Simbel';

insert into public.fee_items (group_id, site_name, price, is_addon, sort_order)
select g.id, v.site_name, v.price, true, v.sort_order from public.fee_groups g, (values
  ('Sound & Light Show (Karnak)', 'EGP 960', 9), ('Sound & Light Show (Abu Simbel)', 'EGP 675', 10),
  ('Sound & Light Show (Edfu)', 'EGP 675', 11)
) as v(site_name, price, sort_order) where g.group_name = 'Uncover the secrets of Luxor, Aswan & Abu Simbel';

-- Alexandria fees
insert into public.fee_items (group_id, site_name, price, is_addon, sort_order)
select g.id, v.site_name, v.price, false, v.sort_order from public.fee_groups g, (values
  ('Citadel of Qaitbay', 'EGP 150', 1), ('Pompey''s Pillar', 'EGP 25', 2)
) as v(site_name, price, sort_order) where g.group_name = 'Come Sail into Alexandria''s Timeless Charm';

-- Dahab fees
insert into public.fee_items (group_id, site_name, price, is_addon, sort_order)
select g.id, 'Blue Hole', '10 USD', false, 1
from public.fee_groups g where g.group_name = 'Experience the Chill Vibes of Dahab';

-- Siwa fees
insert into public.fee_items (group_id, site_name, price, is_addon, sort_order)
select g.id, v.site_name, v.price, false, v.sort_order from public.fee_groups g, (values
  ('Temple of the Oracle of Amun', 'EGP 120', 1), ('Mountain of the Dead', 'EGP 120', 2),
  ('Shali Fortress', 'Free', 3)
) as v(site_name, price, sort_order) where g.group_name = 'Discover Siwa with Us';

-- White Desert fees
insert into public.fee_items (group_id, site_name, price, is_addon, sort_order)
select g.id, 'National park', 'EGP 250', false, 1
from public.fee_groups g where g.group_name = 'Uncover the Magic of the White Desert';

-- ============================================================================
-- GALLERY (14 photos)
-- ============================================================================
insert into public.gallery (image_url, caption, group_tag, sort_order) values
  ('/images/tours--collage.webp', 'Dahab Hostel rooftop collage', 'terrace', 1),
  ('/images/tours--terrace.webp', 'Our rooftop terrace', 'terrace', 2),
  ('/images/tours--home-banner.webp', 'The rooftop at sunset', 'terrace', 3),
  ('/images/tours--giza.webp', 'Giza Pyramids and Sphinx', 'tour', 4),
  ('/images/tours--giza-1.webp', 'Pyramids of Giza', 'tour', 5),
  ('/images/tours--aswan-1.webp', 'Pillars of Karnak Temple, Luxor', 'tour', 6),
  ('/images/tours--aswan-5.webp', 'Feluccas on the Nile in Aswan', 'tour', 7),
  ('/images/tours--islamic-1.webp', 'Mohamed Ali Mosque at the Citadel', 'tour', 8),
  ('/images/tours--dahab-1.webp', 'Dahab City', 'tour', 9),
  ('/images/tours--dahab-3.webp', 'The famous Blue Hole', 'tour', 10),
  ('/images/tours--bahareya.webp', 'Bahareya Oasis, White Desert', 'tour', 11),
  ('/images/tours--wd-1.webp', 'The White Desert', 'tour', 12),
  ('/images/7f5e910fdb3056ca3aba57fbdcf2a476.webp', 'Siwa Oasis', 'tour', 13),
  ('/images/8c9f18a4d6a16c4df3705bd336924e2b.webp', 'A view over Siwa Oasis', 'tour', 14);

-- ============================================================================
-- BLOG POSTS (3 posts)
-- ============================================================================
insert into public.blog_posts (title, slug, image_url, is_published, published_at) values
  ('Travelling to Egypt: Is it Safe?', 'travelling-to-egypt-is-it-safe', '/images/blog--pyramid-1.webp', true, now()),
  ('Discover the Giza Pyramids', 'discover-the-giza-pyramids', '/images/blog--pyramid-2.webp', true, now()),
  ('Budget Travel Tips for Cairo', 'budget-travel-tips-for-cairo', '/images/blog--pyramid-3.webp', true, now());

-- ============================================================================
-- SITE SETTINGS (5 settings)
-- ============================================================================
insert into public.site_settings (key, value) values
  ('site', '{"name":"Dahab Hostel","fullName":"Dahab Hostel Cairo","tagline":"Your Oasis in the City...","title":"#1 Best Hostel Egypt - Best small Hostel in Africa — Dahab Hostel Cairo","description":"Award-winning Rooftop hostel in Downtown Cairo city center. Rooftop terraces to relax, study or be social and meet solo travelers. Dorms and private rooms, 24/7 reception, airport pickup and budget tours.","url":"https://dahabhostel.com","email":"info@dahabhostel.com","phone":"+20 2 257 99104","mobile":"+201090400310","address":"26 Mahmoud Bassiouny St. Talaat Harb Sq. 11556 Cairo, Egypt","building":"Building No. 26 – Rooftop 7th floor","foundSince":1998,"guests":"over 800,000 guests","bookingUrl":"https://hotels.cloudbeds.com/en/reservation/eQvcYi?currency=egp"}'::jsonb),
  ('room_rates_note', '"*Prices are per Room per Night in Egyptian Pounds"'::jsonb),
  ('airport_pickup_prices', '["Cairo Airport — 550 EGP per Car (1 to 3 PaX)","Sphinx Airport — 1000 EGP per Car (1 to 3 PaX)","For groups of more than 3 PaX, please contact us for a price quote."]'::jsonb),
  ('fee_notes', '["Entrance fees listed above are excluded and must be paid by card only at the sites.","However, if you book the tour with us, you can pay in cash.","Grand Egyptian Museum tickets are sold online only, for a set time slot. We will book it for you when you join our tour."]'::jsonb),
  ('provided_amenities', '["Privates and Dorms","Open 24/7","Safety deposit box","No curfew","Friendly staff","Travel info","Airport pickup service","FREE WiFi","Breakfast","Guest kitchen","Luggage storage","Laundry service"]'::jsonb);

-- ============================================================================
-- ✅ DONE! Verify with:
--    SELECT 'rooms' as tbl, count(*) FROM rooms
--    UNION ALL SELECT 'tours', count(*) FROM tours
--    UNION ALL SELECT 'tour_itinerary', count(*) FROM tour_itinerary
--    UNION ALL SELECT 'tour_gallery', count(*) FROM tour_gallery
--    UNION ALL SELECT 'fee_groups', count(*) FROM fee_groups
--    UNION ALL SELECT 'fee_items', count(*) FROM fee_items
--    UNION ALL SELECT 'gallery', count(*) FROM gallery
--    UNION ALL SELECT 'blog_posts', count(*) FROM blog_posts
--    UNION ALL SELECT 'site_settings', count(*) FROM site_settings;
-- ============================================================================
