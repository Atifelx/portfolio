import { test, expect, type Page } from "@playwright/test";

const BANNED = /procter|p&g|lead developer|67%|7% →|llama|mistral|running live|arize|sign-ups/i;

// True when the element sits fully inside the first screen, without scrolling
async function inFirstScreen(page: Page, selector: string) {
  return page.locator(selector).first().evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.top >= 0 && r.bottom <= window.innerHeight && r.width > 0;
  });
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`hero shows role, proof tiles and resume button without scrolling at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const hero = page.locator("#home");
    await expect(hero.getByText("Forward Deployed Engineer", { exact: true })).toBeVisible();
    expect(await inFirstScreen(page, '#home p:text-is("Forward Deployed Engineer")')).toBe(true);
    for (const href of ["#experience", "#writebookai", "#triagelens"]) {
      expect(await inFirstScreen(page, `#home a[href="${href}"]`), href).toBe(true);
    }
    expect(await inFirstScreen(page, '#home a:text-is("View resume")')).toBe(true);
  });
}

test("page text has no banned claims and never names the client", async ({ page }) => {
  await page.goto("/");
  const text = await page.locator("body").innerText();
  expect(text).not.toMatch(BANNED);
  await expect(page.locator('img[src*="pg.png"]')).toHaveCount(0);
});

test("page order puts the proof matrix after the hero", async ({ page }) => {
  await page.goto("/");
  const ids = await page.locator("main > section").evaluateAll((els) => els.map((e) => e.id));
  expect(ids).toEqual(["home", "proof", "work", "experience", "how-i-work", "about", "recommendations", "contact"]);
});

test("WriteBookAI case study opens with the load-test caveat", async ({ page }) => {
  await page.goto("/");
  await page.locator("#writebookai").getByRole("button", { name: "Read the case study" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "WriteBookAI" })).toBeVisible();
  await expect(dialog.getByText("It does not prove 50 real simultaneous AI generations")).toBeVisible();
  await expect(dialog).not.toContainText(/\bRAG\b/);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
});
