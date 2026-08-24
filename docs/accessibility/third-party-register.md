# Third-party accessibility register

| Vendor/integration | Purpose and journey | Repository control | Current evidence | Known risk/status | Fallback / next action |
|---|---|---|---|---|---|
| Netlify hosting and Forms | Hosts site; processes contact and newsletter POSTs and routes confirmations | Form HTML, validation, action, and confirmation pages are controllable; Netlify backend is vendor-owned | Netlify documents static form detection and custom success pages; repository production-like POST tests pass | No current ACR/VPAT located in research; live deployed delivery not retested after these source changes | Direct accessibility email/phone assistance; verify real submissions after deploy; request current ACR/support evidence if relied on for a conformance statement |
| Compass systems | Receives/uses contact or subscriber record per privacy copy; outbound broker/listing destinations | Privacy disclosure and outbound labels are controllable; Compass systems are not | No current public ACR identified | Essential if it is the only internal path for responding to leads; end-user pages may be separate scope | Owner tests the actual handoff; retain direct email/phone service; request Compass accessibility documentation and open dated tickets for defects |
| RSR Real Estate | Brand/profile destination | Link label and logo alt are controllable; destination is not | No ACR collected | Supplemental external destination | Keep Julia’s direct contact path on-site; report external defects to RSR |
| Google Maps iframe | Supplemental neighborhood orientation | Iframe title and surrounding equivalent text are controllable; embedded UI is not | Google publishes general accessibility resources, but no implementation-specific result has been recorded | Map controls can be complex for keyboard/screen-reader users | Neighborhood addresses and descriptive copy remain in HTML; test deployed embed; link to a textual/directions alternative if a task requires it |
| Google Fonts | Font delivery | Font choice/fallback is controllable; network delivery is not | No interactive user interface | Low accessibility risk; network/privacy/availability risk | Maintain readable fallback sans serif; page remains usable if request fails |
| Compass and other listing pages | Optional full-listing detail links from favorites/newsletters | Link purpose is controllable; destination is not | Not audited | External listing pages may have independent barriers | Preserve House of Zonshine’s direct consultation route and on-site approved property facts; report vendor-owned barriers |
| Instagram, YouTube, source/credit sites | Social/editorial destinations | Link text/rel attributes controllable; destination not | Not audited | Supplemental | No essential House of Zonshine service depends solely on these destinations |
| Remote editorial images | A few historical images load from source organizations | Alt text and fallback page copy controllable; availability not | HTML alternatives present | Image server can fail or change | Keep surrounding history text and useful alt; prefer approved local copies where licensing permits |

## Required vendor evidence workflow

1. Record exact product/version/URL and which complete task depends on it.
2. Request the current ACR/VPAT and date/version; do not accept a marketing “ADA compliant” claim as testing.
3. Test the deployed implementation with keyboard and the required screen-reader matrix.
4. Fix configuration/integration defects in repository control.
5. Open a dated vendor ticket for vendor-owned defects and record it here and in the issue register.
6. Maintain an equivalent timely email/phone route while an essential blocker is open.

## Source notes

- Netlify’s official Forms documentation confirms that static HTML forms are detected at deploy time and may use custom success pages: https://docs.netlify.com/manage/forms/setup/
- Netlify describes internal keyboard, VoiceOver, Storybook, and axe testing, while explicitly acknowledging that this does not establish that every issue is absent: https://www.netlify.com/blog/2020/12/08/how-we-test-for-accessibility-at-netlify/
