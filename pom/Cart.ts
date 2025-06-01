import { Page } from '@playwright/test';

export class Cart {
  private readonly page: Page;

  private readonly btnProduct = "a[href='/product_details/1']";
  private readonly btnAddtoCart = "button[type='button']";
  private readonly btnContinue = ".modal-footer > .btn";
  private readonly btnCart = ".shop-menu > .nav > :nth-child(3) > a";
  private readonly btnProceed = ".col-sm-6 > .btn";
  private readonly OrderData = "textarea[name='message']";
  private readonly btnPlaceOrder = ".btn.btn-default.check_out";
  private readonly NameOnCard = '[data-qa="name-on-card"]';
  private readonly CardNumber = '[data-qa="card-number"]';
  private readonly CVC = "input[placeholder='ex. 311']";
  private readonly MM = "input[placeholder='MM']";
  private readonly YYYY = "input[placeholder='YYYY']";
  private readonly btnPay = "#submit";
  private readonly btnContinue1 = '[data-qa="continue-button"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickProduct(): Promise<void> {
    await this.page.locator(this.btnProduct).click();
  }

  async clickAddToCart(): Promise<void> {
    await this.page.locator(this.btnAddtoCart).click();
  }

  async clickContinue(): Promise<void> {
    await this.page.locator(this.btnContinue).click();
  }

  async clickCart(): Promise<void> {
    await this.page.locator(this.btnCart).click();
  }

  async clickProceed(): Promise<void> {
    await this.page.locator(this.btnProceed).click();
  }

  async setOrderData(data: string): Promise<void> {
    await this.page.locator(this.OrderData).fill(data);
  }

  async clickPlaceOrder(): Promise<void> {
    await this.page.locator(this.btnPlaceOrder).click();
  }

  async setNameOnCard(name: string): Promise<void> {
    await this.page.locator(this.NameOnCard).fill(name);
  }

  async setCardNum(cnum: string): Promise<void> {
    await this.page.locator(this.CardNumber).fill(cnum);
  }

  async setCVC(cvc: string): Promise<void> {
    await this.page.locator(this.CVC).fill(cvc);
  }

  async setMM(mm: string): Promise<void> {
    await this.page.locator(this.MM).fill(mm);
  }

  async setYYY(yyy: string): Promise<void> {
    await this.page.locator(this.YYYY).fill(yyy);
  }

  async clickPay(): Promise<void> {
    await this.page.locator(this.btnPay).click();
  }

  async clickContinue1(): Promise<void> {
    await this.page.locator(this.btnContinue1).click();
  }
}
