// This is a TypeScript Playwright version of your Cypress test suite
// Folder structure assumption: PageObjects for each page object class

import { test, expect } from '@playwright/test';
import { SignUp } from '../pom/SignUp';
import { ContactForm } from '../pom/ContactForm';
import { Subscription } from '../pom/Subscription';
import { Cart } from '../pom/Cart';


test.describe('Test Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
//correct 
  test('Register User with existing email', async ({ page }) => {
    await page.locator('a[href="/login"]').click();
    const signUp = new SignUp(page);
    await signUp.setName('momin');
    await signUp.setEmailAddress('sheikhamin.c6s2@gmail.com');
    await signUp.clickSignUp();
    await expect(page.locator('.signup-form > form > p')).toBeVisible();
  });
//correct 
  test('Contact Form', async ({ page }) => {
    const contact = new ContactForm(page);
    await page.locator('a[href="/contact_us"]').click();
    await expect(page.locator('.contact-form > .title')).toBeVisible();
    await contact.typeName('amin');
    await contact.typeEmailAddress('momin@gmail.com');
    await contact.setSubject('how is life');
    await contact.typeMessage('milo');
    await contact.uploadFile('fixtures/file.jpg');
    await contact.clickSubmit();
    await expect(page.locator('.status.alert.alert-success')).toContainText('Success! Your details have been submitted successfully.');
    await page.locator('span:has-text("Home")').click();
  });
//correct 
//Test Case 7
  test('Verify Test Cases Page', async ({ page }) => {
    await page.locator('header li:nth-child(5) a').click();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });
//Test Case 8
//correct 
  test('Verify all products & product detail page', async ({ page }) => {
    const contact = new ContactForm(page);
    await page.locator("a[href='/products']").click();
    await page.waitForTimeout(3000);
    await contact.isProductlistVisible();
    await page.locator("a[href='/product_details/1']").click();
    await expect(page.locator('.product-information > h2')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.evaluate(() => window.scrollTo(0, 0));
    await contact.viewProduct();
   
  });
//correct 
//Test Case 9
  test('Search Product', async ({ page }) => {
    await page.locator("a[href='/products']").click();
    await page.locator('#search_product').fill('Blue Top');
    await page.locator('#submit_search').click();
    await expect(page.locator('.productinfo > p')).toContainText('Blue');
  });
//Test Case 10
//correct
  test('Verify Subscription in home page', async ({ page }) => {
    const subscription = new Subscription(page);
    await subscription.scrollToBottom;
    await subscription.typeEmail('sheikhamin.cs@gmail.com');
    await subscription.clickSubscribe();
  
  });
//Test Case 11
//correct
  test('Verify Subscription In Cart Page', async ({ page }) => {
    await page.locator("a[href='/'] >img").isVisible();
    await page.locator('a[href="/view_cart"]>i.fa.fa-shopping-cart').click();
    await page.evaluate(()=> window.scrollTo(0, document.body.scrollHeight));
    await page.evaluate(()=> window.scrollTo(0,0));
    await expect(page.locator("div.single-widget>h2")).toHaveText("SUBSCRIPTION"); //this line asserttion failed
    await page.locator('#susbscribe_email').fill('sheikhamin.qa@gmail.com');
    await page.locator('#subscribe').click();
  });
//Test Case 12
  test.only('add products in cart', async ({ page }) => {
    await page.locator("div.logo.pull-left>a[href='/']").isVisible();
    await page.locator('.shop-menu .nav :nth-child(2)').click();
    await page.locator("div.productinfo.text-center>img[src = '/get_product_picture/1']").hover();
    await page.locator("a[data-product-id = '1'].btn.btn-default.add-to-cart>i.fa.fa-shopping-cart").nth(1).waitFor({ state: 'visible' });
    await page.locator("a[data-product-id = '1'].btn.btn-default.add-to-cart>i.fa.fa-shopping-cart").nth(1).click();
    await page.locator('.modal-footer .btn').click();
    await page.waitForTimeout(1000);
    await page.locator("div.productinfo.text-center>img[src = '/get_product_picture/2']").hover();
    await page.locator("a[data-product-id = '2'].btn.btn-default.add-to-cart>i.fa.fa-shopping-cart").nth(1).waitFor({ state: 'visible' });
    await page.locator("a[data-product-id = '2'].btn.btn-default.add-to-cart>i.fa.fa-shopping-cart").nth(1).click();
    await page.locator("p.text-center>a[href='/view_cart']").click();
    await page.locator('.modal-footer .btn').click();
    await page.waitForTimeout(1000);
    await page.locator("ul.nav.nav-pills.nav-justified>li> a[href = '/product_details/2']").click();
  });
//Test Case 13
  test('Verify Product Quantity in Cart', async ({ page }) => {
    await page.locator(':nth-child(3) .choose .nav > li > a').click();
    await expect(page.locator('.product-information > h2')).toHaveText('Blue Top');
    await page.locator('#quantity').fill('4');
    await page.waitForTimeout(1000);
    await page.locator('.btn.btn-default.cart').click();
    await page.locator('.text-center > a').click();
    await expect(page.locator('.disabled')).toHaveText('4');
  });
//correct 
//Test Case 14
  test('Place order: Register while checkout', async ({ page }) => {
    await page.locator(':nth-child(6) .productinfo .btn').click();
    await page.locator('.modal-footer').click();
    await page.locator('.shop-menu .nav :nth-child(3) > a').click();
    await expect(page.locator('.active')).toContainText('Shopping Cart');
    await page.locator('.col-sm-6 > a').click();
    await page.locator('.modal-body :nth-child(2) > a').click();
  });
});
