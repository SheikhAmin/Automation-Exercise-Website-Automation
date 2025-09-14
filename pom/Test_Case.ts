import { Page } from "@playwright/test";

export default class Test_Case {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


}