import ProductService from "../services/products.service.js";

class ProductsController {
  static getProducts = async (req, res) => {
    try {
      const products = await ProductService.getProducts(
        req.query.limit,
        req.query.page,
        req.query.category,
        req.query.sort
      );
      res.success(products);
    } catch (error) {
      res.error500(error.message);
    }
  };

  static getProductById = async (req, res) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.success(product);
    } catch (error) {
      res.badRequest(error.message);
    }
  };

  static test = async (req, res) => {
    try {
      await ProductService.test();
      res.success({ "success": true });
    } catch (error) {
      res.badRequest(error.message);
    }
  };

  static addProduct = async (req, res) => {
    try {
      const product = await ProductService.addProduct(req.body);
      res.success(product);
    } catch (error) {
      res.badRequest(error.message);
    }
  };

  static updateProduct = async (req, res) => {
    try {
      const product = await ProductService.updateProduct(req.params.pid, req.body);
      res.success(product);
    } catch (error) {
      res.badRequest(error.message);
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      await ProductService.deleteProduct(req.params.pid);
      res.success({ success: true });
    } catch (error) {
      res.badRequest(error.message);
    }
  };
}

export default ProductsController;