/**
 * Admin-only data-access queries — server-side
 * These return ALL records (not just active/published) for admin management.
 * Always call requireAdmin() before invoking these functions.
 */
import { createClient } from "./server";
import type { Database } from "./types";

type BookingRequest = Database["public"]["Tables"]["booking_requests"]["Row"];
type TourRequest = Database["public"]["Tables"]["tour_requests"]["Row"];
type AirportPickup = Database["public"]["Tables"]["airport_pickups"]["Row"];
type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];
type Room = Database["public"]["Tables"]["rooms"]["Row"];
type Tour = Database["public"]["Tables"]["tours"]["Row"];
type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
type Review = Database["public"]["Tables"]["reviews"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type GalleryRow = Database["public"]["Tables"]["gallery"]["Row"];
type FeeGroup = Database["public"]["Tables"]["fee_groups"]["Row"];
type FeeItem = Database["public"]["Tables"]["fee_items"]["Row"];
type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"];

// ── Dashboard Overview Counts ───────────────────────────────────────────────

export interface DashboardCounts {
  bookingRequests: number;
  tourRequests: number;
  airportPickups: number;
  contactMessages: number;
  activeRooms: number;
  totalRooms: number;
  activeTours: number;
  totalTours: number;
  pendingReviews: number;
  approvedReviews: number;
  publishedPosts: number;
  totalProfiles: number;
}

export async function getDashboardCounts(): Promise<DashboardCounts> {
  const supabase = await createClient();

  const [
    bookings,
    tourReqs,
    pickups,
    contacts,
    roomsActive,
    roomsAll,
    toursActive,
    toursAll,
    reviewsPending,
    reviewsApproved,
    postsPublished,
    profiles,
  ] = await Promise.all([
    supabase.from("booking_requests").select("id", { count: "exact", head: true }),
    supabase.from("tour_requests").select("id", { count: "exact", head: true }),
    supabase.from("airport_pickups").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    supabase.from("rooms").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("rooms").select("id", { count: "exact", head: true }),
    supabase.from("tours").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("tours").select("id", { count: "exact", head: true }),
    supabase.from("reviews").select("id", { count: "exact", head: true }).eq("is_approved", false),
    supabase.from("reviews").select("id", { count: "exact", head: true }).eq("is_approved", true),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
  ]);

  return {
    bookingRequests: bookings.count ?? 0,
    tourRequests: tourReqs.count ?? 0,
    airportPickups: pickups.count ?? 0,
    contactMessages: contacts.count ?? 0,
    activeRooms: roomsActive.count ?? 0,
    totalRooms: roomsAll.count ?? 0,
    activeTours: toursActive.count ?? 0,
    totalTours: toursAll.count ?? 0,
    pendingReviews: reviewsPending.count ?? 0,
    approvedReviews: reviewsApproved.count ?? 0,
    publishedPosts: postsPublished.count ?? 0,
    totalProfiles: profiles.count ?? 0,
  };
}

// ── Recent Activity ─────────────────────────────────────────────────────────

export interface RecentActivity {
  type: "booking" | "tour_request" | "pickup" | "contact" | "review";
  name: string;
  email: string;
  detail: string | null;
  createdAt: string;
}

export async function getRecentActivity(limit = 10): Promise<RecentActivity[]> {
  const supabase = await createClient();

  const [bookings, tourReqs, pickups, contacts, reviews] = await Promise.all([
    supabase.from("booking_requests").select("name, email, room, created_at").order("created_at", { ascending: false }).limit(limit),
    supabase.from("tour_requests").select("name, email, destinations, created_at").order("created_at", { ascending: false }).limit(limit),
    supabase.from("airport_pickups").select("name, email, airport, created_at").order("created_at", { ascending: false }).limit(limit),
    supabase.from("contact_messages").select("name, email, subject, created_at").order("created_at", { ascending: false }).limit(limit),
    supabase.from("reviews").select("author_name, author_email, title, created_at").order("created_at", { ascending: false }).limit(limit),
  ]);

  const items: RecentActivity[] = [];

  const bData = (bookings.data as Array<{ name: string; email: string; room: string | null; created_at: string }> | null) ?? [];
  const tData = (tourReqs.data as Array<{ name: string; email: string; destinations: string | null; created_at: string }> | null) ?? [];
  const pData = (pickups.data as Array<{ name: string; email: string; airport: string | null; created_at: string }> | null) ?? [];
  const cData = (contacts.data as Array<{ name: string; email: string; subject: string | null; created_at: string }> | null) ?? [];
  const rData = (reviews.data as Array<{ author_name: string; author_email: string | null; title: string | null; created_at: string }> | null) ?? [];

  bData.forEach((b) => items.push({ type: "booking", name: b.name, email: b.email, detail: b.room, createdAt: b.created_at }));
  tData.forEach((t) => items.push({ type: "tour_request", name: t.name, email: t.email, detail: t.destinations, createdAt: t.created_at }));
  pData.forEach((p) => items.push({ type: "pickup", name: p.name, email: p.email, detail: p.airport, createdAt: p.created_at }));
  cData.forEach((c) => items.push({ type: "contact", name: c.name, email: c.email, detail: c.subject, createdAt: c.created_at }));
  rData.forEach((r) => items.push({ type: "review", name: r.author_name, email: r.author_email ?? "", detail: r.title, createdAt: r.created_at }));

  items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return items.slice(0, limit);
}

// ── Booking Requests ────────────────────────────────────────────────────────

export interface BookingRequestsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

export async function getAdminBookingRequests(params: BookingRequestsParams = {}) {
  const { page = 1, pageSize = 20, search, sortBy = "created_at", sortDir = "desc" } = params;
  const supabase = await createClient();

  let query = supabase.from("booking_requests").select("*", { count: "exact" });

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  query = query.order(sortBy, { ascending: sortDir === "asc" });
  query = query.range((page - 1) * pageSize, page * pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: (data as BookingRequest[]) ?? [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

// ── Tour Requests ───────────────────────────────────────────────────────────

export async function getAdminTourRequests(params: BookingRequestsParams = {}) {
  const { page = 1, pageSize = 20, search, sortBy = "created_at", sortDir = "desc" } = params;
  const supabase = await createClient();

  let query = supabase.from("tour_requests").select("*", { count: "exact" });

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  query = query.order(sortBy, { ascending: sortDir === "asc" });
  query = query.range((page - 1) * pageSize, page * pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: (data as TourRequest[]) ?? [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

// ── Airport Pickups ─────────────────────────────────────────────────────────

export async function getAdminAirportPickups(params: BookingRequestsParams = {}) {
  const { page = 1, pageSize = 20, search, sortBy = "created_at", sortDir = "desc" } = params;
  const supabase = await createClient();

  let query = supabase.from("airport_pickups").select("*", { count: "exact" });

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  query = query.order(sortBy, { ascending: sortDir === "asc" });
  query = query.range((page - 1) * pageSize, page * pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: (data as AirportPickup[]) ?? [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

// ── Contact Messages ────────────────────────────────────────────────────────

export async function getAdminContactMessages(params: BookingRequestsParams = {}) {
  const { page = 1, pageSize = 20, search, sortBy = "created_at", sortDir = "desc" } = params;
  const supabase = await createClient();

  let query = supabase.from("contact_messages").select("*", { count: "exact" });

  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%`);
  }

  query = query.order(sortBy, { ascending: sortDir === "asc" });
  query = query.range((page - 1) * pageSize, page * pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: (data as ContactMessage[]) ?? [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

// ── Rooms (admin — includes inactive) ───────────────────────────────────────

export async function getAdminRooms() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("sort_order");

  if (error) throw error;
  return (data as Room[]) ?? [];
}

// ── Tours (admin — includes inactive) ───────────────────────────────────────

export async function getAdminTours() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .order("sort_order");

  if (error) throw error;
  return (data as Tour[]) ?? [];
}

// ── Reviews (admin — all) ───────────────────────────────────────────────────

export async function getAdminReviews(params: BookingRequestsParams & { approved?: boolean } = {}) {
  const { page = 1, pageSize = 20, search, sortBy = "created_at", sortDir = "desc", approved } = params;
  const supabase = await createClient();

  let query = supabase.from("reviews").select("*", { count: "exact" });

  if (approved !== undefined) {
    query = query.eq("is_approved", approved);
  }

  if (search) {
    query = query.or(`author_name.ilike.%${search}%,body.ilike.%${search}%`);
  }

  query = query.order(sortBy, { ascending: sortDir === "asc" });
  query = query.range((page - 1) * pageSize, page * pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: (data as Review[]) ?? [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

// ── Blog Posts (admin — all) ────────────────────────────────────────────────

export async function getAdminBlogPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as BlogPost[]) ?? [];
}

// ── Gallery (admin) ─────────────────────────────────────────────────────────

export async function getAdminGallery() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order");

  if (error) throw error;
  return (data as GalleryRow[]) ?? [];
}

// ── Fee Groups & Items ──────────────────────────────────────────────────────

export async function getAdminEntranceFees() {
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

// ── Profiles (admin) ────────────────────────────────────────────────────────

export async function getAdminProfiles(params: BookingRequestsParams = {}) {
  const { page = 1, pageSize = 20, search, sortBy = "created_at", sortDir = "desc" } = params;
  const supabase = await createClient();

  let query = supabase.from("profiles").select("*", { count: "exact" });

  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  }

  query = query.order(sortBy, { ascending: sortDir === "asc" });
  query = query.range((page - 1) * pageSize, page * pageSize - 1);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: (data as Profile[]) ?? [],
    total: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

// ── Site Settings ───────────────────────────────────────────────────────────

export async function getAdminSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key");

  if (error) throw error;
  return (data as SiteSetting[]) ?? [];
}

// ── Booking requests over time (for charts) ─────────────────────────────────

export async function getBookingRequestsByDate(days = 30) {
  const supabase = await createClient();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from("booking_requests")
    .select("created_at")
    .gte("created_at", since.toISOString())
    .order("created_at");

  if (error) throw error;

  // Group by date
  const grouped: Record<string, number> = {};
  const rows = (data as Array<{ created_at: string }> | null) ?? [];
  rows.forEach((row) => {
    const date = new Date(row.created_at).toISOString().split("T")[0];
    grouped[date] = (grouped[date] ?? 0) + 1;
  });

  // Fill in missing dates
  const result: Array<{ date: string; count: number }> = [];
  const cursor = new Date(since);
  const today = new Date();
  while (cursor <= today) {
    const dateStr = cursor.toISOString().split("T")[0];
    result.push({ date: dateStr, count: grouped[dateStr] ?? 0 });
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}

// ── Requests by type (for pie chart) ────────────────────────────────────────

export async function getRequestsByType() {
  const supabase = await createClient();

  const [bookings, tourReqs, pickups, contacts] = await Promise.all([
    supabase.from("booking_requests").select("id", { count: "exact", head: true }),
    supabase.from("tour_requests").select("id", { count: "exact", head: true }),
    supabase.from("airport_pickups").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
  ]);

  return [
    { name: "bookings", value: bookings.count ?? 0 },
    { name: "tourRequests", value: tourReqs.count ?? 0 },
    { name: "airportPickups", value: pickups.count ?? 0 },
    { name: "contactMessages", value: contacts.count ?? 0 },
  ];
}
