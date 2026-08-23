# House of Zonshine — Website

Editorial real estate site for Julia Zonshine. Simple static build: no framework, plain HTML/CSS/JS. Hosted on Netlify and deployed from GitHub.

## What's here

- `index.html` — the full homepage concept (hero, audience paths, about, stories, neighborhoods, resources, newsletter and contact)
- `newsletter/index.html` — dedicated monthly newsletter landing page and subscriber form
- `guides/index.html` — guide library showing built, in-review and planned resources
- `privacy/index.html` — California-oriented website privacy policy
- `legal/index.html` — licensing, fair housing, accuracy, terms and accessibility disclosures
- `LEGAL-COMPLIANCE.md` — the current data map, launch checks, email rules and annual legal/compliance review record
- `thanks/` — custom Netlify success pages for contact and newsletter submissions
- `css/style.css` — responsive visual system using Raleway and the Brand Bible v2 palette
- `js/script.js` — sticky navigation, mobile menu and subtle scroll reveals
- `js/content.js` — retained content renderer for future JSON-powered story and freebie archive pages
- `data/sales.json` — The Houses (Story of a Sale) entries; images go in `images/`
- `data/listings.json` — Upcoming Listings entries; images go in `images/`
- `videos/` — homepage hero video
- `images/` — hero poster and, later, original portrait/neighborhood/story photography
- `freebies/` — drop each freebie PDF + thumbnail here, add one line to `freebies.json`

## Adding a new freebie (manual workflow)

1. Drop the PDF and a thumbnail image into `/freebies`
2. Add an entry to `freebies/freebies.json`:
   ```json
   { "title": "...", "description": "...", "file": "yourfile.pdf", "thumbnail": "yourthumb.jpg" }
   ```
3. Commit and push — Netlify redeploys automatically, it's live in ~1 minute.

## Guide-library organization

- Keep the three primary routes consistent: Buy or Sell, Relocating, and Local Guides.
- Add every published neighborhood guide to Local Guides and connect it to the matching homes in The Zonshine Edit.
- Place a guide in the clearest primary route instead of duplicating it across categories.

## Regression check

Run this before every homepage or navigation deployment:

```sh
node tests/site-regression.mjs
```

The check protects the homepage's permanent sections and primary destinations—including Stories and Blog—from being removed or substituted during an unrelated update. Netlify runs the same check as a required build gate and will refuse to deploy a broken homepage contract.

## Before public launch

- Confirm the final excerpts selected from approved client material.
- Add original neighborhood, transaction and portrait photography.
- Approve the guide drafts, add their final downloads and connect newsletter delivery.
- Confirm House of Zonshine naming/branding with Compass compliance.
- Configure Netlify form detection and email notifications, then test both forms live.
- Add the valid postal address and unsubscribe mechanism to every commercial newsletter email.
- Replace the temporary Netlify canonical/OG URL when the custom domain is live.
- Build dedicated neighborhood, story and resource pages for the long-term SEO strategy.

## Netlify Forms

The contact form already has `data-netlify="true"` — Netlify auto-detects it on first deploy, no extra setup. Submissions show up under Site → Forms in the Netlify dashboard, and can be forwarded to your email in Forms → Settings → Form notifications.
