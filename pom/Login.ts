import { Page } from '@playwright/test';

export class Login {
  private readonly page: Page;

  private readonly EmailAddress = "input[data-qa='login-email']";
  private readonly Password = "input[placeholder='Password']";
  private readonly btnLogin = "button[data-qa='login-button']";

  constructor(page: Page) {
    this.page = page;
  }

  // Providing email address
  async enterEmail(email: string): Promise<void> {
    await this.page.locator(this.EmailAddress).fill(email);
  }

  // Providing password
  async enterPassword(pass: string): Promise<void> {
    await this.page.locator(this.Password).fill(pass);
  }

  // Clicking login button
  async clickLogIn(): Promise<void> {
    await this.page.locator(this.btnLogin).click();
  }
}
