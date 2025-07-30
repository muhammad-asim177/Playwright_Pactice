import { test, expect } from '@playwright/test';
import { equal } from 'assert';




test('Simple Alert', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');

    page.on('dialog', dialog => {

        dialog.accept();


    })

    await page.locator('#alertButton').click()


});

test('Timer Alert', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');
    page.on('dialog', dialog => {

        dialog.dismiss();
    })

    await page.locator('#timerAlertButton').click();
    await page.waitForTimeout(6000);

})

test('Confirm Alert', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');

    page.on('dialog', dialog => {

        dialog.accept();

    })
    await page.locator('#confirmButton').click();
})

test('Prompt Alert', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts');

    page.on('dialog', dialog => {
        expect(dialog.type()).toEqual('prompt')
        dialog.accept("My name is Prompt alert");

    })
    await page.locator('#promtButton').click();
    await page.waitForTimeout(6000);
})

