import { modelCart } from '../dao/models/cart.model.js';

class CartManager {

    async createCart() {
        return modelCart.create({
            products: []
        });
    }

    async getProductsByCartId(id) {
        const cart = await modelCart.findById(id);
        return cart.products;
    }

    async addProductToCart(idCart, idProduct, quantity) {
        const products = await this.getProductsByCartId(idCart);
        const productExists = products.some(product => product.productId == idProduct);
        if (productExists) {
            throw new Error('Product already exists in cart');
        }
        const newProduct = {
            productId: idProduct,
            quantity: quantity
        }
        products.push(newProduct);
        await modelCart.findByIdAndUpdate(idCart, { products });
    }
}

export default CartManager;