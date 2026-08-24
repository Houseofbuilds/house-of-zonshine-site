# Prioritized accessibility remediation plan

## P0 — essential journeys

Completed in source:

- Remove the closed mobile menu from the focus/accessibility trees; add Escape close and focus return.
- Make the contact and newsletter forms expose required fields, persistent field errors, linked summaries, invalid state, progress, and accessible confirmation pages.
- Preserve all entered data while correcting errors.
- Add build-blocking static checks and complete-process browser tests.

Before release/conformance claim:

- Deploy and verify real Netlify contact and newsletter deliveries, confirmations, and any vendor handoff.
- Independently test the complete consultation and newsletter tasks with required screen-reader/browser combinations.

## P1 — broad barriers

Completed in source:

- Correct sitewide text and UI contrast failures.
- Restore strong, consistent focus visibility.
- Make skip links transfer focus to main content.
- Stop carousel auto-rotation when reduced motion is requested; add a pause/play control.
- Correct invalid/nested ARIA and carousel semantics.
- Give text over variable photography an opaque contrast backing.
- Pass full-page axe and 320 CSS-pixel reflow checks on all canonical pages.

Open:

- Remediate or replace the untagged 13-page relocation PDF.
- Audit all other PDFs with a qualified PDF accessibility checker plus human reading-order/screen-reader tests.
- Complete human 200% text-resize, text-spacing, touch-target, voice-control, focus-obscuration, and mobile screen-reader tests.
- Obtain current accessibility evidence from essential third-party vendors and test the deployed implementations.

## P2 — governance and durability

- Owner/legal review and publication decision for the proposed accessibility statement.
- Confirm a monitored accessibility phone number and response-time commitment.
- Add accessibility checks to content publishing and vendor procurement.
- Train content editors on alt text, headings, link purpose, captions, and accessible documents.
- Schedule periodic independent audits and critical-journey regression tests.
- Record feedback, interim accommodations, fixes, and retests in [remediation-log.md](remediation-log.md).

## Release gate

`npm run test:static` is the Netlify build command. CI additionally installs Chromium and runs `npm run test:a11y`. Do not release if either fails. Automation does not waive the independent manual acceptance items above.
