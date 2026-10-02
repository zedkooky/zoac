# Safari.today — homepage

A static site with one small PHP script for leads. There's no build step: upload the folder to Verpex and it runs.

| File | What it holds |
|---|---|
| `index.html` | The homepage, plus all SEO tags and structured data |
| `safari-types/`, `destinations/`, `stories/`, `first-time-safari-guide/`, `when-to-go/`, `safari-costs/`, `about/`, `contact/`, `privacy/`, `404.html` | The 25 inner pages, generated from `site-src/` |
| `styles.css`, `main.js` | Layout and behaviour |
| `config.js` | **The file you edit:** WhatsApp number and messages, Google Analytics ID |
| `lead.php` | Receives planner signups: saves them, emails you, sends the visitor a confirmation |
| `fonts/` | Self-hosted Syne + Inter (SIL Open Font License) |
| `favicon.svg`, `apple-touch-icon.png`, `og-image.jpg` | Browser icon and the link-preview image for WhatsApp, Facebook, LinkedIn and X |
| `robots.txt`, `sitemap.xml` | For search engines |
| `.htaccess` | HTTPS redirect, compression, caching, security headers |

## Inner pages (generated)

Everything except the homepage is generated from `site-src/` (outside this folder):

```
node site-src/build.mjs
```

- `site-src/content/*.mjs` — the page text: safari types, destinations, stories, guides, about/contact/privacy/404
- `site-src/content/zambia-core.mjs`, `zambia.mjs` — the Zambia pages; `order:` sets their order on the Zambia page
- The homepage’s “Start in Zambia” cards are generated between the `<!-- zambia-cards -->` markers in `index.html` (list in `HOME_ZAMBIA` in `build.mjs`)
- `site-src/content/photos.mjs` — every photo used on inner pages (swap in your own shoot here)
- `site-src/build.mjs` — the template; it copies the header, menu and footer from `site/index.html`, so edit those there

The build rewrites the page folders and `sitemap.xml`. Don't edit generated pages by hand — change the content file and rebuild.

## Deploy to Verpex

1. **cPanel → SSL/TLS Status → Run AutoSSL.** Do this first, because `.htaccess` forces HTTPS.
2. **cPanel → Email Accounts:** make sure `inquiries@safari.today` exists. `lead.php` sends from it and to it.
3. **File Manager → public_html:** upload *everything inside* `site/`, including the hidden `.htaccess` (tick *Settings → Show Hidden Files*).
4. Visit https://safari.today, submit the planner form with your own email, and check that:
   - `inquiries@safari.today` gets a "New Safari.today lead" email,
   - your address gets the confirmation email.

   If either one lands in spam, open **cPanel → Email Deliverability** and click *Repair* on SPF/DKIM.

## Leads

**Email signups** (the planner form) go to `lead.php`, which:
- saves every lead to `leads.csv` in a `safari-leads` folder *next to* `public_html`, so it's not reachable from the web. Download it from File Manager anytime,
- emails each lead to `inquiries@safari.today`, with Reply-To set to the visitor so you can answer directly,
- sends the visitor a short confirmation with your WhatsApp link,
- blocks spam with a hidden honeypot field and a limit of 5 signups per visitor per hour.

Settings are at the top of `lead.php`. When the planner PDF is ready, put its link in the confirmation text there. If you later move to MailerLite for newsletters, paste an API key and group ID there and every new lead is added automatically.

**WhatsApp** (+1 469 450 0886) appears in four places: the floating button, under the planner form, next to the Lower Zambezi CTA, and in the footer. Each opens a chat with its own pre-filled message, so you can see which section the lead came from. Change the number or messages in `config.js`.

## Measuring leads (do this on day one)

1. **Google Analytics 4:** create a property for safari.today and paste the measurement ID (`G-…`) into `config.js`. Analytics loads only after the page has finished, so it doesn't slow the hero. Every signup and WhatsApp click sends a `generate_lead` event, with `method` set to e.g. `email_planner` or `whatsapp_float`. In GA4 go to *Admin → Events* and mark `generate_lead` as a key event.
2. **Google Search Console:** add `safari.today` as a Domain property (verify with the DNS record it gives you; Verpex DNS is under *cPanel → Zone Editor*), then submit `https://safari.today/sitemap.xml`.
3. **Bing Webmaster Tools:** import from Search Console in one click.

## SEO and performance — what's done

- Keyword-focused title and meta description, canonical URL, `robots` meta
- Open Graph / Twitter card tags with a branded 1200×630 share image
- Organization + WebSite structured data (JSON-LD), with email and phone
- `robots.txt`, `sitemap.xml`, one canonical `https://safari.today` address (www and http redirect)
- A single `h1`, ordered headings, a `<main>` landmark, and alt text on every photo
- Self-hosted, preloaded fonts (no Google Fonts request); the hero photo preloaded at high priority
- Responsive `srcset` on every photo, so phones download small versions; below-the-fold images lazy-load
- The hero intro plays once per session; returning visitors get the headline and CTAs straight away
- Lighthouse (mobile, local): **Performance 99 · SEO 100 · Accessibility 96 · Best Practices 96**

When adding pages, add each new URL to `sitemap.xml`. After changing `styles.css` or `main.js`, bump the `?v=` number where `index.html` loads them, so visitors get the new version.

## Still to do

- **Photos:** all images are Unsplash stand-ins. When your own shoot is ready:
  - export each one as WebP or JPEG at about 2000px wide,
  - put them in an `images/` folder,
  - update the `src`/`srcset` attributes,
  - remove the `<figcaption class="credit">` lines for your own photos.
