const fs = require('fs');
const path = require('path');

function readLines(filePath) {
  return fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.startsWith('#'));
}

function toDomain(input) {
  const value = input.trim();
  if (!value) return '';
  const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const host = new URL(normalized).hostname.toLowerCase();
    return host.replace(/^www\./, '');
  } catch {
    return '';
  }
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

function classifyDomain(domain) {
  if (/(seo|indexer|directory|share|link|backlinks?|forum)/i.test(domain)) return 'Likely spam/link network';
  if (/\.(edu|gov)$/.test(domain)) return 'Authority/Institutional';
  if (/(alibaba|sourcify|accio|fobsourcify)/i.test(domain)) return 'Marketplace/Sourcing';
  if (/(chevrolet|corvette|gm|nascar|speedway|autoblog|caranddriver|roadandtrack|carscoops|jalopnik)/i.test(domain)) return 'Automotive media/brand';
  return 'General web';
}

function main() {
  const fileA = process.argv[2];
  const fileB = process.argv[3];
  if (!fileA || !fileB) {
    console.error('Usage: node scripts/analyze-competitor-disavow.js <competitor1.txt> <competitor2.txt>');
    process.exit(1);
  }

  const absA = path.isAbsolute(fileA) ? fileA : path.join(process.cwd(), fileA);
  const absB = path.isAbsolute(fileB) ? fileB : path.join(process.cwd(), fileB);
  if (!fs.existsSync(absA) || !fs.existsSync(absB)) {
    console.error('One or both competitor disavow files are missing.');
    process.exit(1);
  }

  const linesA = readLines(absA);
  const linesB = readLines(absB);
  const domainsA = linesA.map(toDomain).filter(Boolean);
  const domainsB = linesB.map(toDomain).filter(Boolean);

  const setA = new Set(domainsA);
  const setB = new Set(domainsB);
  const allDomains = new Set([...setA, ...setB]);
  const overlap = [...allDomains].filter((d) => setA.has(d) && setB.has(d)).sort();

  const outDir = path.join(process.cwd(), 'docs', 'seo');
  const intelPath = path.join(outDir, 'competitor_disavow_intel.csv');
  const overlapPath = path.join(outDir, 'competitor_disavow_overlap.csv');
  const summaryPath = path.join(outDir, 'competitor_disavow_summary.md');

  const intelLines = [
    toCsvLine(['Domain', 'In Competitor A', 'In Competitor B', 'Category', 'Priority Signal']),
  ];

  [...allDomains]
    .sort()
    .forEach((domain) => {
      const inA = setA.has(domain) ? 'Y' : 'N';
      const inB = setB.has(domain) ? 'Y' : 'N';
      const category = classifyDomain(domain);
      const priority =
        inA === 'Y' && inB === 'Y'
          ? 'Shared competitor disavow signal'
          : 'Single-source competitor signal';
      intelLines.push(toCsvLine([domain, inA, inB, category, priority]));
    });

  fs.writeFileSync(intelPath, `${intelLines.join('\n')}\n`, 'utf8');

  const overlapLines = [toCsvLine(['Domain', 'Signal'])];
  overlap.forEach((d) => overlapLines.push(toCsvLine([d, 'Present in both competitor disavow lists'])));
  fs.writeFileSync(overlapPath, `${overlapLines.join('\n')}\n`, 'utf8');

  const summary = [
    '# Competitor Disavow Summary',
    '',
    `- Source A: \`${absA}\``,
    `- Source B: \`${absB}\``,
    `- Unique domains in A: ${setA.size}`,
    `- Unique domains in B: ${setB.size}`,
    `- Combined unique domains: ${allDomains.size}`,
    `- Overlap domains (both files): ${overlap.length}`,
    '',
    '## Notes',
    '',
    '- This is competitor intelligence only. No changes were made to our own disavow list.',
    '- Treat overlap domains as higher-confidence risk patterns to investigate in our backlink audits.',
  ].join('\n');
  fs.writeFileSync(summaryPath, `${summary}\n`, 'utf8');

  console.log(`Generated ${intelPath}`);
  console.log(`Generated ${overlapPath}`);
  console.log(`Generated ${summaryPath}`);
}

main();
