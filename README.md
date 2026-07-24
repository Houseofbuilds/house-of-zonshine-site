# House of Zonshine — Website

Simple static site: no framework, plain HTML/CSS/JS. Hosted on Netlify, deployed from GitHub, domain via GoDaddy.

## What's here

- `index.html` — the whole one-page site (intro, nav, hero, about, sale stories, listings, walkthrough, freebies, newsletter, contact)
- `css/style.css` — brand colors (Clay/Sage/Bronze) + fonts (Lora/Karla), per Brand Bible v2
- `js/script.js` — intro sequence (first visit only) + mobile nav
- `js/content.js` — renders sale stories, listings, and freebies from their JSON files
- `data/sales.json` — The Houses (Story of a Sale) entries; images go in `images/`
- `data/listings.json` — Upcoming Listings entries; images go in `images/`
- `videos/` — drop `hero.mp4` (short looping LA→Sycamore zoom), `ambient-la.mp4` (mid-page LA skyline loop), and `sycamore-walkthrough.mp4` (full walkthrough) here
- `images/` — `headshot.jpg`, sale/listing photos, video poster frames
- `freebies/` — drop each freebie PDF + thumbnail here, add one line to `freebies.json`

## Adding a new freebie (manual workflow)

1. Drop the PDF and a thumbnail image into `/freebies`
2. Add an entry to `freebies/freebies.json`:
   ```json
   { "title": "...", "description": "...", "file": "yourfile.pdf", "thumbnail": "yourthumb.jpg" }
   ```
3. Commit and push — Netlify redeploys automatically, it's live in ~1 minute.

## First-time setup (once Xcode Command Line Tools finish installing)

Run from this folder:

```bash
git init
git add .
git commit -m "First build of House of Zonshine site"
```

Then create an **empty** repo on github.com (no README, no .gitignore — this folder already has them), named e.g. `house-of-zonshine-site`, and run the two commands GitHub shows you on the "…or push an existing repository" screen — they'll look like:

```bash
git remote add origin https://github.com/<your-username>/house-of-zonshine-site.git
git branch -M main
git push -u origin main
```

## Then: Netlify

1. netlify.com → "Add new site" → "Import an existing project" → connect GitHub → pick this repo
2. Build settings: leave blank (no build command needed, publish directory `.`)
3. Deploy — you'll get a live `*.netlify.app` URL immediately

## Then: point the domain (GoDaddy)

In Netlify: Site settings → Domain management → Add custom domain → `juliazonshine.com`. Netlify will show DNS records to add. In GoDaddy: DNS settings for `juliazonshine.com` → add those records. Propagation + free SSL usually finish within an hour.

## Netlify Forms

The contact form already has `data-netlify="true"` — Netlify auto-detects it on first deploy, no extra setup. Submissions show up under Site → Forms in the Netlify dashboard, and can be forwarded to your email in Forms → Settings → Form notifications.
