# Independent accessibility auditor handoff

## Engagement requested

Perform an independent manual WCAG 2.2 Level AA audit of the final deployed House of Zonshine production site, issue a retest-ready report, and retest every remediated finding. Do not treat the repository’s axe pass as conformance evidence by itself.

## Production scope

- Site: `https://juliazonshine.com/` (use only after the remediated release is deployed)
- Inventory: [inventory.md](inventory.md)
- Issue register: [issue-register.csv](issue-register.csv)
- Remediation log: [remediation-log.md](remediation-log.md)
- Manual scripts: [manual-qa.md](manual-qa.md)
- Implementation report: [accessibility-implementation-report.md](accessibility-implementation-report.md)
- Third parties: [third-party-register.md](third-party-register.md)
- Eight PDFs under `/freebies/pdfs/`

## Required methodology

- Use WCAG-EM principles: define scope, examine technologies/functionality, select a structured representative sample plus critical processes, evaluate complete pages/processes, and report findings.
- Test every applicable WCAG 2.2 A and AA success criterion; record not-applicable criteria explicitly.
- Required assistive technology: NVDA + Firefox or Chrome on Windows; VoiceOver + Safari on macOS; VoiceOver + Safari on iPhone.
- Also test keyboard-only use, 200% text resize, 320 CSS-pixel/400% reflow, WCAG text spacing, contrast in every state, touch targets, reduced motion, focus visibility/obscuration, and voice control where custom interaction creates risk.
- Audit PDFs using a qualified PDF checker plus human reading-order, keyboard, zoom, and screen-reader testing.
- Include exact URL/component, WCAG criterion, severity, disability impact, steps, evidence, recommendation, environment, tester, and date for every finding.

## Complete tasks to test

1. Use desktop and mobile navigation to find services, guides, blog, newsletter, legal/privacy/accessibility information, and contact.
2. Submit the real consultation form through validation, correction, loading, vendor processing, and confirmation.
3. Subscribe to the newsletter through validation, consent, vendor processing, confirmation, and any email/unsubscribe flow.
4. Read and return from a guide, blog post, newsletter issue, neighborhood guide, and curated-home story; operate maps/galleries/outbound links as applicable.
5. Request accessibility assistance or an alternative format through the monitored contact process.
6. Read/download every public PDF, prioritizing the 13-page relocation guide.

## Known open items at handoff creation

- Release `085d265` was deployed on August 24, 2026. A safe automated production retest passed all 27 canonical pages for axe A/AA rules, 320 CSS-pixel reflow, keyboard navigation, form-error behavior, and the published statement. No fake valid form submissions were sent to the live business accounts.
- No independent screen-reader test has been performed.
- The relocation PDF shows no static tagging/title/language markers; the other seven require human verification.
- Vendor ACRs/support evidence and production Netlify delivery tests remain open.

## Retest acceptance

Retest the same production URLs, states, complete tasks, browsers, and assistive technologies used to reproduce each issue. Supply a closed/open result per issue and document any regression. A conformance statement, if supported, must identify the exact scope, WCAG version/level, technologies relied upon, date, evaluator, and known limitations.

## Owner action needed before sending

Julia must select the independent auditor, authorize the engagement/cost and external communication, supply the auditor’s contact route, and confirm that the remediated release is live. Attach or securely share this folder and the final production release identifier. Codex cannot select/spend on or contact an outside professional without that authority.

## Selection criteria

- Independent from the implementation team and any overlay/widget vendor.
- Demonstrated WCAG 2.2 AA conformance-audit and remediation-retest work, including complete processes and PDFs.
- Named testers with current IAAP CPWA/WAS or comparable expertise; verify credentials rather than relying on a company badge.
- Uses people with disabilities/assistive-technology expertise and supplies exact reproducible findings, not only an automated score.
- Contract includes the required browser/AT matrix, all eight PDFs, vendor handoffs, a remediation consultation, and one or more production retests.
- Will disclose scope limitations and will not sell a “lawsuit-proof” or one-click certification claim.

Useful neutral starting points: the [IAAP member/certification directories](https://www.iaap-hq.org/search/) and [W3C’s conformance-evaluation guidance](https://www.w3.org/WAI/test-evaluate/conformance/). Directory membership or certification is one signal, not a substitute for evaluating the proposed methodology and deliverables.
