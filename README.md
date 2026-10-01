# ZOAC — zambianadventures.com

Marketing site for the Zambian Outdoor Adventure Company. Next.js 15 (App Router) + TypeScript, hand-written CSS, no UI framework.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build      # static site in ./out
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

## Deploy (Verpex, FTP)

Static export (`output: "export"`). Pushing to `main` runs `.github/workflows/deploy-ftp.yml`, which builds the site and FTP-uploads `out/` — same pattern as safari.today.

Repo secrets required: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.

Before the first deploy, on the Verpex account:
1. Turn on AutoSSL for zambianadventures.com (`public/.htaccess` forces HTTPS).
2. Create the mailbox `enquiries@zambianadventures.com` (the sender used by `enquiry.php`).
3. Add zambianoutdoors.com (and www) as an alias/parked domain on the same account — `.htaccess` 301-redirects it to zambianadventures.com.

## Enquiry form

`public/enquiry.php` receives the Contact-page form, emails `zambianoutdooradventures@gmail.com` (reply-to is the visitor) and keeps a CSV copy in `../zoac-enquiries/` (outside `public_html` when writable). Edit the constants at the top of the file to change recipients. If the request fails, the form falls back to a pre-filled `mailto:`.
