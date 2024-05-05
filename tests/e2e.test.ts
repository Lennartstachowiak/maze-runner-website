import puppeteer, { Browser, Page } from "puppeteer";

describe("End to end test", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("contains the login button text", async () => {
    // LOAD PAGE
    await page.goto("http://localhost:3000");
    await page.waitForSelector("#login-button");
    const textLoginButton = await page.$eval(
      "#login-button",
      (e: Element) => e.textContent
    );
    expect(textLoginButton).toContain("Login / Register");
    // CLICK LOGIN
    await page.evaluate(() => {
      document.getElementById("login-button")?.click();
    });
    // CHECK IF DIALOG OPENS
    const dialogSelector = "#dialog-register";
    await page.waitForSelector(dialogSelector);
    // SWITCH TO REGISTER
    const switchSelector = "#login-register-switch";
    await page.waitForSelector(switchSelector);
    await page.click(switchSelector);
    await page.waitForSelector("#email-label");
    const textEmailButtonText = await page.$eval(
      "#email-label",
      (e: Element) => e.textContent
    );
    expect(textEmailButtonText).toContain("E-Mail");
    await page.waitForSelector("#password-label");
    const textPasswordButtonText = await page.$eval(
      "#password-label",
      (e: Element) => e.textContent
    );
    expect(textPasswordButtonText).toContain("Password");
    await page.waitForSelector("#repeatPassword-label");
    const textPasswordRepeatButtonText = await page.$eval(
      "#repeatPassword-label",
      (e: Element) => e.textContent
    );
    expect(textPasswordRepeatButtonText).toContain("Repeat password");
    // CHECK ERROR CHECKS
    await page.type("#email", "Hello, World!");
    const dialogRegisterEmailText = await page.$eval(
      "#dialog-register",
      (e: Element) => e.textContent
    );
    expect(dialogRegisterEmailText).toContain(
      "Please enter a valid email address in the format example@example.com."
    );
    // REGISTER TEST USER
    await page.evaluate(() => {
      const emailInput = document.getElementById("email") as HTMLInputElement;
      if (emailInput) {
        emailInput.value = "";
      }
    });
    await page.type("#email", "test@email.com");
    await page.type("#password", "p@ssw0rdt3st");
    await page.type("#repeatPassword", "p@ssw0rdt3st");
    await page.click("#handle-register-button");
    await page.waitForSelector("#user-error");
    const dialogRegisterUserText = await page.$eval(
      "#user-error",
      (e: Element) => e.textContent
    );
    expect(dialogRegisterUserText).toContain("User already exist!");

    // LOGIN TEST USER
    await page.evaluate(() => {
      document.getElementById("login-register-switch")?.click();
    });
    await page.waitForSelector("#handle-login-button");
    await page.evaluate(() => {
      document.getElementById("handle-login-button")?.click();
    });
    await page.waitForSelector("#user-avatar-button");
    const userAvatarButton = await page.$eval(
      "#user-avatar-button",
      (e: Element) => e.textContent
    );

    // CHECK LOGIN WORKS
    expect(userAvatarButton).toContain("T");
    await page.evaluate(() => {
      document.getElementById("user-avatar-button")?.click();
    });
    await page.waitForSelector("#user-status");
    const userStatusText = await page.$eval(
      "#user-status",
      (e: Element) => e.textContent
    );
    expect(userStatusText).toContain("test@email.com");

    // LOGOUT
    await page.evaluate(() => {
      document.getElementById("logout-button")?.click();
    });

    // CHECK IF LOGOUT
    await page.waitForSelector("#login-button");
    const textLoginAfterLogoutButton = await page.$eval(
      "#login-button",
      (e: Element) => e.textContent
    );
    expect(textLoginAfterLogoutButton).toContain("Login / Register");
  });

  afterAll(() => browser.close());
});
