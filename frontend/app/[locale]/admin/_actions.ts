"use server";

/**
 * Admin Server Actions — protected mutations
 * Every action calls requireAdmin() before performing any database operation.
 */
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/server";

// ── Reviews ─────────────────────────────────────────────────────────────────

export async function approveReview(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await (supabase.from("reviews") as any)
    .update({ is_approved: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

export async function unapproveReview(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await (supabase.from("reviews") as any)
    .update({ is_approved: false })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

export async function deleteReview(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Rooms ───────────────────────────────────────────────────────────────────

export async function toggleRoomActive(id: number, isActive: boolean) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await (supabase.from("rooms") as any)
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

export async function deleteRoom(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("rooms").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

export async function upsertRoom(data: {
  id?: number;
  name: string;
  slug: string;
  price_egp: number;
  price_label: string;
  description?: string;
  category: string;
  capacity?: number;
  amenities?: string[];
  image_url?: string;
  sort_order?: number;
  is_active?: boolean;
}) {
  await requireAdmin();
  const supabase = await createClient();

  if (data.id) {
    const { id, ...rest } = data;
    const { error } = await (supabase.from("rooms") as any)
      .update({ ...rest, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { id: _id, ...rest } = data;
    const { error } = await (supabase.from("rooms") as any).insert(rest);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Tours ───────────────────────────────────────────────────────────────────

export async function toggleTourActive(id: number, isActive: boolean) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await (supabase.from("tours") as any)
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

export async function deleteTour(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  // Cascade deletes itinerary and gallery via FK
  const { error } = await supabase.from("tours").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

export async function upsertTour(data: {
  id?: number;
  slug: string;
  title: string;
  card_title?: string;
  category: string;
  duration?: string;
  description?: string;
  image_url?: string;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  notes?: string[];
  sort_order?: number;
  is_active?: boolean;
}) {
  await requireAdmin();
  const supabase = await createClient();

  if (data.id) {
    const { id, ...rest } = data;
    const { error } = await (supabase.from("tours") as any)
      .update({ ...rest, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { id: _id, ...rest } = data;
    const { error } = await (supabase.from("tours") as any).insert(rest);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Blog Posts ──────────────────────────────────────────────────────────────

export async function toggleBlogPublished(id: number, isPublished: boolean) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await (supabase.from("blog_posts") as any)
    .update({
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

export async function deleteBlogPost(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Gallery ─────────────────────────────────────────────────────────────────

export async function deleteGalleryItem(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Fee Groups & Items ──────────────────────────────────────────────────────

export async function deleteFeeGroup(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  // Cascade deletes items via FK
  const { error } = await supabase.from("fee_groups").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

export async function deleteFeeItem(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("fee_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Contact Messages ────────────────────────────────────────────────────────

export async function deleteContactMessage(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Booking Requests ────────────────────────────────────────────────────────

export async function deleteBookingRequest(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("booking_requests")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Tour Requests ───────────────────────────────────────────────────────────

export async function deleteTourRequest(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("tour_requests")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Airport Pickups ─────────────────────────────────────────────────────────

export async function deleteAirportPickup(id: number) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("airport_pickups")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Profiles (role management) ──────────────────────────────────────────────

export async function updateProfileRole(
  id: string,
  role: "guest" | "admin" | "staff"
) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await (supabase.from("profiles") as any)
    .update({ role, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Site Settings ───────────────────────────────────────────────────────────

export async function upsertSiteSetting(key: string, value: unknown) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await (supabase.from("site_settings") as any)
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Sign Out ────────────────────────────────────────────────────────────────

export async function adminSignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
