const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');
const results = [];
const REQUIRED_SEO_TEMPLATES = new Set([
  'app\\layout.tsx',
  'app\\(storefront)\\page.tsx',
  'app\\(storefront)\\products\\page.tsx',
  'app\\(storefront)\\products\\[slug]\\page.tsx',
  'app\\(storefront)\\articles\\page.tsx',
  'app\\(storefront)\\articles\\[slug]\\page.tsx',
  'app\\(storefront)\\services\\page.tsx',
  'app\\(storefront)\\about\\page.tsx',
  'app\\(storefront)\\gallery\\page.tsx',
  'app\\(storefront)\\glossary\\page.tsx',
  'app\\(storefront)\\faq\\page.tsx',
  'app\\(storefront)\\fitment\\page.tsx',
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (entry.name === 'page.tsx' || entry.name === 'layout.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      const hasMetadata = content.includes('export const metadata') || content.includes('generateMetadata');
      results.push({
        file: fullPath.replace(process.cwd() + path.sep, ''),
        hasMetadata,
      });
    }
  }
}

walk(appDir);

const missing = results.filter(
  (r) => REQUIRED_SEO_TEMPLATES.has(r.file.replace(/\//g, '\\')) && !r.hasMetadata
);
if (missing.length > 0) {
  console.error('SEO audit failed: missing metadata in templates:');
  missing.forEach((m) => console.error(`- ${m.file}`));
  process.exit(1);
}

console.log(`SEO audit passed. Checked ${results.length} templates.`);
