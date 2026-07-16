import { test, expect } from '@playwright/test';

const baseURL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
  await page.waitForLoadState('networkidle');
});

test('TC_001 - Login with valid credentials', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);
  //await expect(page.getByText('Dashboard')).toBeVisible();
});

test('TC_002 - Login with invalid password', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('wrongPassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test('TC_003 - Login with invalid username', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('WrongUser');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();
});

test('TC_004 - Login with empty credentials', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Required').first()).toBeVisible();
});

test('TC_005 - Verify Forgot Password link', async ({ page }) => {
  await page.getByText('Forgot your password?').click();

  await expect(page).toHaveURL(/requestPasswordResetCode/);
 
 // await page.waitForTimeout(5000); // Wait for 3 seconds
   //await expect(page.getByText('Reset Password')).toBeVisible();
});