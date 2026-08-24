# Accessibility implementation report

**Site:** https://juliazonshine.com

**Acceptance specification:** `juliazonshine_accessibility_implementation_brief.md`, version 1.0, August 24, 2026

**Technical target:** WCAG 2.2 Level AA

**Report date:** August 24, 2026

**Implementation tester:** Codex

**Status:** Source remediation, production deployment, and automated/developer-browser production retest complete; independent assistive-technology audit, PDF audit, and legal review remain open.

## Important limitation

This is an engineering report, not legal advice, an ADA certification, or a WCAG conformance claim. A zero-violation automated scan cannot establish conformance. W3C calls for automated and manual evaluation by people with accessibility and assistive-technology expertise. No public conformance claim should be made until an independent auditor tests and retests the final production release.

## Initial inventory

The detailed inventory is in [inventory.md](inventory.md). The evaluated source contains:

- 27 canonical public HTML URLs covering the home page, guides, blog, four neighborhood guides, the eight-entry curated-homes collection, the newsletter archive and seven issues, privacy, and legal/accessibility information.
- Two confirmation pages used by complete contact and newsletter processes.
- Two lead-capture forms: the home-page consultation form and newsletter subscription form, both processed by Netlify Forms.
- Eight public PDF downloads: six one-page resources and two 12-page guides show basic PDF tagging markers; the 13-page relocation guide does not show a structure tree, document language, or title in a static file inspection.
- One decorative, muted hero video; one rotating testimonial carousel; local image galleries; four Google Maps embeds; and outbound Compass/RSR/social/listing links.
- No site search, authentication, payment, CAPTCHA, cookie banner, modal, chat, scheduling, property-search widget, analytics-consent interface, or audio content was found in the public source.

## Baseline

Baseline automation used axe-core 4.13.0 in Chrome against all 27 sitemap URLs. It found **282 affected nodes**:

- 280 serious color-contrast failures across 26 pages.
- One serious nested-interactive/role defect in the home-page newsletter portrait.
- One minor invalid ARIA-role use in the testimonial carousel.

Developer keyboard/browser inspection also found:

- The closed mobile menu was visually off-canvas but remained available to keyboard and assistive technology.
- Escape did not close the mobile menu or restore focus.
- Form controls suppressed the native outline without a sufficiently strong replacement.
- The testimonial carousel continued advancing when reduced motion was requested and had no pause control.
- Form failures relied on browser behavior and did not provide a linked error summary, persistent field errors, or an announced submission status.
- The narrow home-page portrait caption could render outside the viewport.

## Code remediation completed

- Replaced low-contrast text tokens and corrected context-specific light/dark variants throughout the shared, blog, newsletter, favorites, guides, legal, and neighborhood styles.
- Added a high-contrast, multi-layer `:focus-visible` indicator that cannot be suppressed by the form-specific reset.
- Made the closed mobile navigation `inert` and `aria-hidden`; made the page behind an open menu inert; added Escape close and focus return.
- Made skip links move programmatic focus to their corresponding main landmark.
- Added a visible carousel pause/play control, stopped automatic changes under reduced-motion preferences, stopped while interacting, and corrected slide semantics.
- Removed the nested role=image structure while preserving a useful accessible description.
- Added visible required-field instructions, custom field errors, `aria-invalid`/`aria-describedby`, a linked focusable error summary, and a polite loading status to both forms.
- Added stable contrast backings to text laid over photography and moved the narrow portrait caption into the viewport.
- Added static release-gate tests, Playwright/axe full-page and complete-process tests, and a GitHub Actions accessibility workflow.

## Retest evidence

| Test | Scope | Result |
|---|---|---|
| Existing regression contract | Homepage sections and permanent destinations | Pass |
| Static accessibility contract | 27 canonical pages + 2 confirmation pages | Pass |
| axe-core 4.13.0 | WCAG A/AA tags on all 27 canonical pages | Pass: 0 reported violations |
| Reflow | All 27 canonical pages at 320 CSS px | Pass: no page-level horizontal overflow |
| Keyboard component tests | Skip link, closed/open mobile menu, Escape, focus return, focus visibility | Pass in Chrome/Playwright |
| Motion | Carousel with `prefers-reduced-motion: reduce` | Pass: no automatic advance; pause state exposed |
| Contact process | Empty errors → correction → valid submit → confirmation | Pass in the production-like local server |
| Newsletter process | Empty errors → correction + consent → valid submit → confirmation | Pass in the production-like local server |
| Production full-page retest | 27 live canonical pages at release `085d265` | Pass: 0 axe violations; 320px reflow, keyboard, form-error, and statement checks pass |
| PDF static metadata inspection | Eight PDFs | Seven show tagging/language/title markers; relocation guide fails the marker check |

Commands:

```sh
npm ci
npm run test:static
npx playwright install chromium
npm run test:a11y
```

## Open acceptance items

The source is not ready for a public WCAG/ADA conformance claim until all of the following are complete:

1. Independently test the deployed release with NVDA + Firefox or Chrome, VoiceOver + Safari on macOS, and VoiceOver + Safari on iPhone.
2. Perform human keyboard, 200% text resize, text-spacing, touch-target, voice-control, and focus-obscuration tests on the production site.
3. Audit all eight PDFs with a qualified PDF accessibility tool and assistive technology; remediate or replace the relocation guide with an accessible HTML/PDF alternative.
4. Validate a real Netlify form delivery and any email notification/confirmation outside the static confirmation page. No subscriber-facing confirmation email exists in source and none was tested.
5. Retain an independent accessibility professional for audit and remediation retest.
6. Have accessibility counsel review business-specific ADA/California exposure and the public statement.

See [remediation-plan.md](remediation-plan.md), [issue-register.csv](issue-register.csv), [manual-qa.md](manual-qa.md), and [independent-auditor-handoff.md](independent-auditor-handoff.md).
