import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const databaseUrl = process.env.DATABASE_URL;

const sql = postgres(databaseUrl, { prepare: false });

async function fix() {
  console.log("Fixing RLS policies...");

  // 1. Create is_admin function with security definer
  await sql`
    create or replace function public.is_admin()
    returns boolean
    language sql
    security definer
    set search_path = public
    stable
    as $$
      select exists (
        select 1 from profiles
        where id = (select auth.uid()) and role = 'admin'
      );
    $$;
  `;

  // 2. Fix profiles policies
  await sql`drop policy if exists "Admins can view all profiles" on public.profiles;`;
  await sql`drop policy if exists "Users can view own profile" on public.profiles;`;
  await sql`drop policy if exists "Users can update own profile" on public.profiles;`;

  await sql`
    create policy "Users can view own profile"
      on public.profiles for select
      using ((select auth.uid()) = id or public.is_admin());
  `;

  await sql`
    create policy "Users can update own profile"
      on public.profiles for update
      using ((select auth.uid()) = id)
      with check ((select auth.uid()) = id);
  `;

  // 3. Public read tables
  const readTables = [
    'rooms', 'tours', 'tour_itinerary', 'tour_gallery',
    'fee_groups', 'fee_items', 'gallery', 'blog_posts', 'site_settings'
  ];

  for (const table of readTables) {
    await sql.unsafe(`drop policy if exists "Admins can manage ${table}" on public.${table};`);
    await sql.unsafe(`drop policy if exists "Admins can insert ${table}" on public.${table};`);
    await sql.unsafe(`drop policy if exists "Admins can update ${table}" on public.${table};`);
    await sql.unsafe(`drop policy if exists "Admins can delete ${table}" on public.${table};`);

    await sql.unsafe(`
      create policy "Admins can insert ${table}" on public.${table}
        for insert with check (public.is_admin());
    `);
    await sql.unsafe(`
      create policy "Admins can update ${table}" on public.${table}
        for update using (public.is_admin());
    `);
    await sql.unsafe(`
      create policy "Admins can delete ${table}" on public.${table}
        for delete using (public.is_admin());
    `);
  }

  // 4. Form submission tables
  const formTables = ['contact_messages', 'tour_requests', 'booking_requests', 'airport_pickups', 'reviews'];
  for (const t of formTables) {
    await sql.unsafe(`
      drop policy if exists "anon can insert ${t}" on public.${t};
      drop policy if exists "Anyone can insert ${t}" on public.${t};
      drop policy if exists "Admins can read ${t}" on public.${t};
      drop policy if exists "Admins can manage ${t}" on public.${t};

      create policy "Anyone can insert ${t}" on public.${t}
        for insert to anon, authenticated with check (true);

      create policy "Admins can read ${t}" on public.${t}
        for select to authenticated using (public.is_admin());

      create policy "Admins can manage ${t}" on public.${t}
        for all to authenticated using (public.is_admin());
    `);
  }

  console.log("✅ All RLS policies updated cleanly!");
}

fix().then(() => sql.end()).catch(err => {
  console.error("❌ Error:", err);
  sql.end();
});
