import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const products = await productManager.getProducts();
        if (req.query.limit === undefined) {
            return res.status(200).json({ success: true, products });
        }
        const result = products.slice(0, req.query.limit);
        return res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        const product = await productManager.getProductById(req.params.id)
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, "error": error.message });
    }
});

router.post("/test", async (req, res) => {
    try {
        await productManager.test();
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ "succes": true });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
})

router.post("/", async (req, res) => {
    try {
        const product = await productManager.addProduct(req.body);
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const product = await productManager.updateProduct(req.params.pid, req.body)
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ succes: true, product });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        await productManager.deleteProduct(req.params.pid)
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ succes: true });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
})

export default router;