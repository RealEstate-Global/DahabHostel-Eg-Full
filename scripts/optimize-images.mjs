#!/usr/bin/env node
/**
 * Optimizes the static images in public/images.
 *
 * - Converts every JPEG/PNG source to compressed WebP at its ORIGINAL
 *   resolution (EXIF orientation applied, metadata stripped).
 * - When several sources share a stem (e.g. `tours--terrace.jpg` and
 *   `tours--terrace.jpeg`), the highest-resolution file wins.
 * - Keeps a JPEG social-share cover (og-cover.jpg) since some platforms
 *   (Facebook, LinkedIn) do not render WebP link previews.
 * - With --fix-refs, rewrites image paths in app/** to the new .webp files.
 * - With --clean, removes the original JPEG/PNG sources once every one of
 *   them has a WebP counterpart on disk.
 *
 * Usage:
 *   node scripts/optimize-images.mjs             # convert to .webp
 *   node scripts/optimize-images.mjs --fix-refs  # convert + update code refs
 *   node scripts/optimize-images.mjs --clean     # convert + delete originals
 *   node scripts/optimize-images.mjs --dry-run   # report only, write nothing
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const IMAGES_DIR = fileURLToPath(new URL("../public/images/", import.meta.url));
const APP_DIR = fileURLToPath(new URL("../app/", import.meta.url));

const DRY_RUN = process.argv.includes("--dry-run");
const CLEAN = process.argv.includes("--clean");
const FIX_REFS = process.argv.includes("--fix-refs");

/**
 * The cropped "DAHAB" mark and the full logo share the same file stem but
 * are different images — the full one gets a distinct output name.
 */
const SPECIAL_TARGETS = {
  "1c76110e3757dac2f674c7be0dcdade0.jpg": "1c76110e3757dac2f674c7be0dcdade0-full.webp",
};

/** Files that must never be converted or deleted. */
const KEEP_FILES = new Set(["og-cover.jpg"]);

/** Flat graphics / logos keep more quality so text stays crisp. */
const HIGH_QUALITY_STEMS = new Set([
  "1c76110e3757dac2f674c7be0dcdade0",
  "1c76110e3757dac2f674c7be0dcdade0-full",
]);
const GRAPHIC_STEMS = /tripadvisor|certificate/i;

