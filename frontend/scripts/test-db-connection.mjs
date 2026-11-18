import postgres from "postgres";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const databaseUrl = process.env.DATABASE_URL;

console.log("==================================================");
console.log(" Wayfera / Dahab Hostel — Supabase Connection Test");
console.log("==================================================\n");

// 1. Supabase REST API check
console.log("1. Checking Supabase REST API (via Anon Key)...");
console.log("   URL:", supabaseUrl || "(NOT SET)");
console.log("   Key:", supabaseKey ? `${supabaseKey.slice(0, 15)}...` : "(NOT SET)");

if (!supabaseUrl || !supabaseKey) {
  console.error("   ❌ Missing Supabase URL or Anon Key in environment variables.");
} else {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from("rooms").select("count", { count: "exact", head: true });
    
    if (error) {
      if (error.code === "PGRST204" || error.code === "42P01" || error.message?.includes("schema cache")) {
        console.log("   ⚠️  Supabase is REACHABLE, but tables do not exist yet in schema cache.");
        console.log("       Migration needs to be applied to create tables!");
      } else {
        console.log(`   ⚠️  Supabase responded with code ${error.code}: ${error.message}`);
      }
    } else {
      console.log("   ✅ Supabase REST API connected successfully! 'rooms' table is present.");
    }
  } catch (err) {
    console.error("   ❌ Failed to contact Supabase REST API:", err.message);
  }
}

console.log("\n--------------------------------------------------");

// 2. Direct Postgres / Drizzle connection check
console.log("2. Checking Direct PostgreSQL Pooler (DATABASE_URL)...");

if (!databaseUrl || databaseUrl.includes("[YOUR-") || databaseUrl.includes("[YOUR_")) {
  console.log("   ℹ️  DATABASE_URL is not configured with a real password yet.");
  console.log("   To connect via Drizzle ORM / direct Postgres, set in .env.local:");
  console.log("   DATABASE_URL=\"postgresql://postgres.gckokgjotdwfhfxplbwj:<YOUR_PASSWORD>@aws-0-eu-west-1.pooler.supabase.com:5432/postgres\"\n");
} else {
  console.log("   Attempting connection to PostgreSQL pooler...");
  const sql = postgres(databaseUrl, { prepare: false, connect_timeout: 10 });
  try {
    const versionResult = await sql`SELECT version();`;
    console.log("   ✅ Connected to PostgreSQL successfully!");
    console.log("   PostgreSQL Version:", versionResult[0]?.version?.split(" ")?.slice(0, 2)?.join(" "));

    // Check existing tables in public schema
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    console.log(`   Public tables found (${tables.length}):`, tables.map(t => t.table_name).join(", ") || "(none)");
  } catch (err) {
    console.error("   ❌ PostgreSQL connection failed:", err.message);
  } finally {
    await sql.end();
  }
}

console.log("==================================================\n");
