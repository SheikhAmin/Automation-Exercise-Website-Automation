import { test, expect, Page } from "@playwright/test";
import { SignUp } from "../pom/SignUp";
import { Login } from "../pom/Login";
import { Cart } from "../pom/Cart";
import { describe } from "node:test";
import { Common } from "../common/Common";
import path from "path";
import fs from "fs";


test.describe("Registration and Login Tests", () => {
// This is a test suite for user registration and login functionality on the Automation Exercise website.
    let email: string;
    let password: string;
// Use static email generator function
test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto('/');
  await page.locator('a[href="/login"]').click();
});

// Test Case 1: Register User
test("Register User", async ({ page }: { page: Page }) => {
  const obj = new SignUp(page);
  email = await Common.emailGenerator();
  password = await Common.passwordGenerator();
  await obj.setName("Sheikh Amin");
  await obj.setEmailAddress(email);
  await obj.clickSignUp();
  await obj.setGender();
  await obj.setPassword(password);
  await obj.setDay("7");
  await obj.setMonth("June");
  await obj.setYear("1999");
  await obj.clickNewsLetter();
  await obj.clickOffer();
  await obj.setFirstName("Sheikh");
  await obj.setLastName("Amin");
  await obj.setCompany("Dhaka Bank");
  await obj.setAddress("244 East Nakhalpara Tejgaon, Dhaka-1215");
  await obj.setAddress2("244 East Nakhalpara Tejgaon, Dhaka-1215");
  await obj.setCountry("Canada");
  await obj.setCity("Dhaka");
  await obj.setState("Dhaka");
  await obj.setZipCode("1215");
  await obj.setMobileNum("01521255651");
  await obj.clickCreateAccount();

  const credentials = {email, password};
  const fixturesPath = path.join('fixtures', 'credentials.json');
  fs.writeFileSync(fixturesPath, JSON.stringify(credentials, null, 2));
});

// Log In + Cart Flow Test
test("Log In", async ({ page }: { page: Page }) => {
  const fixturesPath= path.join('fixtures', 'credentials.json');
  if (!fs.existsSync(fixturesPath)) {
    throw new Error("Credentials file not found. Please run the Sign Up test first.");
  }

  const credentials = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8'));
  email = credentials.email;
  password = credentials.password;

  const login = new Login(page);
  await login.enterEmail(email);
  await login.enterPassword(password);
  await login.clickLogIn();

  const loggedInText = await page.locator(":nth-child(10) > a");
  await expect(loggedInText).toHaveText("Logged in as Sheikh Amin");

  const cart = new Cart(page);
  await cart.clickProduct();
  await cart.clickAddToCart();
  await cart.clickContinue();
  await cart.clickCart();
  await cart.clickProceed();
  await cart.setOrderData("Order will be received by my a person named Momin.");
  await cart.clickPlaceOrder();
  await cart.setNameOnCard("Tazrin Tuly");
  await cart.setCardNum("611546");
  await cart.setCVC("611");
  await cart.setMM("July");
  await cart.setYYY("2025");
  await cart.clickPay();

  // Handle order confirmation alert
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Your order has been placed sucessfully!");
    await dialog.accept();
  });

  // Verify order confirmation message
  const confirmationText = await page.locator(".col-sm-9 > p");
  await expect(confirmationText).toHaveText("Congratulations! Your order has been confirmed!");

  await cart.clickContinue1();
});

});
