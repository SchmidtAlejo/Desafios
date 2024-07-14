import { CustomRouter } from './routes.js'
import ProductsController from "../controllers/products.controller.js"
import { verificatePremiumUser } from '../middlewares/auth.js';
import { uploadMulter } from '../config/multer.config.js';

export default class ProductRouter extends CustomRouter {
  init() {
    this.get("/", ['public'], ProductsController.getProducts);
    this.get("/mockingproducts", ['public'], ProductsController.generateProducts)
    this.post("/test", ['admin'], ProductsController.test)
    this.post("/", ['admin', 'premium'], ProductsController.addProduct);
    this.put("/:pid", ['admin', 'premium'], verificatePremiumUser, ProductsController.updateProduct)
    this.delete("/:pid", ['admin', 'premium'], verificatePremiumUser, ProductsController.deleteProduct)
    this.get("/:id", ['authenticated'], ProductsController.getProductById);
    this.post("/:pid/image", ["admin", "premium"], verificatePremiumUser, uploadMulter.single('productImage'), ProductsController.uploadImage)
  }
}
