// fixtures/auth.fixtures.ts
import { test as base, expect as baseExpect, Page } from '@playwright/test';

// Extend base test with custom fixtures
export const test = base.extend<{
  loginPage: Page;
  logoutAfterTest: void;
}>({
  // Login fixture
  loginPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com/v1/index.html');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'LOGIN' }).click();

    await page.waitForURL('https://www.saucedemo.com/v1/inventory.html');
    await use(page);
  },

  // Logout fixture
  logoutAfterTest: async ({ page }, use) => {
    await use(); // run the test
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.waitForURL('https://www.saucedemo.com/v1/index.html');
  },
});

// Export expect to match the custom test
export const expect = baseExpect;
