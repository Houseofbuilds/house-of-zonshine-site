# Manual accessibility QA scripts and evidence

## Evidence status

Codex performed developer browser inspection and keyboard emulation in Chrome, then converted stable behaviors into Playwright assertions. This is useful evidence, but it is **not independent human screen-reader testing**. The required NVDA/VoiceOver matrix remains open.

| Date | Environment | Scope | Evidence/result |
|---|---|---|---|
| 2026-08-24 | Chrome 151, macOS; developer inspection | Mobile menu at narrow viewport | Baseline closed menu exposed seven offscreen links; Escape failed. Retest: closed menu inert/hidden, Tab skips links, Escape closes and restores focus. |
| 2026-08-24 | Chrome 151, macOS; reduced-motion emulation | Testimonial carousel | Baseline advanced from review 01 to 02. Retest remains at 01 and exposes a pressed pause/play control. |
| 2026-08-24 | Chrome 151, macOS; computed styles | Form focus | Baseline form outline was `none`; retest produces a protected 3px/6px two-color focus ring. |
| 2026-08-24 | Chrome/Playwright | Contact process | Empty submission focuses summary and identifies three fields; corrected form submits to accessible confirmation. Pass in local production-like server. |
| 2026-08-24 | Chrome/Playwright | Newsletter process | Empty submission focuses summary and identifies name/email/consent; corrected form submits to accessible confirmation. Pass in local production-like server. |
| 2026-08-24 | Chrome/Playwright at 320 CSS px | All 27 sitemap pages | No page-level horizontal overflow. Internal horizontal card scrollers remain intentional one-dimensional components. |

## Required test matrix

Run the complete scripts below in each relevant column and record tester, date, browser/AT version, URL, result, issue ID, and evidence link.

| Platform | Browser/assistive technology | Required |
|---|---|---|
| Windows | NVDA + Firefox | Yes |
| Windows | NVDA + Chrome | One of Chrome/Firefox is minimum; both preferred |
| macOS | VoiceOver + Safari | Yes |
| iPhone | VoiceOver + Safari | Yes |
| Desktop | Keyboard only, no screen reader | Yes |
| Desktop | 200% text-only/browser zoom and 400%/320 CSS-pixel reflow | Yes |
| Mobile | Touch exploration and target-size/spacing review | Yes |
| Desktop/mobile | Voice control for menu, carousel, forms, and ambiguous controls | Risk-based |

## Script 1 — global navigation and services/guides

1. Load the home page at the top without using a mouse.
2. Press Tab. Confirm the skip link is the first focusable control, visibly appears, and moves reading and keyboard focus to the main landmark.
3. Continue through the header. Confirm visible focus is never covered and link names identify their destination.
4. At a mobile/narrow viewport, confirm closed menu links are not announced or focusable.
5. Open the menu. Confirm state/name changes, background content is unavailable, focus enters the menu, and every destination is reachable.
6. Press Escape. Confirm close and focus return to the trigger.
7. Navigate to Guides, open a guide link, and return to the index. Confirm meaningful page title, one H1, landmarks, headings, link purpose, image alternatives, and no focus loss.

Expected: no trap, unexpected change, obscured focus, or invisible focus target.

## Script 2 — consultation/contact request

1. Navigate from the header to the contact form.
2. Read form purpose, required-field instructions, labels, optional fields, privacy note, and submit button.
3. Submit the empty form. Confirm focus moves to the visible error summary, the summary is announced once, links move to fields, three invalid fields are exposed, and existing values are preserved.
4. Enter an invalid email; confirm a specific error. Correct it and confirm error state clears.
5. Complete required fields, operate the select, enter a message, and submit.
6. Confirm the submitting status is announced without duplicate/interruptive output.
7. Confirm the `/thanks/contact/` page has a useful title/H1 and an obvious route back.
8. In production, verify the submission arrives in Netlify/Compass processing and the stated follow-up method works.

Expected: a user can understand, correct, submit, and confirm the entire task without sight or pointer input.

## Script 3 — newsletter subscription

1. Navigate to `/newsletter/` and locate the signup by headings/landmarks.
2. Confirm name, email, and consent have meaningful labels and are announced as required.
3. Submit empty; test summary, linked errors, and focus.
4. Correct name/email, read and affirm the consent checkbox, then submit.
5. Confirm loading status and `/thanks/newsletter/` completion.
6. In production, verify the subscriber record and any vendor confirmation/unsubscribe flow. If an email is sent, test that email separately.

Expected: consent is affirmative and accessible; no prechecked state; task completion is unambiguous.

## Script 4 — read and return

Run once for a guide, blog post, newsletter issue, neighborhood guide, and curated-home story.

1. Navigate via index rather than a direct URL.
2. Use screen-reader heading and landmark lists to understand the page.
3. Confirm reading order matches visual order, images have useful purpose-based alternatives, and repeated links remain understandable in context.
4. Operate any gallery, map link, carousel, listing/source link, and back/index route.
5. Confirm external destinations are announced meaningfully and no repository page traps focus.

## Script 5 — legal, privacy, fair-housing, and accessibility help

1. Reach `/legal/` and `/privacy/` from the footer.
2. Verify headings, lists, email address, licensing/fair-housing text, and accessibility assistance are readable and operable.
3. Use the accessibility contact route to request help or an alternative format in a controlled test.
4. Record response time and whether the owner provides an effective equivalent service.

## Script 6 — visual adaptation

1. Test each template at 200% browser/text zoom without reducing viewport dimensions.
2. Test at a 1280 CSS-pixel starting viewport equivalent to 400% zoom/320 CSS pixels.
3. Apply WCAG text spacing: line height 1.5; paragraph spacing 2× font size; letter spacing .12×; word spacing .16×.
4. Confirm no clipped, overlapping, hidden, or two-dimensionally scrolling essential content.
5. Confirm focus is visible and not covered at every zoom.
6. Inspect every non-inline control for the 24×24 CSS-pixel target or document a WCAG 2.5.8 exception/adequate spacing.
7. Confirm errors, disabled/loading states, and dark/light photo overlays retain contrast.

## Script 7 — PDFs

For each of the eight PDFs, use a qualified checker and Adobe Acrobat/Preview plus a screen reader:

1. Verify document title, language, tagged status, logical tag tree, and tab order.
2. Read from start to finish; compare spoken order with visual order.
3. Verify headings, lists, links, tables, artifacts, and informative image alternatives.
4. Confirm text remains readable at high zoom/reflow where supported and contrast is sufficient.
5. Confirm all essential content is available in accessible HTML or a remediated document.
6. Give the relocation guide highest priority because static inspection found no tags/title/language markers.

## Test record template

| Date | Tester | URL/process | Platform/browser/AT/version | Steps | Expected | Actual | Result | Issue/evidence |
|---|---|---|---|---|---|---|---|---|
| YYYY-MM-DD | Name | URL or complete task | Exact environment | Script/step numbers | Expected behavior | Observed behavior | Pass/Fail/Blocked | A11Y-ID + attachment |
