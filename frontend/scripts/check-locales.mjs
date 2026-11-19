import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const locales = ['en', 'ar', 'fr', 'es'];
const namespaces = ['common', 'confirmation', 'admin', 'footer', 'legal', 'nav', 'pages', 'auth'];
const errors = [];

function checkDuplicateKeys(source, file) {
  let index = 0;
  const skipWhitespace = () => {
    while (/\s/.test(source[index] ?? '')) index += 1;
  };
  const parseString = () => {
    const start = index;
    index += 1;
    while (index < source.length) {
      if (source[index] === '\\') index += 2;
      else if (source[index++] === '"') return JSON.parse(source.slice(start, index));
    }
    throw new Error('unterminated JSON string');
  };
  const parseValue = () => {
    skipWhitespace();
    if (source[index] === '"') return parseString();
    if (source[index] === '{') {
      index += 1;
      const keys = new Set();
      skipWhitespace();
      while (source[index] !== '}') {
        const key = parseString();
        if (keys.has(key)) errors.push(`${file}: duplicate key "${key}"`);
        keys.add(key);
        skipWhitespace();
        if (source[index++] !== ':') throw new Error('expected : after object key');
        parseValue();
        skipWhitespace();
        if (source[index] === ',') {
          index += 1;
          skipWhitespace();
        } else if (source[index] !== '}') throw new Error('expected , or } in object');
      }
      index += 1;
      return;
    }
    if (source[index] === '[') {
      index += 1;
      skipWhitespace();
      while (source[index] !== ']') {
        parseValue();
        skipWhitespace();
        if (source[index] === ',') {
          index += 1;
          skipWhitespace();
        } else if (source[index] !== ']') throw new Error('expected , or ] in array');
      }
      index += 1;
      return;
    }
    while (index < source.length && !/[\s,}\]]/.test(source[index])) index += 1;
  };

  try {
    parseValue();
    skipWhitespace();
    if (index !== source.length) throw new Error('unexpected content after JSON value');
  } catch (error) {
    errors.push(`${file}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function compareShape(reference, candidate, location, file) {
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) {
      errors.push(`${file}: ${location} must be an array`);
      return;
    }
    if (reference.length !== candidate.length) errors.push(`${file}: ${location} has a different array length`);
    for (let index = 0; index < Math.min(reference.length, candidate.length); index += 1) {
      compareShape(reference[index], candidate[index], `${location}[${index}]`, file);
    }
    return;
  }

  if (reference && typeof reference === 'object') {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
      errors.push(`${file}: ${location} must be an object`);
      return;
    }
    const expected = Object.keys(reference).sort();
    const actual = Object.keys(candidate).sort();
    for (const key of expected) {
      if (!(key in candidate)) errors.push(`${file}: missing key ${location}.${key}`);
      else compareShape(reference[key], candidate[key], `${location}.${key}`, file);
    }
    for (const key of actual) {
      if (!(key in reference)) errors.push(`${file}: unexpected key ${location}.${key}`);
    }
    return;
  }

  if (typeof candidate !== typeof reference) {
    errors.push(`${file}: ${location} must be a ${typeof reference}`);
  } else if (typeof candidate === 'string' && !candidate.trim()) {
    errors.push(`${file}: ${location} is empty`);
  }
}

const baseDirectory = path.join(root, 'messages');
for (const locale of locales) {
  const localeDirectory = path.join(baseDirectory, locale);
  let entries;
  try {
    entries = await readdir(localeDirectory);
  } catch {
    errors.push(`Missing locale directory: messages/${locale}`);
    continue;
  }

  const expectedFiles = namespaces.map((namespace) => `${namespace}.json`).sort();
  for (const file of expectedFiles) {
    if (!entries.includes(file)) errors.push(`Missing namespace: messages/${locale}/${file}`);
  }
  for (const file of entries) {
    if (file.endsWith('.json') && !expectedFiles.includes(file)) {
      errors.push(`Unexpected namespace file: messages/${locale}/${file}`);
    }
  }
}

for (const namespace of namespaces) {
  let reference;
  try {
    const file = path.join(baseDirectory, 'en', `${namespace}.json`);
    const source = await readFile(file, 'utf8');
    checkDuplicateKeys(source, `messages/en/${namespace}.json`);
    reference = JSON.parse(source);
  } catch (error) {
    errors.push(`messages/en/${namespace}.json: ${error instanceof Error ? error.message : String(error)}`);
    continue;
  }

  for (const locale of locales) {
    if (locale === 'en') continue;
    const relativeFile = `messages/${locale}/${namespace}.json`;
    try {
      const source = await readFile(path.join(baseDirectory, locale, `${namespace}.json`), 'utf8');
      checkDuplicateKeys(source, relativeFile);
      compareShape(reference, JSON.parse(source), namespace, relativeFile);
    } catch (error) {
      errors.push(`${relativeFile}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

if (errors.length) {
  console.error(`Localization check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Localization check passed: ${locales.length} locales, ${namespaces.length} namespaces, matching keys and valid JSON.`);
}
