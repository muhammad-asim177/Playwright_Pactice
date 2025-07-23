import { test, expect } from '@playwright/test';
test('Login with valid Credentials', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.locator('button[type="submit"]').click();
});

test('Login with valid user name and invalid password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin1236');
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(5000);
  const errorMessage = page.getByText('Invalid credentials');
  await expect(errorMessage).toBeVisible();

});

test('Login with Invalid user name and valid password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Adminaa');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(5000);
  const errorMessage = page.getByText('Invalid credentials');
  await expect(errorMessage).toBeVisible();

});

test('Login with Empty user name and password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('');
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(5000);
  const errorMessage1 = page.getByText('Required').first()
  await expect(errorMessage1).toBeVisible();

  const errorMessage2 = page.getByText('Required').nth(1)
  await expect(errorMessage2).toBeVisible();

});

test('Forget password', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByText('Forgot your password?').click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin.a665@gmail.com');
  await page.getByRole('button', { name: 'Reset Password' }).click()
  await page.waitForTimeout(5000);


  const sucessMessage = page.getByRole('heading', { name: 'Reset Password link sent' })
  await expect(sucessMessage).toBeVisible();
  await page.waitForTimeout(3000);
});