import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Login', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  ;

await page.getByPlaceholder('Username').pressSequentially('Admin');
await page.getByPlaceholder('Password').fill('admin123');
await page.getByRole('button', { name: 'Login' }).click();

await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

await page.getByRole('link', { name: 'Admin' }).click();
await page.locator('.oxd-table-card-cell-checkbox > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon').first().check();
await expect(page.getByRole('checkbox', { name: 'Select Row' }).first()).toBeChecked();
await page.waitForTimeout(5000);



});
