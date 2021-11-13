class Header {
    handleOpenShoppingPage() {
        shoppingPage.render();
    }

    render(count) {
        const html = `
            <div class="header-container"
                <div class="header-counter" onclick="headerPage.handleOpenShoppingPage();">
                    <i class="fas fa-shopping-cart">
                        <text class="header-counter__amount_products">${count}</text>
                    </i>
                <div>
            </div>
        `;
        ROOT_HEADER.innerHTML = html;
    }
}

const headerPage = new Header();

const productStore = localStorageUtil.getProducts()


headerPage.render(productStore.length);
