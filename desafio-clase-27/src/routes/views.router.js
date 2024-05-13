import { Router } from "express";
import { passportCall } from "../utils.js";
import ViewsController from "../controllers/views.controller.js";

const router = Router();

// router.get("/", async (req, res) => {
//     res.render('index');
// });

// router.get("/chat", passportCall('jwt', { session: false }), async (req, res) => {
//     res.render('chat');
// });

// router.get("/products", passportCall('jwt', { session: false }), async (req, res) => {
//     const productManager = new ProductManager();
//     const { docs } = await productManager.getProducts();
//     res.render('products', { products: docs });
// });

// router.get("/carts/:cid", passportCall('jwt', { session: false }), async (req, res) => {
//     const cartManager = new CartManager();
//     const products = await cartManager.getProductsByCartId(req.params.cid);
//     console.log(products);
//     res.render('carts', { products: products });
// });

// router.get('/signup', (req, res) => {

//     let { error, message } = req.query

//     res.status(200).render('signup', { error, message })
// })

// router.get('/login', (req, res) => {

//     res.status(200).render('login')
// })

// router.get('/401', (req, res) => {

//     res.status(200).render('401')
// })

router.get("/", ViewsController.index);
router.get("/chat", ViewsController.chat);
router.get("/products", ViewsController.products);
router.get("/carts/:cid", ViewsController.carts);
router.get('/signup', ViewsController.signup);
router.get('/login', ViewsController.login);
router.get('/401', ViewsController.error401);

export default router;