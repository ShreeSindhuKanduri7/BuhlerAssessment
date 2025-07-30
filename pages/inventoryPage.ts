import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;
    readonly productSortContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.productSortContainer = page.locator('[data-test="product_sort_container"]');
    }

    private itemAddToCartButton(itemName: string): Locator {
        return this.page.locator(`//div[text()="${itemName}"]/ancestor::div[@class="inventory_item"]//button`);
    }

    async addItemToCart(itemName: string) {
        await this.itemAddToCartButton(itemName).click();
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }
}
