import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { LoginPage } from "../page_objects/LoginPage";
import { Helpers } from "../helpers";
import { ActionDetailsPage } from "../page_objects/ActionDetailsPage";

dotenv.config();

test("Adele cannot add user to group", async ({ page }) => {
  const usermail = process.env.USERMAIL;
  const password = process.env.PASSWORD;
  const syskitUser: string = "Alverta Engel";
  const groupName: string = "Deep";
  const loginPage = new LoginPage(page);
  const helpers = new Helpers(page);
  const actionDetailsPage = new ActionDetailsPage(page);

  if (!usermail || !password) {
    throw new Error("Username or password is missing");
  }

  LoginPage.validateLoginData(usermail, password);

  await loginPage.goToPage();

  await page.click('button:has-text("Sign in")');

  await loginPage.enterEmail(usermail);
  await loginPage.submitLogin();

  await loginPage.enterPassword(password);
  await loginPage.submitLogin();

  await page.click("#idBtn_Back");

  await helpers.sidebarItem("Users");

  await helpers.searchByValue(syskitUser);

  await page.click(`table tr span a:has-text("${syskitUser}")`, {
    force: true,
  });

  await page.click('text="Add to Groups"');

  const popup = await page.locator(
    "div.dx-overlay-content.dx-popup-normal.dx-resizable.dx-popup-flex-height"
  );
  await expect(popup).toBeVisible();

  const input = await popup.locator('input[type="text"]');
  await input.fill(groupName);

  await page.click(`span:has-text("${groupName}")`);

  const addBtn = await popup.locator('button:has-text("Add")');
  await addBtn.click();

  await page.click('[title="Notifications"]');

  await page
    .locator('div.progress-notification__text a:has-text("Check details")')
    .nth(0)
    .click();

  actionDetailsPage.getStatusColumnHeaderText();

  actionDetailsPage.getFirstRowStatusText();

  actionDetailsPage.verifyStatusColumnHeader();

  actionDetailsPage.verifyFirstRowStatus(
    "Error: Insufficient privileges to complete the operation."
  );
});
