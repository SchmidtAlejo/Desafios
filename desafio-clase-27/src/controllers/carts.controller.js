import CartsService from "../services/carts.service.js";

class CartsController {
  static createCart = async (req, res) => {
    try {
      const cart = await CartsService.createCart();
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static getCartById = async (req, res) => {
    try {
      const cart = await CartsService.getCartById(req.params.cid);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static addProductToCart = async (req, res) => {
    try {
      const cart = await CartsService.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static deleteProductFromCart = async (req, res) => {
    try {
      const cart = await CartsService.deleteProductFromCart(req.params.cid, req.params.pid);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static updateCart = async (req, res) => {
    try {
      const cart = await CartsService.updateCart(req.params.cid, req.body.products);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static updateQuantity = async (req, res) => {
    try {
      const cart = await CartsService.updateQuantity(req.params.cid, req.params.pid, req.body.quantity);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static deleteProducts = async (req, res) => {
    try {
      const cart = await CartsService.deleteProducts(req.params.cid);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }
}

export default CartsController;