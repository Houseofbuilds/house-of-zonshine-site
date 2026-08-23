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
  "Homepage must retain all three mobile story expand controls"
);
includes(styles, "@media (max-width: 700px)", "Mobile story breakpoint");
includes(
  styles,
  ".story-copy.is-collapsible .story-more-button",
  "Condensed mobile story styling"
);
includes(script, 'document.querySelectorAll(".story-more-button")', "Mobile story behavior");

console.log("Site regression contract passed: permanent sections and destinations are intact.");
