import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { LoginPage } from "../page_objects/LoginPage";
import { Helpers } from "../helpers";
import { ActionDetailsPage } from "../page_objects/ActionDetailsPage";

dotenv.config();

test("Adele cannot delete Chronos team", async ({ page }) => {
  const usermail = process.env.USERMAIL;
  const password = process.env.PASSWORD;
  const deleteText: string = "delete";
  const deleteTextUpper = deleteText.toUpperCase();
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

  await helpers.sidebarItem("Teams & Groups");

  await helpers.searchByValue("Chronos");

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

  const checkDetailsLink = await page.locator(
    'div.message a:has-text("Check details")'
  );
  await expect(checkDetailsLink).toBeVisible({ timeout: 10000 });
  checkDetailsLink.click();

  actionDetailsPage.getStatusColumnHeaderText();

  actionDetailsPage.getFirstRowStatusText();

  actionDetailsPage.verifyStatusColumnHeader();

  actionDetailsPage.verifyFirstRowStatus(
    "Cannot delete site because current user is not a site owner."
  );
});
