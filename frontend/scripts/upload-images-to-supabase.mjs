/**
 * Upload local images to Supabase Storage (media bucket)
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=your_service_key node scripts/upload-images-to-supabase.mjs
 *
 * This uploads every file from public/images/ into the Supabase "media" bucket
 * under the "images/" folder, and prints a JSON mapping of local → remote URLs.
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import { config } from "dotenv";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "❌  Set NEXT_PUBLIC_SUPABASE_URL in .env.local and SUPABASE_SERVICE_ROLE_KEY as env var"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const IMAGES_DIR = path.resolve("public/images");
const BUCKET = "media";
const REMOTE_FOLDER = "images";

async function main() {
  const files = fs.readdirSync(IMAGES_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return [".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg"].includes(ext);
  });

  console.log(`📁  Found ${files.length} images in ${IMAGES_DIR}\n`);

  const mapping = {};
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const remotePath = `${REMOTE_FOLDER}/${file}`;
    const localPath = path.join(IMAGES_DIR, file);
    const fileBuffer = fs.readFileSync(localPath);

    // Determine content type
    const ext = path.extname(file).toLowerCase();
    const contentTypes = {
      ".webp": "image/webp",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
    };
    const contentType = contentTypes[ext] || "application/octet-stream";

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(remotePath, fileBuffer, {
        contentType,
        cacheControl: "31536000",
        upsert: true,
      });

    if (error) {
      console.error(`  ❌  ${file}: ${error.message}`);
      failed++;
      continue;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(remotePath);

    mapping[`/images/${file}`] = publicUrl;
    uploaded++;
    console.log(`  ✅  ${file}`);
  }

  console.log(`\n────────────────────────────────────`);
  console.log(`✅  Uploaded: ${uploaded}`);
  console.log(`⏭️   Skipped: ${skipped}`);
  console.log(`❌  Failed:   ${failed}`);
  console.log(`────────────────────────────────────\n`);

  // Write mapping for reference
  const mappingPath = path.resolve("scripts/image-url-mapping.json");
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log(`📄  URL mapping written to ${mappingPath}`);
}

main().catch(console.error);
