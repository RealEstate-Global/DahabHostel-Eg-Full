"use server";

/**
 * Admin Server Actions — protected mutations
 * Every action calls requireAdmin() before performing any database operation.
 */
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import type { Json } from "@/utils/supabase/types";

const idSchema = z.number().int().positive();
const profileIdSchema = z.string().uuid();
const jsonValueSchema: z.ZodType<Json> = z.lazy(() => z.union([
  z.string(),
  z.number().finite(),
  z.boolean(),
  z.null(),
  z.array(jsonValueSchema),
  z.record(z.string(), jsonValueSchema),
]));
const roomInputSchema = z.object({
  id: idSchema.optional(),
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  price_egp: z.number().finite().nonnegative(),
  price_label: z.string().trim().min(1).max(100),
  description: z.string().max(5000).optional(),
  category: z.enum(["dorm", "private"]),
  capacity: z.number().int().min(1).max(100).optional(),
  amenities: z.array(z.string().trim().min(1).max(100)).max(50).optional(),
  image_url: z.string().max(2048).optional(),
  sort_order: z.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
});
const tourInputSchema = z.object({
  id: idSchema.optional(),
  slug: z.string().trim().min(1).max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1).max(180),
  card_title: z.string().max(180).optional(),
  category: z.enum(["history", "adventure", "leisure"]),
  duration: z.string().max(100).optional(),
  description: z.string().max(10000).optional(),
  image_url: z.string().max(2048).optional(),
  highlights: z.array(z.string().trim().min(1).max(300)).max(50).optional(),
  inclusions: z.array(z.string().trim().min(1).max(300)).max(50).optional(),
  exclusions: z.array(z.string().trim().min(1).max(300)).max(50).optional(),
  notes: z.array(z.string().trim().min(1).max(300)).max(50).optional(),
  sort_order: z.number().int().min(0).optional(),
  is_active: z.boolean().optional(),
});

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

export async function upsertRoom(input: z.input<typeof roomInputSchema>) {
  await requireAdmin();
  const data = roomInputSchema.parse(input);
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

export async function upsertTour(input: z.input<typeof tourInputSchema>) {
  await requireAdmin();
  const data = tourInputSchema.parse(input);
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
  role: "guest" | "admin"
) {
  const actor = await requireAdmin();
  const profileId = profileIdSchema.parse(id);
  const supabase = await createClient();
  const targetRole = z.enum(["guest", "admin"]).parse(role);
  if (profileId === actor.id && targetRole !== "admin") {
    throw new Error("You cannot remove your own administrator access.");
  }
  if (targetRole !== "admin") {
    const { count, error: countError } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countError) throw new Error("Unable to verify administrator access.");
    const { data: target, error: targetError } = await (supabase
      .from("profiles") as any)
      .select("role")
      .eq("id", profileId)
      .single();
    if (targetError) throw new Error("Unable to verify the selected account.");
    if (target.role === "admin" && (count ?? 0) <= 1) {
      throw new Error("The last administrator cannot be demoted.");
    }
  }
  const { error } = await (supabase.from("profiles") as any)
    .update({ role: targetRole, updated_at: new Date().toISOString() })
    .eq("id", profileId);
  if (error) throw new Error(error.message);
  revalidatePath("/[locale]/admin", "layout");
  return { success: true };
}

// ── Site Settings ───────────────────────────────────────────────────────────

export async function upsertSiteSetting(key: string, value: unknown) {
  await requireAdmin();
  const validatedKey = z.string().trim().min(1).max(160).parse(key);
  const validatedValue = jsonValueSchema.parse(value);
  const supabase = await createClient();
  const { error } = await (supabase.from("site_settings") as any)
    .upsert(
      { key: validatedKey, value: validatedValue, updated_at: new Date().toISOString() },
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
