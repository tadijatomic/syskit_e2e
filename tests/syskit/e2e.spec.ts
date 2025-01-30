import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test("Adele cannot delete Chronos team", async ({ page }) => {
  await page.goto("https://syskit-point-e2e-task-2025.syskit365demo.com/");

  await page.click('button:has-text("Sign in")', { force: true });

  const usermail = process.env.USERMAIL;
  const password = process.env.PASSWORD;

  if (!usermail || !password) {
    throw new Error("Username or password is missing");
  }

  await page.fill("#i0116", usermail);
  await page.click("#idSIButton9");

  await page.fill("#i0118", password);
  await page.click("#idSIButton9");

  await page.click("#idBtn_Back");
  await page.click('span.navigation__item-name:has-text("Teams & Groups")');

  await page.fill('[aria-label="Search in the data grid"]', "Chronos");

  await page.waitForSelector("tr");
});
