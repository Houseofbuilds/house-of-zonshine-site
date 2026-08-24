# Digital accessibility inventory

**Inventory date:** August 24, 2026

**Canonical production origin:** `https://juliazonshine.com`

**Source owner:** Julia Zonshine / House of Zonshine

**Direct remediation owner:** Codex for repository code; Julia/owner for content and vendor relationships

## Origins and environments

| Asset | Status | Owner/control | Notes |
|---|---|---|---|
| `https://juliazonshine.com` | Production | Owner + Netlify | Canonical origin used in metadata and sitemap. |
| `https://www.juliazonshine.com` | 301 redirect to canonical origin verified 2026-08-24 | DNS/Netlify | Retest after deployment; current redirect lands on HTTPS canonical origin. |
| Netlify deploy previews/staging | Not public in sitemap | Owner + Netlify | Use for preproduction audit; do not include private deploy identifiers in public evidence. |
| `/concepts/opening/` | Noncanonical concept source | Owner | Not in sitemap; exclude from conformance scope unless published or linked publicly. |

## Public page and template inventory

| Type | URLs | Purpose/journey | Technology | Essential | Directly remediable |
|---|---|---|---|---|---|
| Home | `/` | Services, stories, guides, contact | Static HTML/CSS/JS; Netlify form | Yes | Yes |
| Guide library | `/guides/` | Find/download guides | Static HTML; PDF links | Yes | Yes; PDFs require document tools |
| Blog index | `/blog/` | Find editorial information | Static HTML/CSS/JS | No | Yes |
| Blog post | `/blog/how-much-commission-does-a-real-estate-agent-make/` | Read article, return to index/contact | Static HTML/CSS/JS | No | Yes |
| Neighborhood guides | `/neighborhoods/sherman-oaks/`, `/los-feliz/`, `/pasadena/`, `/silver-lake/` | Local guidance and linked homes | Static HTML; Google Maps iframe | Yes | Page yes; map UI vendor-owned |
| Curated homes index | `/favorites/` | Browse curated homes | Static HTML/CSS/JS | No | Yes |
| Curated home details | `/favorites/2276-moreno-dr/`, `/1190-n-wilson-ave/`, `/2666-aberdeen-ave/`, `/485-madeline-dr/`, `/5114-cedros-ave/`, `/3627-cody-rd/`, `/1395-inverness-dr/`, `/2414-4th-ave/` | Read story, follow listing/guide/contact | Static HTML; outbound listing pages | No | Page yes; external listing pages no |
| Newsletter archive/signup | `/newsletter/` | Read issues and subscribe | Static HTML/CSS/JS; Netlify form | Yes | Yes; delivery vendor-owned |
| Newsletter issues | `/newsletter/a-full-house/`, `/coming-in-hot-salon-hestia/`, `/i-sold-christopher-lloyds-house/`, `/its-gonna-be-may/`, `/q1-is-in-the-bag/`, `/a-little-march-note/`, `/love-where-you-live/` | Read issue, return to archive/contact | Static HTML/CSS/JS; outbound listing/source links | No | Page yes; external pages no |
| Legal/privacy/accessibility | `/legal/`, `/privacy/` | Terms, licensing, accessibility help, privacy | Static HTML | Yes | Yes |
| Form confirmations | `/thanks/contact/`, `/thanks/newsletter/` | Confirm completed process | Static HTML; Netlify redirect | Yes | Yes |

## Complete processes

| Process | Pages/states | Third party | Current source result |
|---|---|---|---|
| Main/mobile navigation | Header on 27 canonical pages; closed, open, Escape, destination | None | Automated keyboard tests pass; human AT test pending. |
| Consultation request | `/` form; empty/invalid/valid/loading; `/thanks/contact/` | Netlify Forms; Compass systems receive record per privacy notice | Production-like browser test passes. Live delivery and any internal notification remain to be verified after deploy. |
| Newsletter signup | `/newsletter/` form; empty/invalid/valid/consent/loading; `/thanks/newsletter/` | Netlify Forms; Compass systems receive record per privacy notice | Production-like browser test passes. No subscriber-facing email-confirmation flow is present in source. |
| Read and return | Guides/blog/newsletter/favorites detail and index links | External source/listing destinations where selected | Repository navigation tested; independent task test pending. |
| Legal/accessibility help | `/legal/`, `/privacy/`, email link | User email client | Page is in automated scope; monitored response process is an owner obligation. |

## Media and documents

| Asset | Count | Role | Finding |
|---|---:|---|---|
| Informative/decorative images | Sitewide | Editorial, homes, people, brand | Every HTML `<img>` has an `alt` attribute; human purpose/quality review remains part of independent audit. |
| CSS background images | Home/favorites | Decorative or labeled portrait/feature imagery | Informative portrait containers have accessible text; independent screen-reader review pending. |
| Hero video | 1 | Decorative visual ambience | Muted, no audio, `aria-hidden`; pauses under reduced motion/offscreen/hidden tab. |
| Testimonial carousel | 1 | Client reviews | Pause/play, previous/next, reduced-motion behavior, and slide state implemented. |
| Image galleries | Local static galleries | Property/neighborhood context | Native images/figures; no custom lightbox or modal. |
| Google Maps iframe | 4 | Supplemental neighborhood map | Each iframe has a title; embedded interaction is Google-owned. Equivalent neighborhood copy is present. |
| PDFs | 8 | Downloadable guides/freebies | See PDF register below. |

### PDF register

| File | Pages | Static metadata result | Essential/next action |
|---|---:|---|---|
| `good-bones-vs-expensive-problems.pdf` | 1 | Tagged marker, title, language | Audit reading order, headings, alt text. |
| `los-angeles-buyer-guide.pdf` | 12 | Tagged marker, title, language | Essential guide; full PDF/AT audit required. |
| `los-angeles-relocation-guide.pdf` | 13 | **No structure tree, title, or language marker found** | P1 open: remediate or provide equivalent accessible HTML/PDF before conformance claim. |
| `los-angeles-seller-guide.pdf` | 12 | Tagged marker, title, language | Essential guide; full PDF/AT audit required. |
| `negotiate-buyer-edition.pdf` | 1 | Tagged marker, title, language | Audit reading order, headings, alt text. |
| `seller-from-close-to-yes.pdf` | 1 | Tagged marker, title, language | Audit reading order, headings, alt text. |
| `the-safety-breakdown.pdf` | 1 | Tagged marker, title, language | Audit reading order, headings, alt text. |
| `three-pass-neighborhood-check.pdf` | 1 | Tagged marker, title, language | Audit reading order, headings, alt text. |

Static markers do not prove that tags, reading order, headings, lists, alternative text, or visual contrast are correct.

## Third-party/integration summary

See [third-party-register.md](third-party-register.md). Public source includes Netlify hosting/forms, Compass/RSR destinations and data processing, Google Fonts, Google Maps, social links, listing/source links, and a small number of remote editorial images. No CAPTCHA, chat, cookie consent, analytics-consent UI, booking calendar, payment, login, or property-search widget was found.
