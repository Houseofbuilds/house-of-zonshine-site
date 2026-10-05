import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https:\/\/juliazonshine\.com(.*?)<\/loc>/g)]
  .map((match) => match[1] || "/");
const failures = [];

function htmlPath(route) {
  return route === "/"
    ? path.join(root, "index.html")
    : path.join(root, route.replace(/^\//, ""), "index.html");
}

function metaContent(html, attribute, value) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => new RegExp(`\\b${attribute}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(tag));
  return tag?.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "";
}

function check(condition, route, message) {
  if (!condition) failures.push(`${route}: ${message}`);
}

function nodes(value) {
  if (Array.isArray(value)) return value.flatMap(nodes);
  if (value && typeof value === "object") return [value, ...nodes(value["@graph"] || [])];
  return [];
}

for (const route of routes) {
  const html = await readFile(htmlPath(route), "utf8");
  const url = `https://juliazonshine.com${route}`;

  check(Boolean(html.match(/<title>\s*\S[\s\S]*?<\/title>/i)), route, "title is missing");
  check(Boolean(metaContent(html, "name", "description")), route, "meta description is missing");
  check(metaContent(html, "property", "og:url") === url, route, "Open Graph URL must match the canonical URL");
  check(Boolean(metaContent(html, "property", "og:title")), route, "Open Graph title is missing");
  check(Boolean(metaContent(html, "property", "og:description")), route, "Open Graph description is missing");
  check(Boolean(metaContent(html, "property", "og:image")), route, "Open Graph image is missing");
  check(Boolean(metaContent(html, "name", "twitter:card")), route, "Twitter card is missing");
  check(Boolean(metaContent(html, "name", "twitter:image")), route, "Twitter image is missing");
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1];
  check(canonical === url, route, "canonical URL must match the sitemap URL");

  for (const script of html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || []) {
    const source = script.replace(/^<script\b[^>]*>/i, "").replace(/<\/script>$/i, "").trim();
    try {
      for (const node of nodes(JSON.parse(source))) {
        if (!["Article", "BlogPosting"].includes(node["@type"])) continue;
        for (const field of ["headline", "description", "image", "datePublished", "dateModified", "mainEntityOfPage", "author", "publisher"]) {
          check(Boolean(node[field]), route, `${node["@type"]} structured data is missing ${field}`);
        }
      }
    } catch {
      check(false, route, "structured data must be valid JSON");
    }
  }
}

const homepage = await readFile(path.join(root, "index.html"), "utf8");
const homepageSchema = [...homepage.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  .flatMap((match) => nodes(JSON.parse(match[1].trim())));
const business = homepageSchema.find((node) => node["@id"] === "https://juliazonshine.com/#real-estate-agent");
assert.ok(business, "Homepage must define the verified RealEstateAgent entity.");
assert.equal(business["@type"], "RealEstateAgent", "Business entity must use the RealEstateAgent type.");
assert.equal(business.name, "Julia Zonshine Real Estate Agent", "Business name must match the public Google Business Profile.");
assert.equal(business.telephone, "+1-818-859-0762", "Business phone must match the public Google Business Profile.");
assert.equal(business.url, "https://juliazonshine.com/", "Business website must point to the canonical homepage.");
const person = homepageSchema.find((node) => node["@id"] === "https://juliazonshine.com/#julia-zonshine");
assert.ok(person, "Homepage must define the Julia Zonshine person entity.");
assert.ok(person.alternateName?.includes("House of Zonshine"), "Person schema must retain the House of Zonshine brand name.");
assert.ok(person.alternateName?.includes("Julia Voth"), "Person schema must retain Julia Voth as a verified alternate name.");

assert.equal(routes.length, 49, `Expected 49 canonical sitemap URLs, found ${routes.length}`);
assert.deepEqual(failures, [], `SEO static contract failed:\n${failures.join("\n")}`);
console.log(`SEO static contract passed for ${routes.length} canonical sitemap pages.`);
