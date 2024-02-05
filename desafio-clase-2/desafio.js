class ProductManager {


    constructor() {
        this.products = [];
        this.idManager = 1;
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id)
        if (!product) {
            console.log("The product doesn´t exist");
        }

        return product
    }

    addProduct({title, description, price, thumbnail, code, stock}) {
        const aux = this.products.find(product => product.title === title ||
            product.description === description ||
            product.thumbnail === thumbnail ||
            product.code === code)

        if (aux) {
            console.log(`The product ${title} is already created`);
            return
        }

        this.products.push({
            id: this.idManager,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })

        this.idManager++;
    }
}

const productManager = new ProductManager();

const product1 = {
    title: "producto prueba",
    description:"Este es un producto prueba",
    price: 200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock: 25
}

const product2 = {
    title: "producto Testeo",
    description:"Este es un producto Testeo",
    price: 200,
    thumbnail:"Sin imagen 2",
    code:"cdf456",
    stock: 25
}

console.log(productManager.getProducts());
productManager.addProduct(product1)
console.log(productManager.getProducts());
productManager.addProduct(product1)
console.log(productManager.getProducts());
productManager.addProduct(product2)
console.log(productManager.getProducts());
console.log(productManager.getProductById(2));