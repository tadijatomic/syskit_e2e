import { Page } from "@playwright/test";

export class Sidebar {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async sidebarItem(item: string) {
    await this.page.click(`span.navigation__item-name:has-text("${item}")`);
  }
}
