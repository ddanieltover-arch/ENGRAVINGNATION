# Disavow Submission Process

## Goal

Submit only verified toxic backlinks that cannot be removed manually.

## Steps

1. Export backlink profile from Ahrefs/SEMrush/GSC.
1a. (Optional automation) run importer:
   - `node scripts/import-backlink-audit.js "<path-to-backlinks-export.csv>"`
   - This regenerates:
     - `docs/seo/backlink_toxic_audit.csv`
     - `docs/seo/disavow.txt`
2. Flag candidates with:
   - obvious spam/PBN footprint
   - irrelevant foreign directory patterns
   - malicious anchor spam
   - no organic traffic and no editorial value
3. Attempt removal outreach for recoverable links (optional but preferred).
4. Add confirmed toxic sources into `disavow.txt` using domain-level entries.
5. Validate file encoding (`UTF-8`) and syntax.
6. Submit via Google Search Console disavow tool for the correct property.
7. Log submission date and version in SEO ops notes.
8. Re-audit every 30-60 days and update only when needed.

## Rules

- Never disavow normal low-authority but relevant links by default.
- Prefer `domain:` entries for sitewide spam patterns.
- Keep historical copies when replacing `disavow.txt`.

## Change Log

- 2026-05-07: Initial scaffold and process created.
- 2026-05-07: Added backlink CSV importer workflow.
