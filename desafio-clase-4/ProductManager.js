const fs = require('fs');

// const a = fs.readFileSync("archivos.json", { encoding: "utf-8" });
// console.log(JSON.parse(a));

class ProductManager {


    constructor() {
        this.idManager = 1;
        this.path = "archivos.json"
    }

    getProducts() {
        try {
            return JSON.parse(fs.readFileSync("archivos.json", { encoding: "utf-8" }))
        } catch (error) {
            fs.writeFileSync(this.path, JSON.stringify([], null, "\t"));
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find(product => product.id === id)
        if (!product) {
            console.log("The product doesn´t exist");
        }

        return product
    }

    writeFile(products) {
        {
            fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));
        }
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {

        const products = this.getProducts();

        const aux = products.find(product => product.title === title ||
            product.description === description ||
            product.thumbnail === thumbnail ||
            product.code === code)

        if (aux) {
            console.log(`The product ${title} is already created`);
            return
        }

        products.push({
            id: this.idManager,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });

        this.writeFile(products);

        this.idManager++;
    }

    getIndex(id) {
        const products = this.getProducts();
        const product = this.getProductById(id);
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === product.id) {
                index = i;
                break;
            }
        }

        return { products, product, index };
    }

    updateProduct(id, changes) {
        const { products, product, index } = this.getIndex(id);
        products[index] = { ...product, ...changes };
        this.writeFile(products);
    }

    deleteProduct(id) {
        const { products, product, index } = this.getIndex(id);
        products.splice(index, 1);
        this.writeFile(products);
    }
}

const productManager = new ProductManager();

const product1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}

const product2 = {
    title: "producto Testeo",
    description: "Este es un producto Testeo",
    price: 200,
    thumbnail: "Sin imagen 2",
    code: "cdf456",
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
productManager.updateProduct(2, { description: "descripcion cambiada" });
productManager.deleteProduct(1);