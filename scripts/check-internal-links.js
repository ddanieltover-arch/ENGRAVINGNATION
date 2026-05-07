const fs = require('fs');
const path = require('path');

const root = process.cwd();
const appDir = path.join(root, 'app');
const componentsDir = path.join(root, 'components');
const publicDir = path.join(root, 'public');

const ignoredPrefixes = ['mailto:', 'tel:', 'http://', 'https://', '#'];
const ignoredRoutes = new Set(['/api/google-feed']);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function routeFromFile(filePath) {
  const rel = filePath.replace(appDir + path.sep, '');
  const normalized = rel.replace(/\\/g, '/');
  if (!normalized.endsWith('/page.tsx')) return null;
  const route = normalized
    .replace('/page.tsx', '')
    .replace(/\(storefront\)\//g, '')
    .replace(/\(storefront\)/g, '')
    .replace(/\(.*?\)\//g, '')
    .replace(/\[.*?\]/g, ':param');
  return route === '' ? '/' : `/${route}`;
}

const appFiles = walk(appDir);
const componentFiles = walk(componentsDir);
const codeFiles = [...appFiles, ...componentFiles];

const knownRoutes = new Set();
for (const file of appFiles) {
  const route = routeFromFile(file);
  if (route) knownRoutes.add(route);
}

const hrefRegex = /href\s*=\s*["'`]([^"'`]+)["'`]/g;
const missingLinks = [];

for (const file of codeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    if (!href.startsWith('/')) continue;
    if (ignoredPrefixes.some((p) => href.startsWith(p))) continue;
    if (ignoredRoutes.has(href)) continue;

    const cleanHref = href.split('?')[0].split('#')[0];
    const publicAssetPath = path.join(publicDir, cleanHref.replace(/^\/+/, ''));
    const existsPublicAsset = fs.existsSync(publicAssetPath);
    const existsExact = knownRoutes.has(cleanHref);
    const existsDynamic = Array.from(knownRoutes).some((r) => {
      if (!r.includes(':param')) return false;
      const base = r.split('/:param')[0];
      return cleanHref.startsWith(`${base}/`);
    });

    if (!existsExact && !existsDynamic && !existsPublicAsset) {
      missingLinks.push({
        file: file.replace(root + path.sep, ''),
        href,
      });
    }
  }
}

if (missingLinks.length > 0) {
  console.error('Internal link check failed. Missing routes referenced:');
  missingLinks.forEach((m) => console.error(`- ${m.href} in ${m.file}`));
  process.exit(1);
}

console.log(`Internal link check passed. Verified ${codeFiles.length} files.`);
