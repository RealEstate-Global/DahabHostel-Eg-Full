import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  date,
  uuid,
  jsonb,
  bigint,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. PROFILES (linked to Supabase auth.users)
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email"),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").notNull().default("guest"),
  phone: text("phone"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 2. ROOMS
export const rooms = pgTable("rooms", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  priceEgp: integer("price_egp").notNull(),
  priceLabel: text("price_label").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  capacity: integer("capacity").default(1),
  amenities: text("amenities").array().default([]),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 3. TOURS
export const tours = pgTable("tours", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  cardTitle: text("card_title"),
  category: text("category").notNull(),
  duration: text("duration"),
  description: text("description"),
  imageUrl: text("image_url"),
  highlights: text("highlights").array().default([]),
  inclusions: text("inclusions").array().default([]),
  exclusions: text("exclusions").array().default([]),
  notes: text("notes").array().default([]),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 3a. TOUR ITINERARY
export const tourItinerary = pgTable("tour_itinerary", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  tourId: bigint("tour_id", { mode: "number" })
    .notNull()
    .references(() => tours.id, { onDelete: "cascade" }),
  dayLabel: text("day_label").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").default(0),
});

// 3b. TOUR GALLERY
export const tourGallery = pgTable("tour_gallery", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  tourId: bigint("tour_id", { mode: "number" })
    .notNull()
    .references(() => tours.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  sortOrder: integer("sort_order").default(0),
});

// 4. ENTRANCE FEES
export const feeGroups = pgTable("fee_groups", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  groupName: text("group_name").notNull(),
  tagline: text("tagline"),
  note: text("note"),
  sortOrder: integer("sort_order").default(0),
});

export const feeItems = pgTable("fee_items", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  groupId: bigint("group_id", { mode: "number" })
    .notNull()
    .references(() => feeGroups.id, { onDelete: "cascade" }),
  siteName: text("site_name").notNull(),
  price: text("price").notNull(),
  isAddon: boolean("is_addon").default(false),
  sortOrder: integer("sort_order").default(0),
});

// 5. GALLERY
export const gallery = pgTable("gallery", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  groupTag: text("group_tag"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 6. BLOG POSTS
export const blogPosts = pgTable("blog_posts", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  imageUrl: text("image_url"),
  authorId: uuid("author_id").references(() => profiles.id),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 7. REVIEWS
export const reviews = pgTable("reviews", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  authorName: text("author_name").notNull(),
  authorEmail: text("author_email"),
  userId: uuid("user_id").references(() => profiles.id),
  rating: integer("rating"),
  title: text("title"),
  body: text("body").notNull(),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 8. SITE SETTINGS
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 9. FORMS
export const contactMessages = pgTable("contact_messages", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const tourRequests = pgTable("tour_requests", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  guests: integer("guests"),
  period: text("period"),
  destinations: text("destinations"),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const bookingRequests = pgTable("booking_requests", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  room: text("room"),
  checkIn: date("check_in"),
  checkOut: date("check_out"),
  guests: integer("guests"),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const airportPickups = pgTable("airport_pickups", {
  id: bigint("id", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  airport: text("airport"),
  arrivalDate: text("arrival_date"),
  arrivalTime: text("arrival_time"),
  flightNo: text("flight_no"),
  persons: integer("persons").default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// RELATIONS
export const toursRelations = relations(tours, ({ many }) => ({
  itinerary: many(tourItinerary),
  gallery: many(tourGallery),
}));

export const tourItineraryRelations = relations(tourItinerary, ({ one }) => ({
  tour: one(tours, {
    fields: [tourItinerary.tourId],
    references: [tours.id],
  }),
}));

export const tourGalleryRelations = relations(tourGallery, ({ one }) => ({
  tour: one(tours, {
    fields: [tourGallery.tourId],
    references: [tours.id],
  }),
}));

export const feeGroupsRelations = relations(feeGroups, ({ many }) => ({
  items: many(feeItems),
}));

export const feeItemsRelations = relations(feeItems, ({ one }) => ({
  group: one(feeGroups, {
    fields: [feeItems.groupId],
    references: [feeGroups.id],
  }),
}));

export const profilesRelations = relations(profiles, ({ many }) => ({
  blogPosts: many(blogPosts),
  reviews: many(reviews),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(profiles, {
    fields: [blogPosts.authorId],
    references: [profiles.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(profiles, {
    fields: [reviews.userId],
    references: [profiles.id],
  }),
}));
