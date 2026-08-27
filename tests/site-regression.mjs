import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const homepage = await readFile(new URL("../index.html", import.meta.url), "utf8");
const styles = await readFile(new URL("../css/style.css", import.meta.url), "utf8");
const script = await readFile(new URL("../js/script.js", import.meta.url), "utf8");

function extract(pattern, label) {
  const match = homepage.match(pattern);
  assert.ok(match, `${label} is missing from index.html`);
  return match[1];
}

function includes(source, expected, label) {
  assert.ok(source.includes(expected), `${label} is missing: ${expected}`);
}

function excludes(source, unexpected, label) {
  assert.ok(!source.includes(unexpected), `${label} must not include: ${unexpected}`);
}

const primaryNav = extract(
  /(<nav class="site-nav"[\s\S]*?<\/nav>)/,
  "Primary navigation"
);
const footerLinks = extract(
  /<div class="footer-links">([\s\S]*?)<\/div>/,
  "Footer navigation"
);

for (const sectionId of [
  "about",
  "pathways",
  "stories",
  "julia-edit",
  "resources",
  "newsletter",
  "contact",
]) {
  includes(homepage, `id="${sectionId}"`, `Homepage section #${sectionId}`);
}

for (const [label, href] of [
  ["Stories", "#stories"],
  ["The Edit", "favorites/"],
  ["Guides", "guides/"],
  ["Newsletter", "newsletter/"],
  ["Blog", "blog/"],
  ["Contact", "#contact"],
]) {
  includes(primaryNav, `href="${href}"`, `${label} primary-navigation link`);
  includes(footerLinks, `href="${href}"`, `${label} footer link`);
}

for (const path of [
  "../blog/index.html",
  "../favorites/index.html",
  "../guides/index.html",
  "../newsletter/index.html",
]) {
  await access(new URL(path, import.meta.url));
}

assert.equal(
  (homepage.match(/class="story-more-button"/g) || []).length,
  3,
  "Homepage must retain all three story expand controls"
);
assert.equal(
  (homepage.match(/class="story-more-label">Read More</g) || []).length,
  3,
  "Every homepage story must begin with a Read More control"
);
includes(
  styles,
  ".story-copy.is-collapsible .story-more-button",
  "Condensed story styling"
);
includes(
  styles,
  '.story-more-button[aria-expanded="false"] + .story-continuation',
  "Collapsed story continuation styling"
);
includes(script, 'document.querySelectorAll(".story-more-button")', "Story disclosure behavior");
includes(script, 'isExpanded ? "Read More" : "Show Less"', "Story disclosure labels");

const listingGuideDestinations = {
  "2276-moreno-dr": "../../neighborhoods/silver-lake/",
  "1190-n-wilson-ave": "../../neighborhoods/pasadena/",
  "2666-aberdeen-ave": "../../neighborhoods/los-feliz/",
  "485-madeline-dr": "../../neighborhoods/pasadena/",
  "5114-cedros-ave": "../../neighborhoods/sherman-oaks/",
  "3627-cody-rd": "../../neighborhoods/sherman-oaks/",
  "1395-inverness-dr": "../../neighborhoods/pasadena/",
  "2414-4th-ave": "../../guides/#local-guides",
};
const obsessionList = JSON.parse(
  await readFile(new URL("../data/obsession-list.json", import.meta.url), "utf8")
);

assert.deepEqual(
  obsessionList.map(({ slug }) => slug).sort(),
  Object.keys(listingGuideDestinations).sort(),
  "Every Zonshine Edit listing must have a verified guide destination"
);

for (const [slug, guideHref] of Object.entries(listingGuideDestinations)) {
  const listing = await readFile(
    new URL(`../favorites/${slug}/index.html`, import.meta.url),
    "utf8"
  );
  const topNavigation = listing.match(
    /<nav class="obsession-detail-nav"[\s\S]*?<\/nav>/
  );
  const closingActions = listing.match(
    /<div class="obsession-cta-actions">[\s\S]*?<\/div>/
  );

  assert.ok(topNavigation, `${slug} is missing its top listing navigation`);
  assert.ok(closingActions, `${slug} is missing its closing listing actions`);
  includes(topNavigation[0], `href="${guideHref}"`, `${slug} top guide link`);
  includes(closingActions[0], `href="${guideHref}"`, `${slug} bottom guide link`);
}

for (const neighborhood of ["silver-lake", "pasadena", "los-feliz", "sherman-oaks"]) {
  await access(new URL(`../neighborhoods/${neighborhood}/index.html`, import.meta.url));
}
includes(
  await readFile(new URL("../guides/index.html", import.meta.url), "utf8"),
  'id="local-guides"',
  "Local Guides fallback destination"
);

includes(script, "function startTestimonialAutoplay()", "Testimonial autoplay behavior");
includes(script, "testimonialPause.addEventListener", "Testimonial pause control");
excludes(
  script,
  'testimonialCarousel.addEventListener("mouseenter"',
  "Testimonial autoplay while the pointer rests over the carousel"
);
excludes(
  script,
  'testimonialCarousel.addEventListener("focusin"',
  "Testimonial autoplay after manual navigation"
);

console.log("Site regression contract passed: permanent sections, guide routes, and testimonial autoplay are intact.");
