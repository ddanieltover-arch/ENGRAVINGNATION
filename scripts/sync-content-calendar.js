const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const calendarPath = path.join(process.cwd(), 'docs', 'seo', 'content-calendar.csv');
const briefsDir = path.join(process.cwd(), 'docs', 'seo', 'content_briefs');
const SCHEDULE_STATUSES = new Set(['planned', 'scheduled']);

function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  fields.push(current.trim());
  return fields;
}

function parseCalendarDate(dateText) {
  const parsed = new Date(dateText);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeCalendarFields(fields) {
  if (fields.length <= 6) return fields;
  // Handle legacy rows where date contains an unquoted comma: "May 10, 2026,..."
  const mergedDate = `${fields[0]}, ${fields[1]}`.trim();
  return [mergedDate, ...fields.slice(2)];
}

if (!fs.existsSync(calendarPath) || !fs.existsSync(briefsDir)) {
  console.error('Required SEO files are missing (content-calendar.csv or content_briefs).');
  process.exit(1);
}

const calendarLines = fs
  .readFileSync(calendarPath, 'utf8')
  .split(/\r?\n/)
  .filter(Boolean);

const header = 'Publish Date,Title/Topic,Content Type,Target Keyword,Assigned To,Status';
const existingBody = calendarLines.slice(1);
const existingTitles = new Set();
const dedupedExistingBody = [];
let latestPlannedDate = null;

for (const line of existingBody) {
  const fields = normalizeCalendarFields(parseCsvLine(line));
  const [publishDate = '', title = '', , , , status = ''] = fields;
  const cleanTitle = title.trim();

  if (SCHEDULE_STATUSES.has(status.toLowerCase())) {
    const rowDate = parseCalendarDate(publishDate);
    if (rowDate && (!latestPlannedDate || rowDate > latestPlannedDate)) {
      latestPlannedDate = rowDate;
    }
  }

  if (!cleanTitle) {
    dedupedExistingBody.push(line);
    continue;
  }

  if (existingTitles.has(cleanTitle)) continue;
  existingTitles.add(cleanTitle);
  dedupedExistingBody.push(line);
}

const briefFiles = fs
  .readdirSync(briefsDir)
  .filter((name) => name.endsWith('.md'))
  .sort((a, b) => a.localeCompare(b));

const briefRows = [];
const scheduleDate = latestPlannedDate ? new Date(latestPlannedDate) : new Date();
scheduleDate.setDate(scheduleDate.getDate() + 3);

for (const file of briefFiles) {
  const fullPath = path.join(briefsDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');

  const title = (content.match(/^TITLE:\s*(.+)$/m) || [])[1]?.trim();
  const keyword = (content.match(/^PRIMARY KEYWORD:\s*(.+)$/m) || [])[1]?.trim();
  const type = (content.match(/^CONTENT TYPE:\s*(.+)$/m) || [])[1]?.trim();

  if (!title || !keyword || !type) continue;
  if (existingTitles.has(title)) continue;

  const dateLabel = scheduleDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  scheduleDate.setDate(scheduleDate.getDate() + 3);

  const safeTitle = title.replace(/"/g, '""');
  briefRows.push(`${dateLabel},"${safeTitle}",${type},${keyword},Team,Planned`);
}

const merged = [header, ...dedupedExistingBody, ...briefRows].join('\n') + '\n';
fs.writeFileSync(calendarPath, merged, 'utf8');

console.log(`Content calendar synced. Added ${briefRows.length} planned rows from content briefs.`);

try {
  execSync('node scripts/sync-content-calendar-status.js', { stdio: 'inherit' });
} catch (error) {
  console.warn('Warning: unable to run status sync after calendar merge.');
}

try {
  execSync('node scripts/sync-content-execution-status.js', { stdio: 'inherit' });
} catch (error) {
  console.warn('Warning: unable to run content execution tracker sync after calendar merge.');
}
