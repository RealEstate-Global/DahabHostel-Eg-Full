import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.gckokgjotdwfhfxplbwj:Memo%40356000@aws-0-eu-west-1.pooler.supabase.com:5432/postgres";

const sql = postgres(connectionString, { prepare: false });

async function main() {
  const targetEmail = "m.ssaid356@gmail.com";
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
      await sql`
        INSERT INTO public.profiles (id, email, full_name, role, updated_at)
        VALUES (${user.id}, ${targetEmail}, 'Mostafa Said', 'admin', NOW())
        ON CONFLICT (id) DO UPDATE
        SET role = 'admin', updated_at = NOW();
      `;
      console.log(`✅ Successfully assigned role='admin' to ${targetEmail} for id=${user.id}`);
    } else {
      console.log(`⚠️ User ${targetEmail} is not yet registered in auth.users.`);
      console.log(`Checking if any profile exists with that email...`);
      if (profiles.length > 0) {
        await sql`
          UPDATE public.profiles
          SET role = 'admin', updated_at = NOW()
          WHERE email = ${targetEmail};
        `;
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
