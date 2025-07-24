import { test, expect } from '@playwright/test';
test('Login with valid Credentials', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.getByPlaceholder('Enter Name').fill('Test User');
    await page.getByPlaceholder('Enter EMail').fill('test.user@gmail.com');

    await page.getByPlaceholder('phone').fill('03364481938');
    await page.locator('#textarea').pressSequentially("Thi is new paragarph for testing ")

    await page.check('input[type="radio"][value="male"]');


    const checkboxes = ['Sunday', 'Tuesday', 'Friday'];

    for (const label of checkboxes) {
        await page.getByLabel(label).check();
    }

    await page.waitForTimeout(2000);
    await page.selectOption('#country', { label: 'India' });

    
     await page.selectOption('#colors', { label: 'Green' });

      await page.waitForTimeout(2000);

     await page.selectOption('#animals', { label: 'Cheetah' });
     await page.waitForTimeout(3000);

});
