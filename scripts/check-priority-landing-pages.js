const fs = require('fs');
const path = require('path');

const requiredRoutes = [
  '/chevy-emblem',
  '/chevy-bowtie',
  '/corvette-emblem',
  '/chevy-bowtie-fitment-pdf-download',
];

const appDir = path.join(process.cwd(), 'app', '(storefront)');
const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts');

function routeToPagePath(route) {
  const cleanRoute = route.replace(/^\/+/, '');
  return path.join(appDir, cleanRoute, 'page.tsx');
}

const missingPages = requiredRoutes.filter((route) => !fs.existsSync(routeToPagePath(route)));
if (missingPages.length > 0) {
  console.error('Priority landing page check failed: required pages are missing:');
  missingPages.forEach((route) => console.error(`- ${route}`));
  process.exit(1);
}

if (!fs.existsSync(sitemapPath)) {
  console.error('Priority landing page check failed: app/sitemap.ts is missing.');
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const missingSitemapRoutes = requiredRoutes.filter((route) => !sitemapContent.includes(`'${route}'`));
if (missingSitemapRoutes.length > 0) {
  console.error('Priority landing page check failed: routes missing from sitemap config:');
  missingSitemapRoutes.forEach((route) => console.error(`- ${route}`));
  process.exit(1);
}

console.log(
  `Priority landing page check passed. ${requiredRoutes.length} required routes exist and are present in sitemap config.`
);
