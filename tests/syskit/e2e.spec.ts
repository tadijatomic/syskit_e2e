import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test("Adele cannot delete Chronos team", async ({ page }) => {
  const usermail = process.env.USERMAIL;
  const password = process.env.PASSWORD;
  const deleteText: string = "delete";
  const deleteTextUpper = deleteText.toUpperCase();

  if (!usermail || !password) {
    throw new Error("Username or password is missing");
  }

  await page.goto("https://syskit-point-e2e-task-2025.syskit365demo.com/");
  await page.click('button:has-text("Sign in")', { force: true });

  await page.fill("#i0116", usermail);
  await page.click("#idSIButton9");

  await page.fill("#i0118", password);
  await page.click("#idSIButton9");

  await page.click("#idBtn_Back");

  await page.click('span.navigation__item-name:has-text("Teams & Groups")');

  await page.fill('[aria-label="Search in the data grid"]', "Chronos");

  const row = await page.locator('table tr:has-text("Chronos")').last();
  await row.click();

  await page.click('//span[text()="Delete"]');

  const popup = await page.locator(
    "div.dx-overlay-content.dx-popup-normal.dx-popup-flex-height.dx-resizable"
  );
  await expect(popup).toBeVisible();

  const deleteInput = await popup.locator("input");
  await deleteInput.fill(deleteTextUpper);

  const deleteButton = await popup.locator('button:has-text("Delete")');
  await deleteButton.click();
});
