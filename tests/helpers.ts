import { Page } from "@playwright/test";

export class Helpers {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchByValue(value: string) {
    await this.page.fill('[aria-label="Search in the data grid"]', value);
  }
}
