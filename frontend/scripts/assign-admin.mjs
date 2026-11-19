import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required. Configure it in .env.local; never hard-code database credentials.");
}

const targetEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
if (!targetEmail) {
  throw new Error("ADMIN_EMAIL is required to identify the account to promote.");
}
const targetFullName = process.env.ADMIN_FULL_NAME?.trim() || "Site Administrator";

const sql = postgres(connectionString, { prepare: false });

async function main() {
  console.log(`Checking status for ${targetEmail}...`);

  try {
    // 1. Check auth.users
    const authUsers = await sql`
      SELECT id, email, created_at, email_confirmed_at
      FROM auth.users
      WHERE email = ${targetEmail};
    `;
    console.log("Auth users found:", authUsers);

    // 2. Check public.profiles
    const profiles = await sql`
      SELECT id, email, full_name, role
      FROM public.profiles
      WHERE email = ${targetEmail};
    `;
    console.log("Profiles found:", profiles);

    if (authUsers.length > 0) {
      const user = authUsers[0];
      // Upsert profile with role = 'admin'
      await sql.begin(async (tx) => {
        // This script uses a trusted DATABASE_URL for one-time administrator bootstrap.
        await tx`select set_config('request.jwt.claim.role', 'service_role', true)`;
        await tx`
          INSERT INTO public.profiles (id, email, full_name, role, updated_at)
          VALUES (${user.id}, ${targetEmail}, ${targetFullName}, 'admin', NOW())
          ON CONFLICT (id) DO UPDATE
          SET role = 'admin', full_name = excluded.full_name, updated_at = NOW();
        `;
      });
      console.log(`✅ Successfully assigned role='admin' to ${targetEmail} for id=${user.id}`);
    } else {
      console.log(`⚠️ User ${targetEmail} is not yet registered in auth.users.`);
      console.log(`Checking if any profile exists with that email...`);
      if (profiles.length > 0) {
        await sql.begin(async (tx) => {
          // This script uses a trusted DATABASE_URL for one-time administrator bootstrap.
          await tx`select set_config('request.jwt.claim.role', 'service_role', true)`;
          await tx`
            UPDATE public.profiles
            SET role = 'admin', full_name = ${targetFullName}, updated_at = NOW()
            WHERE email = ${targetEmail};
          `;
        });
        console.log(`✅ Updated existing profile role to 'admin' for ${targetEmail}`);
      } else {
        console.log(`Notice: Once you sign up with ${targetEmail} on /login, a trigger or this script will ensure your role is 'admin'.`);
      }
    }
  } catch (err) {
    console.error("Error executing database update:", err);
  } finally {
    await sql.end();
  }
}

main();
