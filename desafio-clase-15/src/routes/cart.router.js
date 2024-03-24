import { Router } from "express";
import CartManager from "../classes/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ "succes": true, cart });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const products = await cartManager.getProductsByCartId(req.params.cid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ "succes": true, products });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ "succes": true, cart });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
});

export default router;