# BuildJury (buildjury.com)

Static Astro site. `npm run build` → `dist/`. Pushing to `main` deploys production on Vercel; other branches get preview deployments.

## Where content lives
- `src/data.js`: tools, rulings (`useCases`, rank order), comparisons, The Record (`NEWS`), `UPDATED` date. Every page, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `/news/feed.xml` and `/search.json` are generated from it.
- `src/lib.js`: derived data (Record tags, rank history, sponsor lookup, placeholders such as `EDITOR` and `CONTACT`).
- `data/sponsors.json`: sponsor placements.

## Add a sponsor
Add an entry to `data/sponsors.json`, then rebuild/redeploy (slots are resolved at build time, so a deploy is needed when a flight starts or ends):
```json
{"id":"acme-2026-12","slot":"strip","name":"Acme","headline":"One line, max 90 chars","url":"https://acme.com","logo":"","start":"2026-12-07","end":"2026-12-13","useCases":[]}
```
`slot` is one of `strip` (site-wide bar), `featured` (homepage verdict panel, "Featured, not ranked"), `ruling` (card after the ranked list; limit with `useCases: ["mcp-servers"]`), `newsletter` ("Presented by" line). UTM parameters and `rel="sponsored noopener"` are added automatically. Sponsors never enter a ranked list.

## Add a Record entry
Add `{date:'YYYY-MM-DD',tool:'<tool slug>',text:'…',src:'<official source URL>'}` to `NEWS` in `src/data.js`. The tag (Security / Pricing / Release) is inferred in `src/lib.js` (`tagOf`): text starting "Security" → Security; price/plan wording → Pricing; else Release.

## Update a ranking
Edit the `rank` array of the ruling in `src/data.js` and bump `UPDATED`. To show "▲2 since …" and "Moved this week", add the previous and new orders to `HISTORY` in `src/lib.js`:
`HISTORY['saas-mvp']=[{date:'2026-10-26',ranks:[…old…]},{date:'2026-11-02',ranks:[…new…]}]`.

## OG images and icons
`node scripts/og-pages.mjs | python3 scripts/og.py public/og` (needs Python Pillow) regenerates `public/og/*.png` and the PNG icons. Re-run after adding pages or changing ranks, then commit.

## Placeholders for the owner
`[EDITOR NAME]` and `[EDITOR BIO…]` (src/lib.js, /about/), `[CONTACT EMAIL @buildjury.com]` (src/lib.js), `[MONTHLY VISITORS]`, `[NEWSLETTER SUBSCRIBERS]`, `[TOP RULINGS]` (/advertise/). `FORM_INBOX` in src/lib.js is the working inbox used by the mailto forms until the buildjury.com mailbox exists. Organization `sameAs` is empty until social profiles exist.

## Reports
`reports/lighthouse/` holds before (live site) and after (redesign, local build) mobile Lighthouse reports.
