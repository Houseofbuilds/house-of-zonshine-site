# Accessible content-author guide

## Page structure

- Give each page one descriptive H1. Nest H2/H3 by topic, not visual size.
- Use real lists for lists, blockquotes for quotations, and tables only for data with headers.
- Keep the `lang="en"` document language; mark genuine passages in another language with the correct `lang`.

## Images

- Write concise alt text for the image’s purpose in that context, not every visible detail.
- Use `alt=""` for decorative images. Do not write “image of,” filenames, SEO keyword lists, or generic “house.”
- If an image contains essential text, put the same information in HTML.
- For complex maps/diagrams, provide a short alt plus a nearby detailed text equivalent.

## Links

- Name the destination or action. Avoid isolated “click here,” “more,” and identical “read more” links.
- If a link opens an external listing/source, make its purpose clear in the surrounding text.
- Do not paste raw long URLs as the only visible link label unless the URL itself is the content.

## Video and audio

- Prerecorded speech requires accurate synchronized captions; meaningful visual-only information needs audio description or an equivalent text alternative.
- Audio-only material needs a transcript. Do not rely on automatic captions without editing.
- Decorative muted video must contain no essential information and remain hidden from assistive technology.

## PDFs and downloads

- Prefer an accessible HTML page. Never make essential service information available only in a PDF.
- Start with proper heading/list/table styles in the source document, add alt text, set title/language, and export as tagged PDF.
- Test tags, reading order, links, contrast, and screen-reader output before publishing. A Canva/Acrobat “tagged” marker alone is not proof.
- Add every new document to the inventory and remediation log.

## Forms and components

- Do not remove labels, required explanations, summaries, status regions, pause controls, or focus styles.
- Do not replace native buttons/links with clickable divs or spans.
- Do not add ARIA unless the implemented behavior matches the pattern and is tested.

## Publishing checklist

1. One H1 and logical headings.
2. Purpose-based alt text or deliberate empty alt.
3. Descriptive links.
4. Captions/transcripts where applicable.
5. No essential text embedded in images.
6. New PDFs audited or equivalent HTML supplied.
7. Keyboard, zoom/reflow, contrast, and automated tests pass.
8. Record the release and retest in `remediation-log.md`.
