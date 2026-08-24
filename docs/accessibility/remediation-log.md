# Accessibility remediation log

This log is the durable record requested by the August 24, 2026 accessibility implementation brief. Record every new finding and every production retest. “Pass” below means the named test passed; it is not a sitewide ADA or WCAG certification.

| Issue | WCAG issue | Affected URL/component | Fix or required action | Date | Tester | Retest result |
|---|---|---|---|---|---|---|
| A11Y-001 | 1.4.3 / 1.4.11 systemic contrast | 26 canonical pages; shared/blog/newsletter/neighborhood styles | Replaced low-contrast text tokens; corrected context variants; added photo-credit backings. | 2026-08-24 | Codex, axe-core 4.13.0 | **Pass in source:** 280 baseline nodes reduced to zero axe violations across 27 pages. Human visual audit remains pending. |
| A11Y-002 | 2.1.1 / 2.4.3 / 4.1.2 hidden navigation | Sitewide mobile menu | Closed menu is inert and aria-hidden; open menu makes background inert. | 2026-08-24 | Codex, Chrome/Playwright keyboard emulation | **Pass in source:** closed links are skipped. Independent AT retest pending. |
| A11Y-003 | 2.1.1 / 2.1.2 / 2.4.3 menu close/focus | Sitewide mobile menu | Escape closes menu and returns focus to menu button. | 2026-08-24 | Codex, Chrome/Playwright keyboard emulation | **Pass in source.** |
| A11Y-004 | 2.2.2 moving content | Home testimonials | Added pause/play; reduced motion disables automatic changes; interaction pauses timer. | 2026-08-24 | Codex, Chrome/Playwright | **Pass in source:** no change after 3.3 seconds with reduced motion. |
| A11Y-005 | 4.1.2 nested role/image interaction | Home newsletter portrait | Removed role=image wrapper; preserved descriptive accessible text. | 2026-08-24 | Codex, axe-core 4.13.0 | **Pass in source.** |
| A11Y-006 | 4.1.2 invalid role | Home testimonial slides | Replaced figure role=group pattern with semantic div groups and text attribution. | 2026-08-24 | Codex, axe-core 4.13.0 | **Pass in source.** |
| A11Y-007 | 2.4.7 / 2.4.11 focus indicator | All controls; especially contact/newsletter fields | Added high-contrast two-color focus ring protected from form resets. | 2026-08-24 | Codex, computed-style browser check | **Pass in source.** Human obscuration/zoom review pending. |
| A11Y-008 | 3.3.1 / 3.3.2 / 3.3.3 / 4.1.3 forms | `/` contact process; `/newsletter/` signup process; both `/thanks/` pages | Added required cues, linked summaries, persistent field errors, invalid/describedby state, progress status, and confirmation checks. | 2026-08-24 | Codex, Chrome/Playwright | **Pass in production-like source:** both empty-to-valid-to-confirmation processes pass. Live delivery and screen-reader retest pending. |
| A11Y-009 | 2.4.1 skip focus | All canonical page templates | Skip-link activation now focuses the main landmark. | 2026-08-24 | Codex, Chrome/Playwright keyboard emulation | **Pass in source.** |
| A11Y-010 | PDF semantics/metadata | `/freebies/pdfs/los-angeles-relocation-guide.pdf`; `/guides/` | Disclosed the active limitation and added a direct alternative-format request; still remediate/re-export a tagged accessible PDF or publish equivalent accessible HTML. | 2026-08-24 | Codex, static PDF catalog inspection | **Open with interim fallback:** no structure tree, title, or language marker found; email assistance is now offered. |
| A11Y-011 | PDF reading order/alt/structure | Seven other PDFs | Qualified PDF-tool and human AT audit; repair any reading order, tags, alt, metadata, or contrast defects. | 2026-08-24 | Codex, static PDF catalog inspection | **Open:** basic markers found; correctness not established. |
| A11Y-012 | Manual assistive-technology validation | Full production scope and complete processes | Independent NVDA, macOS VoiceOver, and iPhone VoiceOver audit and retest. | 2026-08-24 | Not yet assigned | **Open; blocks conformance claim.** |
| A11Y-013 | 1.4.4 / 1.4.10 / 1.4.12 / 2.5.8 visual adaptation | All 27 canonical pages | Reflow automation plus human text resize, spacing, touch target, and clipping review. | 2026-08-24 | Codex, Chrome/Playwright | **Partial:** all pages pass 320 CSS-pixel reflow; other manual checks open. |
| A11Y-014 | Third-party accessibility | Netlify Forms, Google Maps, Compass/RSR/listing handoffs | Obtain evidence; test deployed flow; escalate vendor defects; preserve direct email/phone fallback. | 2026-08-24 | Not yet assigned | **Open:** source integration tested only. |

## Production retest entries

Add dated rows here after deployment. Include the production URL, release/commit identifier, browser/assistive technology, exact task, tester, and outcome. Do not convert an “open” manual/PDF item to “pass” based solely on axe or Lighthouse.
