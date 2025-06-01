import { Page } from '@playwright/test';

export class SignUp {
  private readonly page: Page;

  private readonly Name = "input[placeholder='Name']";
  private readonly EmailAddress = '[data-qa="signup-email"]';
  private readonly btnSignUp = '[data-qa="signup-button"]';
  private readonly btnGender = "input#id_gender1";
  private readonly Password = '[data-qa="password"]';
  private readonly Day = '[data-qa="days"]';
  private readonly Month = '[data-qa="months"]';
  private readonly Year = '[data-qa="years"]';
  private readonly Newsletter = "#newsletter";
  private readonly Offer = "#optin";
  private readonly FirstName = '[data-qa="first_name"]';
  private readonly LastName = '[data-qa="last_name"]';
  private readonly Company = '[data-qa="company"]';
  private readonly Address = '[data-qa="address"]';
  private readonly Address2 = '[data-qa="address2"]';
  private readonly Country = '[data-qa="country"]';
  private readonly State = '[data-qa="state"]';
  private readonly City = '[data-qa="city"]';
  private readonly ZipCode = "#zipcode";
  private readonly MobileNum = "#mobile_number";
  private readonly btnCreateAccount = "button[data-qa='create-account']";
  private readonly btnContinue = '[data-qa="continue-button"]';

  constructor(page: Page) {
    this.page = page;
  }

  async setName(name: string): Promise<void> {
    await this.page.locator(this.Name).fill(name);
  }

  async setEmailAddress(email: string): Promise<void> {
    await this.page.locator(this.EmailAddress).fill(email);
  }

  async clickSignUp(): Promise<void> {
    await this.page.locator(this.btnSignUp).click();
  }

  async setGender(): Promise<void> {
    await this.page.locator(this.btnGender).check();
  }

  async setPassword(pass: string): Promise<void> {
    await this.page.locator(this.Password).fill(pass);
  }

  async setDay(day: string): Promise<void> {
    await this.page.locator(this.Day).selectOption(day);
  }

  async setMonth(month: string): Promise<void> {
    await this.page.locator(this.Month).selectOption(month);
  }

  async setYear(year: string): Promise<void> {
    await this.page.locator(this.Year).selectOption(year);
  }

  async clickNewsLetter(): Promise<void> {
    await this.page.locator(this.Newsletter).check();
  }

  async clickOffer(): Promise<void> {
    await this.page.locator(this.Offer).check();
  }

  async setFirstName(fname: string): Promise<void> {
    await this.page.locator(this.FirstName).fill(fname);
  }

  async setLastName(lname: string): Promise<void> {
    await this.page.locator(this.LastName).fill(lname);
  }

  async setCompany(company: string): Promise<void> {
    await this.page.locator(this.Company).fill(company);
  }

  async setAddress(address: string): Promise<void> {
    await this.page.locator(this.Address).fill(address);
  }

  async setAddress2(address2: string): Promise<void> {
    await this.page.locator(this.Address2).fill(address2);
  }

  async setCity(city: string): Promise<void> {
    await this.page.locator(this.City).fill(city);
  }

  async setState(state: string): Promise<void> {
    await this.page.locator(this.State).fill(state);
  }

  async setCountry(country: string): Promise<void> {
    await this.page.locator(this.Country).selectOption(country);
  }

  async setZipCode(zipcode: string): Promise<void> {
    await this.page.locator(this.ZipCode).fill(zipcode);
  }

  async setMobileNum(mobilenum: string): Promise<void> {
    await this.page.locator(this.MobileNum).fill(mobilenum);
  }

  async clickCreateAccount(): Promise<void> {
    await this.page.locator(this.btnCreateAccount).click();
  }

  async clickContinue(): Promise<void> {
    await this.page.locator(this.btnContinue).click();
  }
}
