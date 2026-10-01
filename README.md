# ZOAC — zambianadventures.com

Marketing site for the Zambian Outdoor Adventure Company. Next.js 15 (App Router) + TypeScript, hand-written CSS, no UI framework.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Design system

Tokens live at the top of `app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `--ink` / `--navy` | `#08161f` / `#0e2433` | dark surfaces |
| `--ivory` / `--sand` | `#f6f1e7` / `#e9dfcc` | light surfaces |
| `--gold` / `--gold-dk` | `#c4a46a` / `#9a7b43` | champagne accent |
| `--mist` | `#a9bccb` | secondary text on dark |

Type: Cormorant Garamond (display, light + italic accents) and Inter (body), self-hosted via `@fontsource`.
Motion: Ken Burns hero, logo preloader (once per session), line-masked headline reveals, marquee, scroll reveals (`data-reveal="<delay ms>"`). All disabled under `prefers-reduced-motion`.

## Content

- `lib/site.ts` — contacts, nav, courses & prices, values
- `data/dive-sites.json` — generated from the three dive-site CSVs (recreational, snorkel/freedive, technical). Sites without GPS show as "surveying soon".
- Placeholder imagery in `public/img` — swap for final photography. Course blurbs for Try Scuba, Pond Scuba and Open Water are draft copy to confirm.

## Enquiry form

`POST /api/enquiry` emails via [Resend](https://resend.com). Set `RESEND_API_KEY` (see `.env.example`). Without it the form falls back to a pre-filled `mailto:`.

## Domains

`next.config.mjs` 301-redirects `zambianoutdoors.com` (and `www.`) to `zambianadventures.com`. Point both domains' DNS at the deployment.
