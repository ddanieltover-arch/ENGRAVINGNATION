const fs = require('fs');
const path = require('path');

const trackerPath = path.join(process.cwd(), 'docs', 'seo', 'content_execution_tracker.csv');
const articlesPath = path.join(process.cwd(), 'data', 'articles.json');

function normalize(value) {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(2024|2025|2026)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current);
  return values.map((v) => v.trim());
}

function toCsvLine(values) {
  return values
    .map((value) => {
      if (value == null) return '';
      const str = String(value);
      if (str.includes(',') || str.includes('"')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    })
    .join(',');
}

if (!fs.existsSync(trackerPath) || !fs.existsSync(articlesPath)) {
  console.error('Missing required files for content execution tracker sync.');
  process.exit(1);
}

const lines = fs
  .readFileSync(trackerPath, 'utf8')
  .split(/\r?\n/)
  .filter(Boolean);

if (lines.length < 2) {
  console.log('Content execution tracker has no rows to sync.');
  process.exit(0);
}

const header = lines[0];
const rows = lines.slice(1);
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

const articleBySlug = new Map();
const articleByTitle = new Map();
for (const article of articles) {
  articleBySlug.set(article.slug, article);
  articleByTitle.set(normalize(article.title), article);
}

let updatedCount = 0;
const syncedRows = rows.map((line) => {
  const cols = parseCsvLine(line);
  if (cols.length < 12) return line;

  const [
    briefId,
    contentTitle,
    plannedUrl,
    owner,
    stage,
    plannedPublishDate,
    primaryKpi,
    primaryTarget,
    secondaryKpi,
    secondaryTarget,
    publishUrl,
    status,
  ] = cols;

  const plannedSlug = (plannedUrl || '').replace(/^\/articles\//, '').trim();
  const matchedArticle =
    articleBySlug.get(plannedSlug) ||
    articleByTitle.get(normalize(contentTitle));

  if (!matchedArticle) {
    return line;
  }

  const nextPublishUrl = `/articles/${matchedArticle.slug}`;
  const nextStage = stage === 'Published' ? stage : 'Published';
  const nextStatus = status === 'Published' ? status : 'Published';

  if (nextPublishUrl !== publishUrl || nextStage !== stage || nextStatus !== status) {
    updatedCount += 1;
  }

  return toCsvLine([
    briefId,
    contentTitle,
    plannedUrl,
    owner,
    nextStage,
    plannedPublishDate,
    primaryKpi,
    primaryTarget,
    secondaryKpi,
    secondaryTarget,
    nextPublishUrl,
    nextStatus,
  ]);
});

fs.writeFileSync(trackerPath, [header, ...syncedRows].join('\n') + '\n', 'utf8');
console.log(`Content execution tracker sync complete. Updated ${updatedCount} rows.`);
