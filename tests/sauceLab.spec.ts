// tests/example.spec.ts
import { test, expect } from '../fixtures/auth.fixtures';

test('user can see the inventory page', async ({ loginPage }) => {
    await expect(loginPage).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
    await expect(loginPage.locator('.inventory_item')).toHaveCount(6); // just an example
});

test('Add to cart item ', async ({ page, loginPage }) => {
    await expect(loginPage).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
    await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
    await page.getByRole('link', { name: '1' }).click();
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
});

test('Remove Item from Cart ', async ({ page, loginPage }) => {
    await expect(loginPage).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
    await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
    await page.getByRole('link', { name: '1' }).click();
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'REMOVE' })).toBeVisible();
    await page.getByRole('button', { name: 'REMOVE' }).click();
    await page.getByRole('link', { name: 'Continue Shopping' }).click();
    await expect(page.getByText('Products')).toBeVisible();
});

test('Checkout flow ', async ({ page, loginPage }) => {
    await expect(loginPage).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
    await page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ }).getByRole('button').click();
    await page.getByRole('link', { name: '1' }).click();
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
    
    await page.getByRole('link', { name: 'CHECKOUT' }).click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Asim');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Alam');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('5400');
    await page.getByRole('button', { name: 'CONTINUE' }).click();
    await expect(page.getByRole('link', { name: 'FINISH' })).toBeVisible();
    await page.getByRole('link', { name: 'FINISH' }).click();
    await expect(page.getByRole('heading')).toContainText('THANK YOU FOR YOUR ORDER');
    
});