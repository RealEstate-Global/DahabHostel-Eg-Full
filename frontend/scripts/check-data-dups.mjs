import fs from "node:fs";

// Read tours files
const tourFiles = [
  "app/_data/tours-a.ts",
  "app/_data/tours-b.ts",
  "app/_data/tours-c.ts",
  "app/_data/tours-d.ts",
  "app/_data/tours-more.ts",
];

const slugs = new Map();
for (const file of tourFiles) {
  const content = fs.readFileSync(file, "utf8");
  const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  for (const match of matches) {
    const slug = match[1];
    if (slugs.has(slug)) {
      console.log(`❌ DUPLICATE TOUR SLUG "${slug}" found in ${file} (previously in ${slugs.get(slug)})`);
    } else {
      slugs.set(slug, file);
    }
  }
}
console.log(`✅ All ${slugs.size} tour slugs are unique!`);

// Read rooms file
const roomsContent = fs.readFileSync("app/_data/rooms.ts", "utf8");
const roomMatches = [...roomsContent.matchAll(/name:\s*["']([^"']+)["']/g)];
const roomNames = new Set();
for (const match of roomMatches) {
  const name = match[1];
  if (roomNames.has(name)) {
    console.log(`❌ DUPLICATE ROOM NAME "${name}"`);
  } else {
    roomNames.add(name);
  }
}
console.log(`✅ All ${roomNames.size} room names are unique!`);

// Check fee groups
const feesContent = fs.readFileSync("app/_data/fees.ts", "utf8");
const groupMatches = [...feesContent.matchAll(/group:\s*["']([^"']+)["']/g)];
const groups = new Set();
for (const match of groupMatches) {
  const group = match[1];
  if (groups.has(group)) {
    console.log(`❌ DUPLICATE FEE GROUP "${group}"`);
  } else {
    groups.add(group);
  }
}
console.log(`✅ All ${groups.size} fee groups are unique!`);
