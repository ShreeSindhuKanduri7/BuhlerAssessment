import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Scenarios', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
    });

    test('Valid Login', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory/);
        await page.screenshot({ path: 'screenshots/login-success.png' });
    });

    test('Invalid Login', async ({ page }) => {
        await loginPage.login('standard_user', 'wrong_pass');
        await expect(await loginPage.getError()).toBeVisible();
        await expect(await loginPage.getError()).toHaveText('Epic sadface: Username and password do not match any user in this service');
        await page.screenshot({ path: 'screenshots/login-failure.png' });
    });
});
