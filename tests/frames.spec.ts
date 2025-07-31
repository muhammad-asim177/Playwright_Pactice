import { test, expect } from '@playwright/test';

test('Frame with frame method', async ({ page }) => {

    await page.goto('https://leetcode.com/');

    const frameLocator = page.frame({ url: 'https://leetcode.com/playground/UpwhGDg6/shared' })
    frameLocator?.getByRole('button', { name: 'Java' }).click();
    frameLocator?.getByRole('button', { name: 'Run' }).click();
    frameLocator?.locator('.btn.btn-default.clear-btn').click();
    await page.waitForTimeout(6000);
});