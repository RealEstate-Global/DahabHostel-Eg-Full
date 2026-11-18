/**
 * Supabase Storage helpers
 * Use these to upload / get public URLs for media files.
 */
import { createClient } from "./client";

const MEDIA_BUCKET = "media";
const AVATARS_BUCKET = "avatars";

/**
 * Get public URL for a file in the media bucket
 */
export function getMediaUrl(path: string): string {
  const supabase = createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return publicUrl;
}

/**
 * Upload a file to the media bucket (admin only)
 */
export async function uploadMedia(
  file: File,
  folder: string = "images"
): Promise<{ url: string; path: string } | { error: string }> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return { error: error.message };

  const url = getMediaUrl(fileName);
  return { url, path: fileName };
}

/**
 * Upload an avatar for the current user
 */
export async function uploadAvatar(
  userId: string,
  file: File
): Promise<{ url: string } | { error: string }> {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const fileName = `${userId}/avatar.${ext}`;

  const { error } = await supabase.storage
    .from(AVATARS_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) return { error: error.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from(AVATARS_BUCKET).getPublicUrl(fileName);

  // Update profile
  await (supabase
    .from("profiles") as any)
    .update({ avatar_url: publicUrl })
    .eq("id", userId);

  return { url: publicUrl };
}

/**
 * Delete a file from the media bucket (admin only)
 */
export async function deleteMedia(path: string): Promise<{ error?: string }> {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .remove([path]);

  if (error) return { error: error.message };
  return {};
}

/**
 * List files in a folder in the media bucket
 */
export async function listMedia(folder: string = "images") {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .list(folder, { sortBy: { column: "name", order: "asc" } });

  if (error) throw error;
  return data;
}
