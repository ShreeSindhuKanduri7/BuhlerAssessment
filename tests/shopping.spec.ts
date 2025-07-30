import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';

test.describe('Shopping Cart Functionality', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test.afterEach(async ({ page }) => {
        const cartPage = new CartPage(page);
        await cartPage.clearCart();
    });

    test('Add an item to the cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await page.screenshot({ path: 'screenshots/item-added.png' });
        await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    });

    test('Verify added item in cart', async ({ page }) => {
        const cartPage = new CartPage(page);
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await expect(cartPage.itemInCart('Sauce Labs Backpack')).toBeVisible();
        await page.screenshot({ path: 'screenshots/checkout-page.png' });
    });

    test('Remove an item from the cart', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.removeItemFromCart('Sauce Labs Backpack');
        await page.screenshot({ path: 'screenshots/item-removed.png' });
        await expect(cartPage.itemInCart('Sauce Labs Backpack')).toBeHidden();
    });

    test('Go to checkout', async ({ page }) => {
        const cartPage = new CartPage(page);
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.goToCart();
        await cartPage.goToCheckout();
        await page.screenshot({ path: 'screenshots/checkout-page.png' });
        await expect(page).toHaveURL(/.*checkout/);
    });
});