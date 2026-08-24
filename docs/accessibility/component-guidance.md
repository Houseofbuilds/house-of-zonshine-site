# Accessible component guidance

## Global navigation

- Use native links inside a labeled `nav` and a native button for the mobile trigger.
- Keep `aria-expanded` synchronized with actual visibility.
- When the off-canvas menu is closed, keep it `inert` and `aria-hidden`; when open, make background landmarks inert.
- Escape closes and returns focus to the trigger. Breakpoint changes must reset state.

## Links and buttons

- Use links for destinations and buttons for actions/state changes.
- Names must describe purpose in context. Icon-only controls require an accessible name.
- Preserve the shared two-color focus ring. Do not add `outline: 0` unless the shared replacement still wins.
- New non-inline targets should be at least 24×24 CSS pixels or have a documented WCAG 2.5.8 exception.

## Forms and errors

- Give every field a visible associated label and appropriate `autocomplete` token.
- Mark required fields in visible text and programmatically; never rely on color.
- Forms using the shared behavior need `data-accessible-form`, `.form-error-summary`, and `.form-status`.
- On failure, retain values, show specific persistent field errors, link summary items to fields, expose `aria-invalid` and `aria-describedby`, and focus the summary.
- On valid submission, announce progress and use a useful confirmation page. Test the server/vendor path, not only the DOM.

## Carousel

- Use native buttons for previous/next and pause/play.
- Expose slide position and active/hidden state; keep hidden slides out of the accessibility tree.
- Stop automatic changes on reduced motion, pause, hover/focus interaction, and when the document is hidden.
- Do not convert the component to tabs unless it implements the complete tabs keyboard pattern.

## Cards and galleries

- Avoid nested interactive controls.
- A linked image must have alt text that communicates the linked item; nearby duplicate links may use an empty alt only when the text link supplies the same action.
- Keep captions in normal reading order and place text over images on a stable contrast backing.
- If a lightbox is ever introduced, it becomes a dialog and needs focus containment, Escape, a visible close button, background inertness, and focus return.

## Alerts and status messages

- Use `role=status`/polite announcements for submission progress and nonurgent completion.
- Move focus only when the user must act, such as an error summary.
- Avoid assertive announcements for routine changes and never announce decorative carousel motion.

## Accordions, modals, media, maps

- There are currently no public accordions or modals. Prefer native `details/summary` for simple disclosure.
- The hero video is decorative/muted and must stay hidden from assistive technology; any future audio requires captions/transcript and accessible controls.
- Embedded maps are supplemental. Give iframes useful titles and preserve equivalent location/neighborhood information outside the embed.

## Release checklist

Run `npm run test:static` and `npm run test:a11y`; then complete the critical manual scripts. New components must be tested in every state, at narrow reflow, with keyboard, and with the required assistive-technology matrix.
