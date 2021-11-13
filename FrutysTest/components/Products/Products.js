class Products {
    constructor() {
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'Buy';
        this.labelAddWeigth = '+500g' 
    }
    handleSetLocationStorage(element, id, weight) {

        const documentOpen = document.querySelector('.shopping-container');

        const { pushProduct, products } = localStorageUtil.putProducts(id, weight);

        if (pushProduct) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelAddWeigth;
        } 
        
        headerPage.render(products.length);
        productsPage.render()
        if(documentOpen !== null) {
            shoppingPage.render()
        }
    }

    render() {
        const productsStore = localStorageUtil.getProducts()
        let htmlCatalog = ''

        CATALOG.forEach( ({id, picture, name, weigth, price, bgColor}) => {
            let activeClass = '';
            let activeText = '';

            let productsStoreMapId = productsStore.map(item => item.id)
            
            if(productsStoreMapId.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeText = this.labelAddWeigth;
                activeClass = ' ' + this.classNameActive;
            }

            htmlCatalog += `
                <li class="products-element">
                    <div class="products-element__img-container" style="background-color: ${bgColor}">
                        <img class="products-element__img"  src="${picture}"/>
                    </div>
                    <div class="products-element__name-price-container">
                        <span class="products-element__name">${name}</span>
                        <span class="products-element__price">$${price}</span>
                    </div>
                    <div class="products-element__weigth-btn-container">
                        <span class="products-element__weigth">${weigth}g</span>
                        <button class="products-element__btn ${activeClass}" onclick="productsPage.handleSetLocationStorage(this, ${id}, ${weigth}); ">${activeText}</button>
                    </div>
                </li>
            `;
        });

        const html = `
            <h2 class="products-container__name">Feautured Product</h2>
            <ul class="products-container">
                
                ${htmlCatalog}
            </ul>
        `;
        ROOT_PRODUCTS.innerHTML = html;
    }
}

const productsPage = new Products();

productsPage.render()




