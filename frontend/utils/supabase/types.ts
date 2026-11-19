/**
 * Supabase Database Types — auto-generated from migration schema
 * Update this file when you change the database schema.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: "guest" | "admin" | "staff";
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "guest" | "admin" | "staff";
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "guest" | "admin" | "staff";
          phone?: string | null;
          updated_at?: string;
        };
      };
      rooms: {
        Row: {
          id: number;
          name: string;
          slug: string;
          price_egp: number;
          price_label: string;
          description: string | null;
          category: "dorm" | "private";
          capacity: number;
          amenities: string[];
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          price_egp: number;
          price_label: string;
          description?: string | null;
          category: "dorm" | "private";
          capacity?: number;
          amenities?: string[];
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["rooms"]["Insert"]> & { updated_at?: string };
      };
      tours: {
        Row: {
          id: number;
          slug: string;
          title: string;
          card_title: string | null;
          category: "history" | "adventure" | "leisure";
          duration: string | null;
          description: string | null;
          image_url: string | null;
          highlights: string[];
          inclusions: string[];
          exclusions: string[];
          notes: string[];
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          slug: string;
          title: string;
          card_title?: string | null;
          category: "history" | "adventure" | "leisure";
          duration?: string | null;
          description?: string | null;
          image_url?: string | null;
          highlights?: string[];
          inclusions?: string[];
          exclusions?: string[];
          notes?: string[];
          sort_order?: number;
          is_active?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["tours"]["Insert"]> & { updated_at?: string };
      };
      tour_itinerary: {
        Row: {
          id: number;
          tour_id: number;
          day_label: string;
          description: string;
          sort_order: number;
        };
        Insert: {
          tour_id: number;
          day_label: string;
          description: string;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["tour_itinerary"]["Insert"]>;
      };
      tour_gallery: {
        Row: {
          id: number;
          tour_id: number;
          image_url: string;
          caption: string | null;
          sort_order: number;
        };
        Insert: {
          tour_id: number;
          image_url: string;
          caption?: string | null;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["tour_gallery"]["Insert"]>;
      };
      fee_groups: {
        Row: {
          id: number;
          group_name: string;
          tagline: string | null;
          note: string | null;
          sort_order: number;
        };
        Insert: {
          group_name: string;
          tagline?: string | null;
          note?: string | null;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["fee_groups"]["Insert"]>;
      };
      fee_items: {
        Row: {
          id: number;
          group_id: number;
          site_name: string;
          price: string;
          is_addon: boolean;
          sort_order: number;
        };
        Insert: {
          group_id: number;
          site_name: string;
          price: string;
          is_addon?: boolean;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["fee_items"]["Insert"]>;
      };
      gallery: {
        Row: {
          id: number;
          image_url: string;
          caption: string | null;
          group_tag: "room" | "terrace" | "tour" | "general" | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          image_url: string;
          caption?: string | null;
          group_tag?: "room" | "terrace" | "tour" | "general" | null;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["gallery"]["Insert"]>;
      };
      blog_posts: {
        Row: {
          id: number;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          image_url: string | null;
          author_id: string | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          author_id?: string | null;
          is_published?: boolean;
          published_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]> & { updated_at?: string };
      };
      reviews: {
        Row: {
          id: number;
          author_name: string;
          author_email: string | null;
          user_id: string | null;
          rating: number | null;
          title: string | null;
          body: string;
          is_approved: boolean;
          created_at: string;
        };
        Insert: {
          author_name: string;
          author_email?: string | null;
          user_id?: string | null;
          rating?: number | null;
          title?: string | null;
          body: string;
          is_approved?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
        };
        Update: {
          key?: string;
          value?: Json;
        };
      };
      contact_messages: {
        Row: {
          id: number;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          subject?: string | null;
          message: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
      };
      tour_requests: {
        Row: {
          id: number;
          name: string;
          email: string;
          guests: number | null;
          period: string | null;
          destinations: string | null;
          message: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          guests?: number | null;
          period?: string | null;
          destinations?: string | null;
          message?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["tour_requests"]["Insert"]>;
      };
      booking_requests: {
        Row: {
          id: number;
          name: string;
          email: string;
          room: string | null;
          check_in: string | null;
          check_out: string | null;
          guests: number | null;
          message: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          room?: string | null;
          check_in?: string | null;
          check_out?: string | null;
          guests?: number | null;
          message?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["booking_requests"]["Insert"]>;
      };
      airport_pickups: {
        Row: {
          id: number;
          name: string;
          email: string;
          phone: string | null;
          airport: string | null;
          arrival_date: string | null;
          arrival_time: string | null;
          flight_no: string | null;
          persons: number;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          phone?: string | null;
          airport?: string | null;
          arrival_date?: string | null;
          arrival_time?: string | null;
          flight_no?: string | null;
          persons?: number;
        };
        Update: Partial<Database["public"]["Tables"]["airport_pickups"]["Insert"]>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
