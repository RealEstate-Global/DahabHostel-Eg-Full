import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

let client: ReturnType<typeof postgres> | undefined;

export function getDb() {
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not defined");
  }
  if (!client) {
    client = postgres(connectionString, {
      prepare: false, // Required for Supabase transaction pooler (port 6543)
    });
  }
  return drizzle(client, { schema });
}

export const db = connectionString
  ? drizzle(postgres(connectionString, { prepare: false }), { schema })
  : (null as unknown as ReturnType<typeof drizzle<typeof schema>>);
