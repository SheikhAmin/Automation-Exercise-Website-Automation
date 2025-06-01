import { Page, expect } from '@playwright/test';

export class Subscription {
  private readonly page: Page;

  // Use readonly for selectors
  private readonly emailInput = '#susbscribe_email';
  private readonly subscribeButton = '#subscribe';

  constructor(page: Page) {
    this.page = page;
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async typeEmail(email: string): Promise<void> {
    await this.page.locator(this.emailInput).fill(email);
  }

  async clickSubscribe(): Promise<void> {
    await this.page.locator(this.subscribeButton).click();
    this.page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('You have been successfully subscribed!');
      await dialog.accept();
    });
  }


}
