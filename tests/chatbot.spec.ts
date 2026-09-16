import { test, expect } from "@playwright/test";

test.describe("Chatbot", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("floating button is visible on page load", async ({ page }) => {
    const botButton = page.locator("button.fixed.bottom-6.right-6");
    await expect(botButton).toBeVisible();
  });

  test("opens chat window when button is clicked", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    // Chat header should appear — use the header div specifically
    await expect(
      page.locator("div.text-white.font-bold.text-sm", { hasText: "Atif Agent" })
    ).toBeVisible();
    await expect(page.getByText("AI-powered career assistant")).toBeVisible();
  });

  test("shows welcome message with rendered markdown", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    // Welcome message should have rendered bold text (not raw **)
    const welcomeArea = page.locator(".overflow-y-auto");
    await expect(welcomeArea.locator("strong").first()).toBeVisible();

    // Should NOT show raw ** markdown
    const rawMarkdown = await welcomeArea.textContent();
    expect(rawMarkdown).not.toContain("**Atif Agent**");
  });

  test("shows quick action buttons", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    await expect(page.getByRole("button", { name: "Key Projects" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Tech Stack" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Availability" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Paste a JD" })).toBeVisible();
  });

  test("shows Send Interest and Book a Call links", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    await expect(page.getByRole("button", { name: "Send Interest" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Book a Call" })).toBeVisible();
  });

  test("can type and send a message", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    const input = page.getByPlaceholder("Ask about Atif's work...");
    await expect(input).toBeVisible();

    await input.fill("Hello");
    await input.press("Enter");

    // User message should appear
    await expect(page.getByText("Hello")).toBeVisible();
  });

  test("Paste a JD button pre-fills input", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    await page.getByRole("button", { name: "Paste a JD" }).click();

    const input = page.getByPlaceholder("Ask about Atif's work...");
    const value = await input.inputValue();
    expect(value).toContain("JD");
  });

  test("Send Interest opens email form", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    await page.getByRole("button", { name: "Send Interest" }).click();

    // Email form fields should appear
    await expect(page.getByPlaceholder("Your Name *")).toBeVisible();
    await expect(page.getByPlaceholder("Company *")).toBeVisible();
    await expect(page.getByPlaceholder("Role You're Hiring For *")).toBeVisible();
    await expect(page.getByPlaceholder("Your Email (optional)")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send to Atif" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  });

  test("email form Cancel closes the form", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    await page.getByRole("button", { name: "Send Interest" }).click();
    await expect(page.getByPlaceholder("Your Name *")).toBeVisible();

    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByPlaceholder("Your Name *")).not.toBeVisible();
  });

  test("email form Send button is disabled without required fields", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();
    await page.getByRole("button", { name: "Send Interest" }).click();

    const sendBtn = page.getByRole("button", { name: "Send to Atif" });
    await expect(sendBtn).toBeDisabled();

    // Fill only name — still disabled
    await page.getByPlaceholder("Your Name *").fill("Jane");
    await expect(sendBtn).toBeDisabled();

    // Fill company — still disabled
    await page.getByPlaceholder("Company *").fill("Acme");
    await expect(sendBtn).toBeDisabled();

    // Fill role — now enabled
    await page.getByPlaceholder("Role You're Hiring For *").fill("AI Engineer");
    await expect(sendBtn).toBeEnabled();
  });

  test("close button hides the chat window", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();
    await expect(
      page.locator("div.text-white.font-bold.text-sm", { hasText: "Atif Agent" })
    ).toBeVisible();

    // Click the X close button in the header
    await page.locator(".border-b.border-white\\/10 button").click();

    // Chat window should be gone, floating button should return
    await expect(page.getByText("AI-powered career assistant")).not.toBeVisible();
    await expect(page.locator("button.fixed.bottom-6.right-6")).toBeVisible();
  });

  test("sends a quick question when clicked", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    await page.getByRole("button", { name: "Key Projects" }).click();

    await expect(
      page.getByText("What are Atif's most impressive projects?")
    ).toBeVisible();
  });

  test("Book a Call link has correct href", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    const bookLink = page.getByRole("link", { name: "Book a Call" });
    await expect(bookLink).toHaveAttribute(
      "href",
      "https://calendar.app.google/VUyweT99vyAhinNV9"
    );
    await expect(bookLink).toHaveAttribute("target", "_blank");
  });

  test("API responds to chat message", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    const input = page.getByPlaceholder("Ask about Atif's work...");
    await input.fill("What is Atif's salary expectation?");
    await input.press("Enter");

    // Wait for a response (either success or error fallback)
    await page.waitForTimeout(10000);

    // Should have more than just welcome + user message
    const messages = page.locator(".overflow-y-auto > div > div");
    const count = await messages.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("markdown rendering: bullets render as list items", async ({ page }) => {
    await page.locator("button.fixed.bottom-6.right-6").click();

    const listItems = page.locator(".overflow-y-auto li");
    const count = await listItems.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
