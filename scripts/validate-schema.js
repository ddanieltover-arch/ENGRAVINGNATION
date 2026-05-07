const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');
const pagesWithSchema = [];
const dynamicDetailPages = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (entry.name !== 'page.tsx' && entry.name !== 'layout.tsx') continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('application/ld+json')) {
      pagesWithSchema.push(fullPath);
    }
    if (fullPath.includes('[slug]') && entry.name === 'page.tsx') {
      dynamicDetailPages.push({
        file: fullPath,
        hasSchema: content.includes('application/ld+json'),
      });
    }
  }
}

walk(appDir);

const missingDynamicSchema = dynamicDetailPages.filter((p) => !p.hasSchema);
if (missingDynamicSchema.length > 0) {
  console.error('Schema validation failed: dynamic detail pages missing JSON-LD:');
  missingDynamicSchema.forEach((p) => console.error(`- ${p.file.replace(process.cwd() + path.sep, '')}`));
  process.exit(1);
}

if (pagesWithSchema.length === 0) {
  console.error('Schema validation failed: no JSON-LD scripts detected.');
  process.exit(1);
}

console.log(
  `Schema validation passed. JSON-LD found on ${pagesWithSchema.length} templates; dynamic detail pages validated: ${dynamicDetailPages.length}.`
);
