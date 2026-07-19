# Leaf Monkey Labs — leafmonkey.org

Marketing site for Leaf Monkey Labs, a Sri Lankan software agency. Built with
Next.js (App Router) and a git-based CMS. Blogs, softwares/case studies, the
team, and site copy are all editable through an admin UI — **no database**.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4 + design tokens/keyframes in `app/globals.css` |
| Content / CMS | [Keystatic](https://keystatic.com) — git-based, admin at `/keystatic` |
| Content format | Markdown (`.md`) + YAML, committed to `content/` |
| Rich text render | `@markdoc/markdoc` |
| Fonts | Fraunces, Playfair Display, Space Mono, Lato (`next/font`) |
| Hosting | Vercel (fully static / SSG, no DB) |

## Develop

```bash
npm install
npm run dev
```

- Site: http://localhost:3000
- CMS admin: http://localhost:3000/keystatic

In local dev the admin reads and writes the files under `content/` directly, so
edits appear as normal git changes you can review and commit.

```bash
npm run build   # production build (static)
npm run start   # serve the build
```

## Content model

Everything editable lives in `content/` and is defined in `keystatic.config.ts`:

- **`content/posts/*.md`** — Insights (blog). Front-matter fields + Markdown body.
- **`content/products/*.md`** — Softwares / case studies (Salli, LetsMigo, Katha):
  tagline, theme colour, stats, challenge/approach/outcome, gallery, Markdown body.
- **`content/team/*.yaml`** — The troop (name, role, photo).
- **`content/home.yaml`** — Home page copy (hero, marquee, services, research venues…).
- **`content/settings.yaml`** — Global settings (email, URL, footer meta).

Images uploaded via the CMS are stored in `public/images/` and served through
`next/image`.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel (framework auto-detected).
2. It deploys as-is — content is read from the committed files at build time.
3. **Editing in production** (optional): switch Keystatic to GitHub storage so
   the live `/keystatic` admin commits changes back to the repo. Copy
   `.env.example` → set `KEYSTATIC_STORAGE=github` and the GitHub App vars, then
   follow https://keystatic.com/docs/github-mode. A push triggers a redeploy.

## Project layout

```
app/
  page.tsx              # Home (full interactive design)
  work/                 # Work listing + [slug] case study
  insights/             # Blog listing + [slug] post
  about/                # About / the troop
  keystatic/            # CMS admin UI
  api/keystatic/        # CMS route handler
components/             # Nav, Footer, effects (HomeFx/InnerFx), Media, Marquee…
content/                # Editable content (the "CRM")
lib/                    # Keystatic reader + typed content helpers
design/                 # Original design reference (source HTML + screenshots)
```

The bespoke motion from the design (hero leaf canvas, per-character hero reveal,
scroll reveals, sticky-stacking case cards, depth meter, nav colour shifts) is
reproduced in `components/HomeFx.tsx` and `components/InnerFx.tsx`, with keyframes
in `app/globals.css`. All motion respects `prefers-reduced-motion`.
