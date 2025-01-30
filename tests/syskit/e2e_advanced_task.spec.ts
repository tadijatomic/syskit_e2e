import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { LoginPage } from "../page_objects/LoginPage";
import { Sidebar } from "../page_objects/Sidebar";
import { Helpers } from "../helpers";

dotenv.config();

test("Adele cannot add user to group", async ({ page }) => {
  const usermail = process.env.USERMAIL;
  const password = process.env.PASSWORD;
  const loginPage = new LoginPage(page);
  const sidebarMenu = new Sidebar(page);
  const helpers = new Helpers(page);

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

  await sidebarMenu.sidebarItem("Users");

  helpers.searchByValue("Alverta Engel");
});
