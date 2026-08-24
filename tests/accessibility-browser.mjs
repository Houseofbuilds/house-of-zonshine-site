import assert from "node:assert/strict";
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https:\/\/juliazonshine\.com(.*?)<\/loc>/g)]
  .map((match) => match[1] || "/");
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"], [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"], [".json", "application/json"],
  [".jpg", "image/jpeg"], [".jpeg", "image/jpeg"], [".png", "image/png"],
  [".svg", "image/svg+xml"], [".webp", "image/webp"], [".mp4", "video/mp4"],
  [".pdf", "application/pdf"]
]);

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === "POST") {
      request.resume();
      response.writeHead(303, { Location: request.url });
      response.end();
      return;
    }
    const url = new URL(request.url, "http://127.0.0.1");
    let relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    let candidate = path.resolve(root, relative || "index.html");
    assert.ok(candidate.startsWith(root + path.sep) || candidate === path.join(root, "index.html"));
    const details = await stat(candidate).catch(() => null);
    if (details?.isDirectory()) candidate = path.join(candidate, "index.html");
    const body = await readFile(candidate);
    response.writeHead(200, { "Content-Type": contentTypes.get(path.extname(candidate)) || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not found");
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const baseURL = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, channel: process.env.CI ? undefined : "chrome" });
const failures = [];

async function visit(page, route) {
  await page.goto(baseURL + route, { waitUntil: "domcontentloaded" });
  await page.addStyleTag({ content: "*,*::before,*::after{animation-duration:0.01ms!important;animation-delay:0ms!important;transition-duration:0.01ms!important}.reveal{opacity:1!important;transform:none!important}" });
}

try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  await context.route("**/*", (route) => {
    if (route.request().url().startsWith(baseURL)) route.continue();
    else route.abort();
  });
  const page = await context.newPage();

  for (const route of routes) {
    await visit(page, route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    for (const violation of result.violations) {
      failures.push(`${route}: axe ${violation.id} (${violation.impact}) — ${violation.nodes.length} node(s)`);
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await visit(page, "/");
  assert.equal(await page.locator("#site-nav").getAttribute("aria-hidden"), "true");
  assert.equal(await page.locator("#site-nav").evaluate((node) => node.inert), true);
  await page.locator("#menu-button").focus();
  await page.keyboard.press("Tab");
  assert.notEqual(await page.evaluate(() => document.activeElement?.closest("#site-nav")?.id), "site-nav", "closed mobile navigation entered the tab order");
  await page.locator("#menu-button").click();
  assert.equal(await page.locator("#menu-button").getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#menu-button").getAttribute("aria-expanded"), "false");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "menu-button");

  await page.locator(".skip-link").focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(25);
  assert.equal(await page.evaluate(() => document.activeElement?.id), "main");

  const beforeReview = await page.locator(".testimonial-current").textContent();
  await page.waitForTimeout(3300);
  assert.equal(await page.locator(".testimonial-current").textContent(), beforeReview, "carousel advanced despite reduced-motion preference");
  assert.equal(await page.locator(".testimonial-pause").getAttribute("aria-pressed"), "true");

  const email = page.locator('form[name="contact"] input[name="email"]');
  await email.focus();
  const focusStyle = await email.evaluate((node) => {
    const style = getComputedStyle(node);
    return { outline: style.outlineStyle, outlineWidth: style.outlineWidth, boxShadow: style.boxShadow };
  });
  assert.ok(focusStyle.outline !== "none" || focusStyle.boxShadow !== "none", `form focus indicator is not visible: ${JSON.stringify(focusStyle)}`);

  await page.locator('form[name="contact"] button[type="submit"]').click();
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains("form-error-summary")), true);
  assert.equal(await page.locator('form[name="contact"] [aria-invalid="true"]').count(), 3);
  await page.locator('input[name="first-name"]').fill("Accessibility");
  await page.locator('input[name="last-name"]').fill("Tester");
  await email.fill("test@example.com");
  await Promise.all([
    page.waitForURL("**/thanks/contact/"),
    page.locator('form[name="contact"] button[type="submit"]').click()
  ]);
  assert.match(await page.locator("h1").textContent(), /got it/i);

  await visit(page, "/newsletter/");
  await page.locator('form[name="newsletter"] button[type="submit"]').click();
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains("form-error-summary")), true);
  assert.equal(await page.locator('form[name="newsletter"] [aria-invalid="true"]').count(), 3);
  await page.locator('#archive-full-name').fill("Accessibility Tester");
  await page.locator('#archive-email').fill("test@example.com");
  await page.locator('#archive-consent').check();
  await Promise.all([
    page.waitForURL("**/thanks/newsletter/"),
    page.locator('form[name="newsletter"] button[type="submit"]').click()
  ]);
  assert.match(await page.locator("h1").textContent(), /on the list/i);
  await context.close();

  const reflowContext = await browser.newContext({ viewport: { width: 320, height: 800 }, reducedMotion: "reduce" });
  await reflowContext.route("**/*", (route) => {
    if (route.request().url().startsWith(baseURL)) route.continue();
    else route.abort();
  });
  const reflowPage = await reflowContext.newPage();
  for (const route of routes) {
    await visit(reflowPage, route);
    const widths = await reflowPage.evaluate(() => ({ viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth }));
    if (widths.document > widths.viewport + 1) failures.push(`${route}: horizontal page overflow at 320 CSS px (${widths.document}px > ${widths.viewport}px)`);
  }
  await reflowContext.close();

  assert.deepEqual(failures, [], `Browser accessibility checks failed:\n${failures.join("\n")}`);
  console.log(`Browser accessibility checks passed: axe and 320px reflow on ${routes.length} pages, plus keyboard and complete form workflows.`);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
