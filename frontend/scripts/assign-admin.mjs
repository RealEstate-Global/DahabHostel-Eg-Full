import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const confirmation = "--confirm-admin-provisioning";
const targetEmail = process.env.ADMIN_USER_EMAIL?.trim().toLowerCase();
const connectionString = process.env.DATABASE_URL;

if (!process.argv.includes(confirmation)) {
  console.error(`Refusing to change roles. Re-run with ${confirmation} after reviewing the target account.`);
  process.exit(1);
}

if (!targetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
  console.error("Set ADMIN_USER_EMAIL to the exact email address of the existing account to provision.");
  process.exit(1);
}

if (!connectionString) {
  console.error("DATABASE_URL is required. No built-in database credentials are provided.");
  process.exit(1);
}

const sql = postgres(connectionString, { prepare: false, max: 1 });

try {
  const users = await sql`
    SELECT id, email
    FROM auth.users
    WHERE lower(email) = ${targetEmail}
    LIMIT 1;
  `;

  if (users.length === 0) {
    throw new Error("No matching Supabase Auth account exists; no profile role was changed.");
  }

  const [user] = users;
  await sql.begin(async (transaction) => {
    await transaction`
      INSERT INTO public.profiles (id, email, role, updated_at)
      VALUES (${user.id}, ${user.email}, 'admin', NOW())
      ON CONFLICT (id) DO UPDATE
      SET role = 'admin', updated_at = NOW();
    `;
  });

  console.log("Administrator role assigned to the explicitly selected account.");
} catch (error) {
  console.error("Administrator provisioning failed:", error instanceof Error ? error.message : "Unknown database error");
  process.exitCode = 1;
} finally {
  await sql.end();
}
