const fs = require('fs');
const path = require('path');

function parseCsv(content) {
  const lines = content.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };

  const parseLine = (line) => {
    const out = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }
      if (ch === ',' && !inQuotes) {
        out.push(current.trim());
        current = '';
        continue;
      }
      current += ch;
    }
    out.push(current.trim());
    return out;
  };

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine).filter((r) => r.length > 0);
  return { headers, rows };
}

function getVal(rowObj, keys) {
  for (const key of keys) {
    if (rowObj[key] != null && rowObj[key] !== '') return rowObj[key];
  }
  return '';
}

function toCsvLine(values) {
  return values
    .map((v) => {
      const s = String(v ?? '');
      if (s.includes(',') || s.includes('"')) return `"${s.replace(/"/g, '""')}"`;
      return s;
    })
    .join(',');
}

function domainFromUrl(url) {
  if (!url) return '';
  try {
    if (!/^https?:\/\//i.test(url)) return url.replace(/^www\./i, '').toLowerCase();
    const host = new URL(url).hostname;
    return host.replace(/^www\./i, '').toLowerCase();
  } catch {
    return '';
  }
}

function scoreToxicity(rowObj) {
  const domain = getVal(rowObj, ['domain', 'referring domain', 'source domain']).toLowerCase();
  const anchor = getVal(rowObj, ['anchor', 'anchor text']).toLowerCase();
  const tld = domain.split('.').pop() || '';
  const drRaw = getVal(rowObj, ['dr', 'domain rating', 'authority']);
  const trafficRaw = getVal(rowObj, ['traffic', 'organic traffic', 'domain traffic']);
  const dofollow = getVal(rowObj, ['dofollow', 'follow']).toLowerCase();
  const language = getVal(rowObj, ['language', 'lang']).toLowerCase();

  const dr = Number.parseFloat(drRaw || '0') || 0;
  const traffic = Number.parseFloat(trafficRaw || '0') || 0;

  let score = 0;
  const reasons = [];

  if (dr > 0 && dr < 15) {
    score += 20;
    reasons.push('Very low domain authority');
  }
  if (traffic >= 0 && traffic < 20) {
    score += 15;
    reasons.push('Very low/zero organic traffic');
  }
  if (['xyz', 'top', 'click', 'work', 'bid'].includes(tld)) {
    score += 15;
    reasons.push('High-risk TLD pattern');
  }
  if (dofollow === 'yes' || dofollow === 'true' || dofollow === 'dofollow') {
    score += 10;
    reasons.push('Dofollow link from weak domain');
  }
  if (language && !['en', 'english'].includes(language)) {
    score += 10;
    reasons.push('Non-target language source');
  }
  if (
    /(casino|pills|viagra|loan|betting|adult|crypto pump|free backlinks|seo service)/i.test(anchor)
  ) {
    score += 40;
    reasons.push('Spam anchor text pattern');
  }
  if (
    /(directory|backlinks?|seo|submit|profile|forum|bookmark)/i.test(domain)
  ) {
    score += 15;
    reasons.push('Directory/profile/forum footprint');
  }

  if (score > 100) score = 100;
  return { score, reasons };
}

function main() {
  const inputArg = process.argv[2];
  if (!inputArg) {
    console.error('Usage: node scripts/import-backlink-audit.js <input-backlinks.csv>');
    process.exit(1);
  }

  const inputPath = path.isAbsolute(inputArg)
    ? inputArg
    : path.join(process.cwd(), inputArg);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const seoDir = path.join(process.cwd(), 'docs', 'seo');
  const auditOut = path.join(seoDir, 'backlink_toxic_audit.csv');
  const disavowOut = path.join(seoDir, 'disavow.txt');

  const { headers, rows } = parseCsv(fs.readFileSync(inputPath, 'utf8'));
  if (headers.length === 0 || rows.length === 0) {
    console.error('Input CSV has no data.');
    process.exit(1);
  }

  const normalizedHeaders = headers.map((h) => h.toLowerCase().trim());
  const hasBacklinkColumns =
    normalizedHeaders.some((h) =>
      ['referring domain', 'source domain', 'source url', 'anchor', 'anchor text', 'dr', 'domain rating'].includes(h)
    );
  const looksLikeProcessedAudit =
    normalizedHeaders.includes('toxicity score') &&
    normalizedHeaders.includes('disavow action');

  if (!hasBacklinkColumns || looksLikeProcessedAudit) {
    console.error(
      'Input CSV does not look like a raw backlink export. Provide Ahrefs/GSC/SEMrush backlink rows (referring domain/source URL/anchor/DR).'
    );
    process.exit(1);
  }

  const mappedRows = rows.map((row) => {
    const obj = {};
    normalizedHeaders.forEach((h, i) => {
      obj[h] = row[i] || '';
    });
    const sourceUrl = getVal(obj, ['source url', 'url', 'link url', 'referring page']);
    const domain =
      getVal(obj, ['domain', 'referring domain', 'source domain']) || domainFromUrl(sourceUrl);
    return { obj, domain: domain.toLowerCase(), sourceUrl };
  });

  const byDomain = new Map();
  for (const r of mappedRows) {
    if (!r.domain) continue;
    if (!byDomain.has(r.domain)) byDomain.set(r.domain, []);
    byDomain.get(r.domain).push(r.obj);
  }

  const auditHeader = [
    'Domain',
    'Discovery Source',
    'Toxic Signal',
    'Toxicity Score',
    'Decision',
    'Evidence Note',
    'Disavow Action',
  ];
  const auditLines = [toCsvLine(auditHeader)];

  const disavowDomains = [];
  let flagged = 0;

  for (const [domain, domainRows] of byDomain.entries()) {
    const scores = domainRows.map((obj) => scoreToxicity(obj));
    const maxScore = Math.max(...scores.map((s) => s.score));
    const reasons = [...new Set(scores.flatMap((s) => s.reasons))];

    let decision = 'Keep';
    let action = 'None';
    if (maxScore >= 70) {
      decision = 'Candidate - Pending manual verification';
      action = 'Queue domain-level disavow';
      disavowDomains.push(domain);
      flagged += 1;
    } else if (maxScore >= 45) {
      decision = 'Review';
      action = 'Manual review required';
    }

    auditLines.push(
      toCsvLine([
        domain,
        'Imported backlink export',
        reasons[0] || 'No major toxic signal',
        maxScore,
        decision,
        reasons.join('; ') || 'No evidence',
        action,
      ])
    );
  }

  fs.writeFileSync(auditOut, `${auditLines.join('\n')}\n`, 'utf8');

  const disavowLines = [
    '# Disavow file for Engraving Nation',
    `# Generated from ${path.basename(inputPath)} on ${new Date().toISOString().slice(0, 10)}.`,
    '# IMPORTANT: verify candidates manually in GSC before final submission.',
    '# Format:',
    '# domain:example.com',
    '# https://example.com/spam-page',
    '',
    '# Candidate domains pending final verification:',
    ...disavowDomains.sort().map((d) => `domain:${d}`),
  ];
  fs.writeFileSync(disavowOut, `${disavowLines.join('\n')}\n`, 'utf8');

  console.log(
    `Backlink import complete. Audited domains: ${byDomain.size}. Flagged disavow candidates: ${flagged}.`
  );
  console.log(`Updated: ${auditOut}`);
  console.log(`Updated: ${disavowOut}`);
}

main();
