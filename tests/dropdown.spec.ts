import { test, expect } from '@playwright/test';

test('Simple dropdown', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/2018/09/automation-form.html');


    await page.getByLabel('Country:').selectOption('Japan')

    await page.waitForTimeout(10000)

});

test('Multi Select dropdown', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/2018/09/automation-form.html');


    await page.getByLabel('Colors:').selectOption(['Red', 'Blue', 'Yellow'])

    await page.waitForTimeout(10000)

});
