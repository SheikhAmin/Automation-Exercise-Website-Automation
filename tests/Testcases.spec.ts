// This is a TypeScript Playwright version of your Cypress test suite
// Folder structure assumption: PageObjects for each page object class

import { test, expect } from "@playwright/test";
import { SignUp } from "../pom/SignUp";
import { ContactForm } from "../pom/ContactForm";
import { Subscription } from "../pom/Subscription";
import { Cart } from "../pom/Cart";

test.describe("Test Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  //Test Case 5
  test("Register User with existing email", async ({ page }) => {
    await page.locator('a[href="/login"]').click();
    const signUp = new SignUp(page);
    await signUp.setName("momin");
    await signUp.setEmailAddress("sheikhamin.c6s2@gmail.com");
    await signUp.clickSignUp();
    await expect(page.locator(".signup-form > form > p")).toBeVisible();
  });
  //Test Case 6
  test("Contact Form", async ({ page }) => {
    const contact = new ContactForm(page);
    await page.locator('a[href="/contact_us"]').click();
    await expect(page.locator(".contact-form > .title")).toBeVisible();
    await contact.typeName("amin");
    await contact.typeEmailAddress("momin@gmail.com");
    await contact.setSubject("how is life");
    await contact.typeMessage("milo");
    await contact.uploadFile("fixtures/file.jpg");
    await contact.clickSubmit();
    await expect(page.locator(".status.alert.alert-success")).toContainText(
      "Success! Your details have been submitted successfully."
    );
    await page.locator('span:has-text("Home")').click();
  });
  //Test Case 7
  test("Verify Test Cases Page", async ({ page }) => {
    await page.locator("header li:nth-child(5) a").click();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });
  //Test Case 8
  test("Verify all products & product detail page", async ({ page }) => {
    const contact = new ContactForm(page);
    await page.locator("a[href='/products']").click();
    await page.waitForTimeout(3000);
    await contact.isProductlistVisible();
    await page.locator("a[href='/product_details/1']").click();
    await expect(page.locator(".product-information > h2")).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.evaluate(() => window.scrollTo(0, 0));
    await contact.viewProduct();
  });
  //Test Case 9
  test("Search Product", async ({ page }) => {
    await page.locator("a[href='/products']").click();
    await page.locator("#search_product").fill("Blue Top");
    await page.locator("#submit_search").click();
    await expect(page.locator(".productinfo > p")).toContainText("Blue");
  });
  //Test Case 10
  test("Verify Subscription in home page", async ({ page }) => {
    const subscription = new Subscription(page);
    await subscription.scrollToBottom;
    await subscription.typeEmail("sheikhamin.cs@gmail.com");
    await subscription.clickSubscribe();
  });
  //Test Case 11
  test("Verify Subscription In Cart Page", async ({ page }) => {
    await page.locator("a[href='/'] >img").isVisible();
    await page.locator('a[href="/view_cart"]>i.fa.fa-shopping-cart').click();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.locator("div.single-widget>h2")).toHaveText(
      "Subscription"
    ); //this line asserttion failed
    await page.locator("#susbscribe_email").fill("sheikhamin.qa@gmail.com");
    await page.locator("#subscribe").click();
  });
  //Test Case 12
  test("add products in cart", async ({ page }) => {
    await page.locator("div.logo.pull-left>a[href='/']").isVisible();
    await page.locator(".shop-menu .nav :nth-child(2)").click();
    await page
      .locator(
        "div.productinfo.text-center>img[src = '/get_product_picture/1']"
      )
      .hover();
    await page
      .locator(
        "a[data-product-id = '1'].btn.btn-default.add-to-cart>i.fa.fa-shopping-cart"
      )
      .nth(1)
      .waitFor({ state: "visible" });
    await page
      .locator(
        "a[data-product-id = '1'].btn.btn-default.add-to-cart>i.fa.fa-shopping-cart"
      )
      .nth(1)
      .click();
    await page.locator(".modal-footer .btn").click();
    await page.waitForTimeout(1000);
    await page
      .locator(
        "div.productinfo.text-center>img[src = '/get_product_picture/2']"
      )
      .hover();
    await page
      .locator(
        "a[data-product-id = '2'].btn.btn-default.add-to-cart>i.fa.fa-shopping-cart"
      )
      .nth(1)
      .waitFor({ state: "visible" });
    await page
      .locator(
        "a[data-product-id = '2'].btn.btn-default.add-to-cart>i.fa.fa-shopping-cart"
      )
      .nth(1)
      .click();
    await page.locator("p.text-center>a[href='/view_cart']").click();

    await page.waitForTimeout(1000);
    await expect(
      page.locator("td.cart_description>h4>a[href='/product_details/1']")
    ).toBeVisible();
    await expect(
      page.locator("td.cart_description>h4>a[href='/product_details/2']")
    ).toBeVisible();
    await expect(page.locator("td.cart_price>p").first()).toHaveText("Rs. 500");
    await expect(page.locator("td.cart_price>p").nth(1)).toHaveText("Rs. 400");
    await expect(
      page.locator("td.cart_quantity>button.disabled").first()
    ).toHaveCount(1);
    await expect(
      page.locator("td.cart_quantity>button.disabled").nth(1)
    ).toHaveCount(1);
    await expect(
      page.locator("td.cart_total>p.cart_total_price").first()
    ).toHaveText("Rs. 500");
    await expect(
      page.locator("td.cart_total>p.cart_total_price").nth(1)
    ).toHaveText("Rs. 400");
  });
  //Test Case 13
  test("Verify Product Quantity in Cart", async ({ page }) => {
    await page.locator("div.logo.pull-left>a[href='/']").isVisible();
    await page
      .locator("ul.nav.nav-pills.nav-justified>li>a[href='/product_details/1']")
      .click();
    await expect(page.url()).toContain("/product_details/1");
    await page.locator("#quantity").fill("4");
    await page.locator("button.btn.btn-default.cart").click();
    await page.locator("p.text-center>a[href='/view_cart']").click();
    await expect(
      page.locator("td.cart_quantity>button.disabled").first()
    ).toHaveCount(1);
  });
  //Test Case 14
  test.only("Place order: Register while checkout", async ({ page }) => {
    await page.locator(":nth-child(6) .productinfo .btn").click();
    await page.locator(".modal-footer").click();
    await page.locator(".shop-menu .nav :nth-child(3) > a").click();
    await expect(page.locator(".active")).toContainText("Shopping Cart");
    await page.locator(".col-sm-6 > a").click();
    await page.locator(".modal-body :nth-child(2) > a").click();
  });
  //Test Case 15
  test("Place Order: Register while Checkout", async ({ page }) => {
    const cart = new Cart(page);
    await page.locator(".shop-menu .nav :nth-child(3) > a").click();
    await expect(page.locator(".active")).toContainText("Shopping Cart");
    //await cart.clickProceedToCheckout();
    //await cart.setEmail("");
  });
});
