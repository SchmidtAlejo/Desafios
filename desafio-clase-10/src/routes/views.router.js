import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();

const productManager = new ProductManager("archivos.json");

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

const product3 = {
    title: "producto Testeo 3",
    description: "Este es un producto Testeo 3",
    price: 200,
    thumbnail: "Sin imagen 3",
    code: "cdf45a6",
    stock: 25
}

const product4 = {
    title: "producto Testeo 4",
    description: "Este es un producto Testeo 4",
    price: 200,
    thumbnail: "Sin imagen 4",
    code: "cdfdas456",
    stock: 25
}

const product5 = {
    title: "producto Testeo 5",
    description: "Este es un producto Teste 5o",
    price: 200,
    thumbnail: "Sin imagen 5",
    code: "cdf56",
    stock: 25
}

const product6 = {
    title: "producto Testeo 6",
    description: "Este es un producto Testeo 6",
    price: 200,
    thumbnail: "Sin imagen 6",
    code: "cddasda56",
    stock: 25
}

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);
productManager.addProduct(product6);

router.get("/", (req, res) => {
    const products = productManager.getProducts();
    if (req.query.limit === undefined) {
        res.render('home', { products });
    }
    res.render('home', { products: products.slice(0, req.query.limit) });
});

router.get("/realtimeproducts", (req, res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products });
});

router.get("/:id", (req, res) => {
    res.send(productManager.getProductById(req.params.id))
});

router.post("/", (req, res) => {
    try {
        const product = productManager.addProduct(req.body)
        res.status(201).json({ succes: true, product: product });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
})

router.delete("/:pid", (req, res) => {
    try {
        productManager.deleteProduct(req.params.pid)
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ succes: true });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
})

export default router;