import { type Page, type Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    itemInCart(itemName: string): Locator {
        return this.page.locator('.inventory_item_name', { hasText: itemName });
    }

    removeItemFromCart(itemName: string) {
        return this.page.locator(`//div[text()="${itemName}"]/ancestor::div[@class="cart_item"]//button[text()="Remove"]`).click();
    }

    async clearCart() {
        const items = this.page.locator('.cart_item');
        const count = await items.count();
        for (let i = 0; i < count; i++) {
            await items.nth(i).locator('button').click();
        }
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}