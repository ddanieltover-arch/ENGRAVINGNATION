# Live External Validation Report (2026-05-07)

## Scope

Live checks executed from outside the app runtime for:

- Homepage accessibility and rendered SEO signals
- Product page accessibility
- Article detail page accessibility
- `robots.txt` access and directives
- `sitemap.xml` endpoint behavior
- TLS/security header spot-check

## Results Summary

- **PASS:** Homepage reachable and returning SEO content
- **PASS:** Products page reachable
- **PASS:** Article detail page reachable
- **PASS:** `robots.txt` reachable with expected crawler rules
- **WARN:** `sitemap.xml` root host redirects to `www` host; canonical host consistency should be unified
- **PASS:** `www` sitemap endpoint responds `200` via header check
- **PASS:** Security headers present (`HSTS`, `X-Content-Type-Options`, `Referrer-Policy`)
- **PASS:** Automated local validation scripts all passing (`seo-audit`, `validate-schema`, `check-internal-links`, `check-priority-landing-pages`)
- **PENDING (manual/auth-required):** GSC coverage validation, Google Mobile-Friendly Test, Rich Results Test, SSL Labs final grade

## Evidence Collected

### 1) Homepage and key pages

- `https://engravingnation.store/` returned page content and title.
- `https://engravingnation.store/products` returned page content and title.
- `https://engravingnation.store/articles/does-silverado-emblem-fit-camaro-fitment-guide` returned page content and title.

### 2) Robots rules

`https://engravingnation.store/robots.txt` returned:

- Global allow with disallow on `/admin/` and `/api/`
- Explicit AI crawler allow for:
  - `GPTBot`
  - `ClaudeBot`
  - `PerplexityBot`
  - `Googlebot-Extended`
- Sitemap pointer: `https://engravingnation.store/sitemap.xml`

### 3) Sitemap endpoint behavior

Header check:

- `https://engravingnation.store/sitemap.xml` -> `307` redirect to `https://www.engravingnation.store/sitemap.xml`
- `https://www.engravingnation.store/sitemap.xml` -> `200 OK` (application/xml)

**Observation:** root and `www` host behavior diverges. This can create crawl/index reporting ambiguity in Search Console if properties are not aligned.

### 4) TLS/Security spot-check

On `https://www.engravingnation.store/sitemap.xml`, response headers include:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 5) Automated in-repo validation suite (2026-05-07)

Command set executed:

- `node scripts/seo-audit.js`
- `node scripts/validate-schema.js`
- `node scripts/check-internal-links.js`
- `node scripts/check-priority-landing-pages.js`

Outcome:

- Metadata coverage: **PASS**
- JSON-LD presence check: **PASS**
- Internal route and static-asset link validation: **PASS**
- Required SEO landing pages included in sitemap config: **PASS**

## Open Items To Complete (Manual / Auth Required)

1. **Google Search Console**
   - Confirm preferred host property alignment (`www` vs apex).
   - Re-submit sitemap on canonical host only.
   - Validate coverage errors after recrawl.

2. **Google Rich Results Test**
   - Validate:
     - homepage
     - `/products`
     - `/products/[slug]` (real slug)
     - `/articles/[slug]` (real slug)
   - Export/store pass results in `schema_validation_report.json` update.

3. **Google Mobile-Friendly Test**
   - Run against homepage, products listing, one product detail, one article detail.

4. **SSL Labs**
   - Run final graded scan and record grade in docs (`A` or `A+` target).

## Recommended Fix Next

- Pick and enforce a single canonical host (`www` or apex) for sitemap, metadata canonicals, and GSC property workflows.
- Update `robots` sitemap pointer to canonical host once decision is made.
