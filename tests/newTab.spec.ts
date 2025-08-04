import { test, expect } from '@playwright/test';

test('New Tab or Page Practice', async ({ page, context }) => {

    await page.goto('https://testautomationpractice.blogspot.com/2018/09/automation-form.html');

    const pagePromiss = context.waitForEvent('page');

    await page.getByRole('button', { name: 'New Tab' }).click();

    const newPage = await pagePromiss
    await newPage.waitForLoadState();
    await expect(newPage).toHaveTitle('SDET-QA Blog');
    const x= newPage.locator('#PageList1').getByRole('link', { name: 'SDET Essentials' })
    await x.click();
});