const REF_RE = /(["'`])(\/images\/[^"'`]+?)\.(?:jpg|jpeg|png)(?=["'`])/g;

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const pad = (s, n) => String(s).padEnd(n);

async function listImages() {
  const names = await fs.readdir(IMAGES_DIR);
  return names.filter((n) => /\.(jpe?g|png|webp)$/i.test(n) && !KEEP_FILES.has(n)).sort();
}

async function walk(dir, exts) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p, exts)));
    else if (exts.test(entry.name)) out.push(p);
  }
  return out;
}

function qualityFor(targetStem, hasAlpha) {
  if (HIGH_QUALITY_STEMS.has(targetStem)) return 92;
  if (GRAPHIC_STEMS.test(targetStem)) return 90;
  if (hasAlpha) return 85;
  return 80;
}

async function convert() {
  const names = await listImages();
  const infos = await Promise.all(
    names.map(async (name) => {
      const filePath = path.join(IMAGES_DIR, name);
      const [stat, meta] = await Promise.all([fs.stat(filePath), sharp(filePath).metadata()]);
      return {
        name,
        filePath,
        bytes: stat.size,
        width: meta.width,
        height: meta.height,
        format: meta.format,
        hasAlpha: Boolean(meta.hasAlpha),
        area: (meta.width || 0) * (meta.height || 0),
      };
    })
  );

  // Group sources by their WebP output name; highest resolution wins.
  const groups = new Map();
  for (const info of infos) {
    const target = SPECIAL_TARGETS[info.name] ?? info.name.replace(/\.(jpe?g|png)$/i, ".webp");
    if (!groups.has(target)) groups.set(target, []);
    groups.get(target).push(info);
  }

  const plan = [...groups.entries()].map(([target, sources]) => {
    sources.sort((a, b) => b.area - a.area || b.bytes - a.bytes);
    return { target, winner: sources[0], sources };
  });

  let inputTotal = 0;
  let outputTotal = 0;
  let converted = 0;
  let kept = 0;
  const failures = [];

  console.log(`\nOptimizing ${infos.length} source file(s) in public/images${DRY_RUN ? " (dry run)" : ""}:\n`);
  console.log(`${pad("output", 46)} ${pad("source", 26)} ${pad("before", 11)} ${pad("after", 11)} status`);

  for (const { target, winner, sources } of plan) {
    const targetPath = path.join(IMAGES_DIR, target);
    const targetExists = sources.some((s) => s.name === target) || exists(targetPath);
    inputTotal += sources.reduce((sum, s) => sum + s.bytes, 0);

    try {
      if (winner.format === "webp" && targetExists) {
        // Already a WebP sitting at its final path — leave the bytes alone.
        kept += 1;
        outputTotal += winner.bytes;
        console.log(
          `${pad(target, 46)} ${pad(winner.name, 26)} ${pad(kb(winner.bytes), 11)} ${pad(kb(winner.bytes), 11)} kept (already webp)`
        );
        continue;
      }

      const stem = path.basename(target, ".webp");
      const quality = qualityFor(stem, winner.hasAlpha);

      if (!DRY_RUN) {
        await sharp(winner.filePath)
          .rotate() // apply EXIF orientation before it gets stripped
          .webp({ quality, effort: 6, smartSubsample: true })
          .toFile(targetPath);
      }

      const afterBytes = DRY_RUN ? Math.round(winner.bytes * 0.15) : (await fs.stat(targetPath)).size;
      converted += 1;
      outputTotal += afterBytes;
      const alias = sources.length > 1 ? ` (+${sources.length - 1} duplicate${sources.length > 2 ? "s" : ""})` : "";
      console.log(
        `${pad(target, 46)} ${pad(winner.name, 26)} ${pad(kb(winner.bytes), 11)} ${pad(kb(afterBytes), 11)} converted q${quality}${alias}`
      );
    } catch (err) {
      failures.push(`${target}: ${err.message}`);
      console.log(`${pad(target, 46)} ${pad(winner.name, 26)} ${pad(kb(winner.bytes), 11)} ${pad("-", 11)} FAILED ${err.message}`);
    }
  }

  // Social-share cover (JPEG — some platforms don't render WebP previews).
  const ogPath = path.join(IMAGES_DIR, "og-cover.jpg");
  if (!(await exists(ogPath))) {
    const source =
      infos.find((i) => i.name === "tours--home-banner.jpg") ||
      infos.find((i) => i.name === "tours--home-banner.webp");
    if (source && !DRY_RUN) {
      try {
        await sharp(source.filePath)
          .rotate()
          .resize(1200, 630, { fit: "cover", position: "attention" })
          .jpeg({ quality: 85, progressive: true })
          .toFile(ogPath);
        const size = (await fs.stat(ogPath)).size;
        outputTotal += size;
        console.log(`${pad("og-cover.jpg", 46)} ${pad("from " + source.name, 26)} ${pad("", 11)} ${pad(kb(size), 11)} generated`);
      } catch (err) {
        failures.push(`og-cover.jpg: ${err.message}`);
      }
    } else if (DRY_RUN) {
      console.log(`${pad("og-cover.jpg", 46)} ${pad("from home-banner", 26)} ${pad("", 11)} ${pad("-", 11)} would generate`);
    }
  }

  console.log(
    `\nTotal: ${kb(inputTotal)} of JPEG/PNG sources → ${kb(outputTotal)} of WebP` +
      (inputTotal ? ` (${Math.max(0, Math.round((1 - outputTotal / inputTotal) * 100))}% smaller)` : "") +
      `\nConverted: ${converted}, kept as-is: ${kept}`
  );

  if (failures.length) {
    console.error(`\n${failures.length} failure(s):\n- ${failures.join("\n- ")}`);
    process.exitCode = 1;
  }

  return { infos, plan, failures };
}

async function clean(infos, plan) {
  // Safety: every source must have its WebP counterpart on disk first.
  const missing = [];
  for (const { target } of plan) {
    if (!(await exists(path.join(IMAGES_DIR, target)))) missing.push(target);
  }
  if (missing.length) {
    console.error(`\nRefusing to delete originals — missing outputs:\n- ${missing.join("\n- ")}`);
    process.exitCode = 1;
    return;
  }

  // Delete every source that is not itself the final .webp file.
  const toDelete = infos.filter((i) => {
    const target = SPECIAL_TARGETS[i.name] ?? i.name.replace(/\.(jpe?g|png)$/i, ".webp");
    return i.name !== target;
  });

  let freed = 0;
  for (const info of toDelete) {
    if (DRY_RUN) {
      console.log(`would delete ${info.name} (${kb(info.bytes)})`);
      continue;
    }
    await fs.unlink(info.filePath);
    freed += info.bytes;
  }
  console.log(
    DRY_RUN
      ? `\nDry run: ${toDelete.length} original file(s) would be deleted.`
      : `\nDeleted ${toDelete.length} original file(s), freeing ${kb(freed)}.`
  );
}

function exists(p) {
  return fs.access(p).then(
    () => true,
    () => false
  );
}

async function fixRefs() {
  const files = await walk(APP_DIR, /\.(ts|tsx)$/);
  let changed = 0;
  for (const file of files) {
    const src = await fs.readFile(file, "utf8");
    const out = src.replace(REF_RE, (match, quote, imgPath) =>
      imgPath === "/images/og-cover" ? match : `${quote}${imgPath}.webp`
    );
    if (out !== src) {
      changed += 1;
      if (!DRY_RUN) await fs.writeFile(file, out);
      console.log(`  ${DRY_RUN ? "would update" : "updated"} ${path.relative(process.cwd(), file)}`);
    }
  }
  console.log(`\nImage references ${DRY_RUN ? "to update" : "updated"} in ${changed} file(s).`);
}

const { infos, plan, failures } = await convert();
if (FIX_REFS) await fixRefs();
if (CLEAN && failures.length === 0) await clean(infos, plan);
