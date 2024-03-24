import { modelProduct } from '../dao/models/product.model.js';

class ProductManager {

    async getProducts() {
        return await modelProduct.find();
    }

    async getProductById(id) {
        return await modelProduct.findById(id);
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        const product = {
            status: true,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        return await modelProduct.create(product);
    }

    async updateProduct(id, changes) {
        return await modelProduct.updateOne({ _id: id }, changes);
    }

    async deleteProduct(id) {
        return await modelProduct.deleteOne({ _id: id });
    }

    async test() {

        const product1 = {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "",
            code: "abc123",
            status: true,
            stock: 25
        }

        const product2 = {
            title: "producto Testeo",
            description: "Este es un producto Testeo",
            price: 200,
            thumbnail: "",
            code: "cdf456",
            status: true,
            stock: 25
        }

        const product3 = {
            title: "producto Testeo 3",
            description: "Este es un producto Testeo 3",
            price: 200,
            thumbnail: "",
            code: "cdf45a6",
            status: true,
            stock: 25
        }

        const product4 = {
            title: "producto Testeo 4",
            description: "Este es un producto Testeo 4",
            price: 200,
            thumbnail: "",
            code: "cdfdas456",
            status: true,
            stock: 25
        }

        const product5 = {
            title: "producto Testeo 5",
            description: "Este es un producto Teste 5o",
            price: 200,
            thumbnail: "",
            code: "cdf56",
            status: true,
            stock: 25
        }

        const product6 = {
            title: "producto Testeo 6",
            description: "Este es un producto Testeo 6",
            price: 200,
            thumbnail: "",
            code: "cddasda56",
            status: true,
            stock: 25
        }

        return await modelProduct.insertMany([product1, product2, product3, product4, product5, product6]);
    }
}

export default ProductManager;