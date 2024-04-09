import { Router } from "express";
import ProductManager from '../classes/ProductManager.js'
import CartManager from '../classes/CartManager.js'
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", async (req, res) => {
    res.render('index');
});

router.get("/chat", auth, async (req, res) => {
    res.render('chat');
});

router.get("/products", auth, async (req, res) => {
    const productManager = new ProductManager();
    const { docs } = await productManager.getProducts();
    res.render('products', { products: docs });
});

router.get("/carts/:cid", auth, async (req, res) => {
    const cartManager = new CartManager();
    const products = await cartManager.getProductsByCartId(req.params.cid);
    console.log(products);
    res.render('carts', { products: products });
});

router.get('/signup', (req, res) => {

    let { error, message } = req.query

    res.status(200).render('registro', { error, message })
})

router.get('/login', (req, res) => {

    res.status(200).render('login')
})

router.get('/401', (req, res) => {

    res.status(200).render('401')
})
export default router;