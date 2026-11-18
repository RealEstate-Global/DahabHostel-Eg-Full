import postgres from "postgres";
import fs from "node:fs";
import path from "node:path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is not set.");
  process.exit(1);
}

console.log("🚀 Connecting to PostgreSQL and executing complete-setup.sql...");

const sql = postgres(databaseUrl, { prepare: false });

async function run() {
  try {
    const sqlFilePath = path.resolve("supabase/complete-setup.sql");
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");

    console.log(`📄 Executing ${sqlFilePath} (${sqlContent.length} bytes)...`);

    // Execute the complete SQL script directly
    await sql.unsafe(sqlContent);

    console.log("✅ Migration & Seeding executed successfully!");

    // Verify tables and counts
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    console.log("\n📊 Tables in public schema:");
    for (const t of tables) {
      try {
        const [{ count }] = await sql.unsafe(`SELECT count(*) FROM "${t.table_name}"`);
        console.log(`   - ${t.table_name.padEnd(20)}: ${count} rows`);
      } catch (err) {
        console.log(`   - ${t.table_name.padEnd(20)}: (table created, count error: ${err.message})`);
      }
    }
  } catch (err) {
    console.error("❌ Error applying migration:", err);
  } finally {
    await sql.end();
  }
}

run();
