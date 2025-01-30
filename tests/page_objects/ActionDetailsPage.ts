import { Page, expect } from "@playwright/test";

export class ActionDetailsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getStatusColumnHeaderText(): Promise<string | null> {
    return await this.page
      .locator(".table-header .table-column")
      .nth(1)
      .textContent();
  }

  async getFirstRowStatusText(): Promise<string | null> {
    return await this.page
      .locator(".table-body .table-row")
      .nth(0)
      .locator(".table-column")
      .nth(1)
      .textContent();
  }

  async verifyStatusColumnHeader() {
    const statusColumnText = await this.getStatusColumnHeaderText();
    expect(statusColumnText).toContain("Status");
  }

  async verifyFirstRowStatus(expectedStatus: string) {
    const firstRowText = await this.getFirstRowStatusText();
    expect(firstRowText).toContain(expectedStatus);
  }
}
