# yanayberdah.com — personal portfolio

The personal site of **Yanay Berdah**, data analyst. Built for job applications,
LinkedIn, recruiter conversations and technical interviews.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · hand-built SVG charts ·
no runtime dependencies beyond React and Next.

---

## The rule this site is built on

Every number on the site comes from a public repository whose CI re-runs the
analysis and fails if a committed figure changes. Nothing is retyped from a
write-up, and nothing is estimated.

`lib/data/*.ts` is **generated**, not hand-written. Each file is produced from
the `analysis/results.json` and `analysis/aggregates/*.csv` of its source repo:

| Data file | Source repository |
|---|---|
| `lib/data/road-safety.ts` | [`yanaybe/israel-road-safety-analysis`](https://github.com/yanaybe/israel-road-safety-analysis) — real CBS public data |
| `lib/data/navigation.ts` | [`yanaybe/navigation-app-product-analytics`](https://github.com/yanaybe/navigation-app-product-analytics) — synthetic data on a production schema |
| `lib/data/roomatch.ts` | [`yanaybe/roomatch-matching-analysis`](https://github.com/yanaybe/roomatch-matching-analysis) — synthetic data, production scoring algorithm |

To refresh them: pull the source repo, re-run its analysis
(`python analysis/run_analysis.py`), and regenerate the TypeScript file from the
new `results.json`. Do not edit the generated files by hand — a number that
disagrees with its repo is the one thing this site cannot afford.

---

## Running it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run check        # typecheck + lint + build, in that order
```

Node 20+ (developed on Node 24).

---

## Environment variables

One, and it is not a secret:

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, used for `<link rel=canonical>`, Open Graph URLs, `sitemap.xml` and `robots.txt`. No trailing slash. | `https://yanay-berdah.vercel.app` |

**Set this to the real domain before launch**, or every canonical URL and social
preview will point at the placeholder. There are no API keys or server secrets
anywhere in this project.

---

## Deploying to Vercel

1. Push this directory to a GitHub repository.
2. In Vercel: **Add New → Project → Import** that repository. The framework is
   detected automatically; the build command is `next build` and the output is
   handled by the Next.js adapter. No overrides needed.
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` with the production URL
   (for all environments), then redeploy so the value is baked into the build.
4. Optional: add a custom domain in **Settings → Domains** and update
   `NEXT_PUBLIC_SITE_URL` to match.

Every route is statically prerendered, so the site runs on the free tier with no
server functions.

From the CLI instead:

```bash
npx vercel link
npx vercel env add NEXT_PUBLIC_SITE_URL production
npx vercel --prod
```

---

## Structure

```
app/
  layout.tsx                  nav, footer, fonts, metadata, Person JSON-LD
  page.tsx                    home: hero, about, work, skills, experience, resume, contact
  analytics/page.tsx          interactive data showcase (real CBS data)
  projects/<slug>/page.tsx    four case studies
  opengraph-image.tsx         generated 1200×630 social preview
  icon.svg, robots.ts, sitemap.ts, not-found.tsx
components/
  charts/                     line, bars, grouped columns, diverging bars,
                              CI dot plot, heatmap, chart frame (legend,
                              table view, tooltip)
  showcase/                   the two charts with interactive controls
  nav, footer, project-card, case-study, code-block, ui, icons, theme-toggle
lib/
  site.ts        identity, contact details, resume files
  projects.ts    project registry (cards, case-study headers, sitemap)
  content.ts     skills, experience, recognition, education
  data/          generated analysis data (see above)
  chart-colors.ts, number-format.ts, format.ts
public/resume/   the two CV PDFs served by the download buttons
```

### Charts

Hand-built SVG — no charting library. The four categorical series tokens
(`--series-1…4` in `app/globals.css`) are a palette validated against this
site's own chart surfaces (`#f8fafc` light, `#0f172a` dark) for lightness band,
chroma, colour-vision separation and contrast.

Rules the chart components follow:

- Every chart has a **table view**, so no value is reachable only by hovering.
- Line charts carry a snapping crosshair, one tooltip listing every series, and
  arrow-key navigation along the x axis.
- Two or more series always get a legend; direct labels are selective.
- One y axis, never two.
- Coordinates are rounded to two decimals so server and client render the same
  string (otherwise React reports a hydration mismatch).

### Theming

All colour lives in CSS custom properties in `app/globals.css`, with dark values
chosen for the dark surface rather than flipped. There are no `dark:` utilities;
the toggle sets `data-theme` on `<html>` and an inline script restores the stored
choice before first paint. `prefers-reduced-motion` disables every transition
and animation.

---

## Accessibility and SEO

- axe-core reports **zero violations** on all six pages, in both themes.
- Semantic landmarks, a skip link, visible focus rings, keyboard-reachable
  charts, scroll regions and tables.
- Per-page title, description, canonical URL and Open Graph metadata; Person
  JSON-LD on every page; `sitemap.xml` and `robots.txt` generated from
  `NEXT_PUBLIC_SITE_URL`.
- All 13 routes are statically prerendered (~120–130 kB first-load JS).

---

## Known advisories

`npm audit` reports issues in the build and lint toolchain only
(`eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`, and `postcss` via
`next build`). None of them ship in the static output, and clearing them needs
breaking major upgrades. Re-check after the next Next.js minor release.
