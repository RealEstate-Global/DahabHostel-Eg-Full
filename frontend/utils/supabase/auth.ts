/**
 * Supabase Auth helpers — server-side
 */
import { createClient } from "./server";
import { redirect } from "next/navigation";
import type { Database } from "./types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function getUser() {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  const { user } = data;
  return user;
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  const { user } = data;

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;
  return profile;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const profile = await getProfile();
  if (!profile || profile.role !== "admin") redirect("/");
  return profile;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
