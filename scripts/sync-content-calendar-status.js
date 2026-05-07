const fs = require('fs');
const path = require('path');

const calendarPath = path.join(process.cwd(), 'docs', 'seo', 'content-calendar.csv');
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

if (!fs.existsSync(calendarPath) || !fs.existsSync(articlesPath)) {
  console.error('Missing required files for calendar status sync.');
  process.exit(1);
}

const csvLines = fs
  .readFileSync(calendarPath, 'utf8')
  .split(/\r?\n/)
  .filter(Boolean);

if (csvLines.length < 2) {
  console.log('Calendar has no rows to sync.');
  process.exit(0);
}

const header = csvLines[0];
const body = csvLines.slice(1);

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
const publishedTitleSet = new Set(articles.map((a) => normalize(a.title)));

function parseCalendarRow(line) {
  const firstQuote = line.indexOf('"');
  const secondQuote = line.indexOf('"', firstQuote + 1);
  if (firstQuote === -1 || secondQuote === -1) return null;

  const beforeTitle = line.slice(0, firstQuote);
  const title = line.slice(firstQuote + 1, secondQuote);
  const afterTitle = line.slice(secondQuote + 1);

  const publishDate = beforeTitle.replace(/,$/, '').trim();
  const trailing = afterTitle.startsWith(',') ? afterTitle.slice(1) : afterTitle;
  const parts = trailing.split(',');
  if (parts.length < 4) return null;

  return {
    publishDate,
    title,
    contentType: parts[0].trim(),
    keyword: parts[1].trim(),
    assignedTo: parts[2].trim(),
    status: parts.slice(3).join(',').trim(),
  };
}

let updatedCount = 0;
const nextRows = body.map((line) => {
  const parsed = parseCalendarRow(line);
  if (!parsed) return line;

  const { publishDate, title, contentType, keyword, assignedTo, status } = parsed;
  const titleKey = normalize(title);

  if (publishedTitleSet.has(titleKey) && status !== 'Published') {
    updatedCount += 1;
    return `${publishDate},"${title}",${contentType},${keyword},${assignedTo},Published`;
  }

  return line;
});

fs.writeFileSync(calendarPath, [header, ...nextRows].join('\n') + '\n', 'utf8');
console.log(`Calendar status sync complete. Updated ${updatedCount} rows to Published.`);
