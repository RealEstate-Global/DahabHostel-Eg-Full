import fs from "node:fs";
import path from "node:path";

function findDuplicateKeys(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const duplicates = [];

  // Parse JSON and check using custom reviver
  const seenInObject = new Map();
  let depth = 0;

  // Simple token based check
  const lines = content.split("\n");
  const stack = [new Set()];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes("{")) {
      stack.push(new Set());
    }
    const match = line.match(/^"([^"]+)"\s*:/);
    if (match) {
      const key = match[1];
      const scope = stack[stack.length - 1];
      if (scope.has(key)) {
        duplicates.push({ line: i + 1, key });
      } else {
        scope.add(key);
      }
    }
    if (line.includes("}")) {
      if (stack.length > 1) stack.pop();
    }
  }

  return duplicates;
}

const langs = ["en", "ar", "es", "fr"];
const files = ["nav", "footer", "legal", "common"];

console.log("=== CHECKING DUPLICATE KEYS IN JSON FILES ===");
let hasDups = false;
for (const lang of langs) {
  for (const f of files) {
    const p = path.join("messages", lang, `${f}.json`);
    const dups = findDuplicateKeys(p);
    if (dups.length > 0) {
      console.log(`❌ DUPLICATES in ${p}:`, dups);
      hasDups = true;
    } else {
      console.log(`✅ OK: ${p}`);
    }
  }
}

if (!hasDups) {
  console.log("\n✨ All JSON files are completely free of duplicate keys!");
}
