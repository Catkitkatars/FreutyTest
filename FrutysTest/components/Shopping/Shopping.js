class Shopping {
    handleClear() {
        ROOT_SHOPPING.innerHTML = ''
    }
    handleClearLocalStorage() {
        localStorage.clear();
        shoppingPage.render();
        productsPage.render()
        headerPage.render(productStore.length);
    }
    
    handlePlusWeigth(elem, id) {
        localStorageUtil.updateProductsPlus(id)
        shoppingPage.render();
        productsPage.render();
    }

    handleMinusWeigth(elem, id) {
        localStorageUtil.updateProductsMinus(id)
        shoppingPage.render();
        productsPage.render();
        const productsStore = localStorageUtil.getProducts()
        headerPage.render(productsStore.length);
    }


    
    render() {

        const productsStore = localStorageUtil.getProducts()
        let htmlCatalog = ''
        let allPrice = 0;
        let allWeigth = 0;
        CATALOG.forEach( ({id, picture, name, price,}) => { 
            productsStore.forEach(item => {
                let elem = item.id
                if (elem === id) {
                    htmlCatalog += `
                        <div class="shopping-element">
                            <img class="shopping-element__img"  src="${picture}"/>
                            <div class="shopping-element__content_block">
                                <h5 class="shopping-element__name">${name}</h5>
                                <div class="shopping-element__price">$${price} <span>for 500g</span></div>
                                <div class="shopping-element__weigth">
                                    <i class="fas fa-minus" onclick="shoppingPage.handleMinusWeigth(this, ${id});"></i>
                                    ${item.weigth}g
                                    <i class="fas fa-plus" onclick="shoppingPage.handlePlusWeigth(this, ${id});"></i>
                                </div>
                            </div>
                        </div>
                    `;
                    allPrice += (item.weigth/500 * price)
                    allWeigth += item.weigth;
                }
            });  
        });

        const html = `
            <div class="shopping-container">
                <i class="fas fa-times" onclick="shoppingPage.handleClear()"></i>
                <div class="shopping-container__htmlCatalog" >
                <div class="shopping-container__scroll">
                    ${htmlCatalog}
                </div>
                <div class="shopping-container__all">
                    <div class="shopping-container__all_special">
                        <div class="shopping-container__all_price">All Price:</div>
                        <div class="shopping-container__allPrice">${allPrice.toFixed(2)}$</div>
                    </div>
                    <div class="shopping-container__all_special">
                        <div class="shopping-container__all_weigth">All Weigth: </div>
                        <div class="shopping-container__all_weigth_func">${allWeigth}g</div>
                    </div>
                </div>
                </div>
                <div class="shopping-container__form">
                <form action="" class="shopping-container__form_tagForm">
                    <label class="shopping-container__form_label" for='input_name'>Your name:</label>
                    <input class="shopping-container__form_input"  type="text" name="name" id='input_name'>
                    <label class="shopping-container__form_label" for='input_email'>Your email:</label>
                    <input class="shopping-container__form_input"  type="email" name="email" id='input_email'>
                    <label class="shopping-container__form_label" for='input_tel'>Your phone:</label>
                    <input class="shopping-container__form_input" type="tel" name="tel" id='input_tel'>
                    <label class="shopping-container__form_label" for='input_address'>Your address:</label>
                    <input class="shopping-container__form_input" type="text" name="address" id='input_address'>
                    <label class="shopping-container__form_label" for='input_date'>Delivery date:</label>
                    <input class="shopping-container__form_input" type="date" name="date" id='input_delivery'>
                    <div class="shopping-container__form_chekbox_block">
                        <input class="shopping-container__form_chekbox_input" id="rules_agree_modal" type="checkbox">
                        <label class="shopping-container__form_chekbox_label" for="rules_agree_modal">Agree to these&nbsp<a href="#">terms</a></label>
                    </div>
                </form>
                <div class="shopping-container__form_btn-block">
                        <button class="shopping-container__form_btn" onclick="shoppingPage.handleClearLocalStorage()">RESET</button>
                        <button class="shopping-container__form_btn">SEND</button>
                </div>
                </div>
            </div>
        `;
        ROOT_SHOPPING.innerHTML = html;
    }
}

const shoppingPage = new Shopping();


