/**
 * Supabase data-access queries — server-side
 * Import these in Server Components and Server Actions.
 */
import { createClient } from "./server";
import type { Database } from "./types";

export type Tour = Database["public"]["Tables"]["tours"]["Row"];
export type Room = Database["public"]["Tables"]["rooms"]["Row"];
export type FeeGroup = Database["public"]["Tables"]["fee_groups"]["Row"];
export type FeeItem = Database["public"]["Tables"]["fee_items"]["Row"];
export type GalleryRow = Database["public"]["Tables"]["gallery"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];

// ── Tours ───────────────────────────────────────────────────────────────────

export async function getTours(): Promise<Tour[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;
  return (data as Tour[]) ?? [];
}

export async function getTourBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .single();

  const tour = data as Tour | null;
  if (error || !tour) return null;

  // Fetch itinerary and gallery
  const [itinerary, gallery] = await Promise.all([
    supabase
      .from("tour_itinerary")
      .select("*")
      .eq("tour_id", tour.id)
      .order("sort_order"),
    supabase
      .from("tour_gallery")
      .select("*")
      .eq("tour_id", tour.id)
      .order("sort_order"),
  ]);

  return {
    ...tour,
    itinerary: (itinerary.data as Database["public"]["Tables"]["tour_itinerary"]["Row"][]) ?? [],
    gallery: (gallery.data as Database["public"]["Tables"]["tour_gallery"]["Row"][]) ?? [],
  };
}

// ── Rooms ───────────────────────────────────────────────────────────────────

export async function getRooms(): Promise<Room[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;
  return (data as Room[]) ?? [];
}

// ── Entrance Fees ───────────────────────────────────────────────────────────

export async function getEntranceFees() {
  const supabase = await createClient();

  const [groups, items] = await Promise.all([
    supabase.from("fee_groups").select("*").order("sort_order"),
    supabase.from("fee_items").select("*").order("sort_order"),
  ]);

  if (groups.error) throw groups.error;
  if (items.error) throw items.error;

  return ((groups.data as FeeGroup[]) ?? []).map((group) => ({
    ...group,
    items: ((items.data as FeeItem[]) ?? []).filter((item) => item.group_id === group.id),
  }));
}

// ── Gallery ─────────────────────────────────────────────────────────────────

export async function getGallery(groupTag?: "room" | "terrace" | "tour" | "general") {
  const supabase = await createClient();
  let query = supabase.from("gallery").select("*").order("sort_order");
  if (groupTag) query = query.eq("group_tag", groupTag);
  const { data, error } = await query;
  if (error) throw error;
  return (data as GalleryRow[]) ?? [];
}

// ── Blog ────────────────────────────────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data as BlogPost[]) ?? [];
}

// ── Site Settings ───────────────────────────────────────────────────────────

export async function getSiteSetting<T = unknown>(key: string): Promise<T | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error || !data) return null;
  return (data as { value: unknown }).value as T;
}

// ── Reviews ─────────────────────────────────────────────────────────────────

export async function getApprovedReviews() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
