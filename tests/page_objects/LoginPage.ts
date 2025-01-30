import { Page } from "@playwright/test";

export class LoginPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToPage() {
    await this.page.goto(
      "https://syskit-point-e2e-task-2025.syskit365demo.com/"
    );
  }

  async enterEmail(email: string) {
    await this.page.fill("#i0116", email);
  }

  async enterPassword(password: string) {
    await this.page.fill("#i0118", password);
  }

  async submitLogin() {
    await this.page.click("#idSIButton9");
  }

  static validateLoginData(usermail: string, password: string) {
    if (!usermail || !password) {
      throw new Error("Username or password is missing");
    }
  }
}
