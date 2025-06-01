import { Page, expect } from '@playwright/test';

export class ContactForm {
  private readonly page: Page;

  // Define locators as readonly to prevent accidental changes
  private readonly nameInput = "[data-qa='name']";
  private readonly emailInput = "[data-qa='email']";
  private readonly subjectInput = '[data-qa="subject"]';
  private readonly messageInput = '#message[data-qa="message"]';
  private readonly fileInput = ':nth-child(6) > input.form-control';
  private readonly submitButton = '[data-qa="submit-button"]';
  private readonly productList = 'div.features_items > div';
  private readonly firstProduct = "a>i.fa.fa-plus-square";
  private readonly productName = '.product-information > h2';
  private readonly productCategory = '.product-information >:nth-child(3)';
  private readonly productPrice = '.product-information > span';
  private readonly productAvailability = '.product-information > p:nth-child(6)';
  private readonly productCondition = '.product-information > p:nth-child(7)';
  private readonly productBrand = '.product-information > p:nth-child(8)';

  constructor(page: Page) {
    this.page = page;
  }

  async typeName(name: string): Promise<void> {
    await this.page.locator(this.nameInput).fill(name);
  }

  async typeEmailAddress(email: string): Promise<void> {
    await this.page.locator(this.emailInput).fill(email);
  }

  async setSubject(subject: string): Promise<void> {
    await this.page.locator(this.subjectInput).fill(subject);
  }

  async typeMessage(msg: string): Promise<void> {
    await this.page.locator(this.messageInput).fill(msg);
  }

  async uploadFile(filePath: string): Promise<void> {
    // Make sure the path is correct relative to your project root
    if (!filePath) {
      throw new Error("File path must be provided for upload.");
    }

    await this.page.locator(this.fileInput).setInputFiles(filePath);
    await this.page.waitForTimeout(5000);
  }

  async clickSubmit(): Promise<void> {
    this.page.on('dialog', async dialog => {
      expect(dialog.type()).toContain('confirm')
      expect(dialog.message()).toContain("Press OK to proceed!");
      await dialog.accept();
    });
    await this.page.locator(this.submitButton).click();
  }

  async isProductlistVisible(): Promise<void> {
    let flag = false;
    const productList = this.page.locator(this.productList);
    for(const [index, element] of (await productList.all()).entries()) {
      const visible = await element.isVisible();
      if(visible) flag = true;
    }
    if(!flag){
      throw new Error("Products are visible in the product list.");
    }
    await this.page.waitForTimeout(3000);
  }

  async viewProduct(): Promise<void> {
    await this.page.locator(this.productName).isVisible();
    await this.page.locator(this.productCategory).isVisible();
    await this.page.locator(this.productPrice).isVisible();
    await this.page.locator(this.productAvailability).isVisible();
    await this.page.locator(this.productCondition).isVisible();
    await this.page.locator(this.productBrand).isVisible();
  }
}
