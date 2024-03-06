import fs from 'fs';

// const a = fs.readFileSync("archivos.json", { encoding: "utf-8" });
// console.log(JSON.parse(a));

export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    getProducts(limit) {
        try {
            return JSON.parse(fs.readFileSync("archivos.json", { encoding: "utf-8" }));
        } catch (error) {
            fs.writeFileSync(this.path, JSON.stringify([], null, "\t"));
            return [];
        }
    }

    getProductById(id) {
        try {
            const products = this.getProducts();
            const product = products.find(product => product.id === Number.parseInt(id));
            if (!product) {
                console.log("The product doesn´t exist");
            }
            return product
        } catch (error) {
            console.error(error);
        }
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

        const body = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        products.push(body);

        this.writeFile(products);

        return body;
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