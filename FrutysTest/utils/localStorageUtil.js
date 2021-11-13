
class LocalStorageUtil {
    constructor() {
        this.keyName = 'products';
    }

    getProducts() {
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null) {
            return JSON.parse(productsLocalStorage)
        } else {
            return [];
        }
    };

    putProducts(id, weigth) {
        let products = this.getProducts();
        let pushProduct = false;
        let find = products.map(item => item.id).find(item => item == id)
        if (find === undefined) {
            products.push({id,weigth}) // Добавить такой элемент
            pushProduct = true // Изменить на true
        } else {
            products.forEach(item => {
                if (item.id === find) {
                    item.weigth += 500
                }
            })
        }

       localStorage.setItem(this.keyName, JSON.stringify(products)); // Локал стораж добавить элемент с ключом продуктс и  эти продукты превратить в строку и добавить как значени элемента продуктс

       return {
           pushProduct: pushProduct,
           products: products
       }
    };

    updateProductsPlus(id) {
        let products = this.getProducts();
        let find = products.map(item => item.id).find(item => item == id);
        products.forEach(item => {
            if (item.id === find) {
                item.weigth += 500
            }
        })
        

        localStorage.setItem(this.keyName, JSON.stringify(products));
    };

    updateProductsMinus(id) {
        let products = this.getProducts();
        let find = products.map(item => item.id).find(item => item == id);
        products.forEach((item, index) => {
            if (item.id === find) {
                if (item.weigth === 500) {
                    products.splice(index, 1)
                }
                item.weigth -= 500
            }
        })

        localStorage.setItem(this.keyName, JSON.stringify(products));
    };

}


const localStorageUtil = new LocalStorageUtil();

