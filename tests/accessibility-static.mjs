import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const blogIndex = await readFile(path.join(root, "blog", "index.html"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https:\/\/juliazonshine\.com(.*?)<\/loc>/g)]
  .map((match) => match[1] || "/");
const workflowRoutes = ["/thanks/contact/", "/thanks/newsletter/"];
const failures = [];

function htmlPath(route) {
  return route === "/"
    ? path.join(root, "index.html")
    : path.join(root, route.replace(/^\//, ""), "index.html");
}

function check(condition, route, message) {
  if (!condition) failures.push(`${route}: ${message}`);
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return match ? match[1] ?? match[2] : null;
}

for (const route of [...routes, ...workflowRoutes]) {
  const html = await readFile(htmlPath(route), "utf8");
  const isConfirmation = route.startsWith("/thanks/");

  check(/<html\b[^>]*\blang="en"/i.test(html), route, "document language must be English");
  check(/<meta\b[^>]*name="viewport"/i.test(html), route, "viewport metadata is missing");
  check((html.match(/<main\b/gi) || []).length === 1, route, "must contain exactly one main landmark");
  check((html.match(/<h1\b/gi) || []).length === 1, route, "must contain exactly one h1");
  check(!/tabindex=["'](?:[1-9]|[1-9][0-9]+)["']/i.test(html), route, "positive tabindex is prohibited");
  check(!/<(?:a|button)\b[^>]*role=["']img["'][^>]*>[\s\S]*?<(?:a|button)\b/i.test(html), route, "interactive content must not be nested in role=img");

  if (route.startsWith("/blog/") && route !== "/blog/") {
    const articleSlug = route.slice("/blog/".length);
    check(blogIndex.includes(`href="${articleSlug}"`), route, "blog index must link to every article");

    const articleCopy = html.match(/<div class="article-copy">([\s\S]*?)<\/div>/i)?.[1] || "";
    const articleLinks = [...articleCopy.matchAll(/<a\b[^>]*\bhref=(?:"([^"]+)"|'([^']+)')[^>]*>([\s\S]*?)<\/a>/gi)]
      .map((match) => ({ href: match[1] ?? match[2], text: match[3].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() }))
      .filter(({ href }) => !/^(?:https?:|mailto:|tel:|#)/i.test(href));

    check(articleLinks.length > 0, route, "article body must contain at least one contextual internal link");
    for (const { href, text } of articleLinks) {
      check(Boolean(text), route, `internal link has no descriptive anchor text: ${href}`);
      const destination = new URL(href, `https://juliazonshine.com${route}`);
      try {
        await access(htmlPath(destination.pathname));
      } catch {
        check(false, route, `internal link destination is missing locally: ${href}`);
      }
    }
  }

  if (!isConfirmation) {
    const skipTarget = html.match(/<a\b[^>]*class=["'][^"']*skip-link[^"']*["'][^>]*href=["']#([^"']+)["']/i)?.[1];
    check(Boolean(skipTarget), route, "skip link is missing");
    check(Boolean(skipTarget && new RegExp(`<main\\b[^>]*id=["']${skipTarget.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(html)), route, "skip-link target must be the main landmark");
  }

  const ids = [...html.matchAll(/\sid=(?:"([^"]+)"|'([^']+)')/gi)].map((match) => match[1] ?? match[2]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  check(duplicates.length === 0, route, `duplicate ids: ${duplicates.join(", ")}`);

  for (const image of html.match(/<img\b[^>]*>/gi) || []) {
    check(attr(image, "alt") !== null, route, `image is missing alt: ${image.slice(0, 100)}`);
  }
  for (const frame of html.match(/<iframe\b[^>]*>/gi) || []) {
    check(Boolean(attr(frame, "title")?.trim()), route, "iframe is missing a useful title");
  }

  for (const form of html.match(/<form\b[\s\S]*?<\/form>/gi) || []) {
    check(/\bdata-accessible-form\b/i.test(form), route, "form is not wired to accessible validation");
    check(/class=["'][^"']*form-error-summary/i.test(form), route, "form error summary is missing");
    check(/class=["'][^"']*form-status/i.test(form), route, "form live status is missing");
    check(/\baction=["']\/thanks\/(?:contact|newsletter)\//i.test(form), route, "form confirmation route is missing");
    for (const control of form.match(/<(?:input|select|textarea)\b[^>]*>/gi) || []) {
      const type = (attr(control, "type") || "text").toLowerCase();
      const name = attr(control, "name");
      if (type === "hidden" || name === "bot-field") continue;
      const id = attr(control, "id");
      const hasForLabel = id && new RegExp(`<label\\b[^>]*for=["']${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(form);
      const hasWrappingLabel = new RegExp(`<label\\b[^>]*>[\\s\\S]*?${control.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(form);
      check(Boolean(hasForLabel || hasWrappingLabel), route, `form control ${name || id || "unnamed"} has no label`);
    }
  }
}

assert.equal(routes.length, 30, `Expected 30 canonical sitemap URLs, found ${routes.length}`);
assert.deepEqual(failures, [], `Accessibility static contract failed:\n${failures.join("\n")}`);
console.log(`Accessibility static contract passed for ${routes.length} canonical pages and ${workflowRoutes.length} confirmation pages.`);
