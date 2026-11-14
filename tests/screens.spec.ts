import { test } from "@playwright/test";

// Review screenshots for _private/screens/. Run with: SCREENS=1 npx playwright test screens
const OUT = "_private/screens";

test.describe("screens", () => {
  test.skip(!process.env.SCREENS, "Set SCREENS=1 to save review screenshots");

  test("home, case study and proof matrix", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1200); // let the hero entrance animation settle
    await page.screenshot({ path: `${OUT}/home-1440x900.png` });
    await page.screenshot({ path: `${OUT}/home-1440-full.png`, fullPage: true });
    await page.locator("#proof").screenshot({ path: `${OUT}/proof-matrix-1440.png` });
    for (const id of ["work", "experience", "how-i-work", "about"]) {
      await page.locator(`#${id}`).screenshot({ path: `${OUT}/section-${id}-1440.png` });
    }

    await page.locator("#writebookai").getByRole("button", { name: "Read the case study" }).click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/writebookai-case-study-1440.png` });
    const body = page.getByRole("dialog").locator("> div");
    await body.evaluate((el) => el.scrollBy(0, 1400));
    await page.screenshot({ path: `${OUT}/writebookai-case-study-1440-scrolled.png` });
    await page.keyboard.press("Escape");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT}/home-390x844.png` });
    await page.locator("#proof").screenshot({ path: `${OUT}/proof-matrix-390.png` });
  });
});
