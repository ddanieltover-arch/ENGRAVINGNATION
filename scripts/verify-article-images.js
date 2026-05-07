const fs = require('fs');
const path = require('path');

const articlesPath = path.join(process.cwd(), 'data', 'articles.json');
const publicPath = path.join(process.cwd(), 'public');
const fallbackImage = '/og-image.jpg';

if (!fs.existsSync(articlesPath)) {
  console.error('articles.json not found.');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
const missing = [];

const fallbackPath = path.join(publicPath, fallbackImage.slice(1));
if (!fs.existsSync(fallbackPath)) {
  console.error(`Fallback image is missing: ${fallbackImage}`);
  process.exit(1);
}

for (const article of articles) {
  const image = article.image || fallbackImage;
  const normalized = image.startsWith('/') ? image.slice(1) : image;
  const imagePath = path.join(publicPath, normalized);

  if (!fs.existsSync(imagePath)) {
    missing.push({
      slug: article.slug,
      title: article.title,
      image,
    });
  }
}

if (missing.length > 0) {
  console.warn('Article image check warning. Missing image files (runtime fallback will be used):');
  missing.forEach((m) => {
    console.warn(`- ${m.slug}: ${m.image}`);
  });
  console.log(`Validated fallback image (${fallbackImage}) for all unresolved article assets.`);
  process.exit(0);
}

console.log(`Article image check passed for ${articles.length} articles.`);
