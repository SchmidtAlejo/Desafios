import ProductService from "../services/products.service.js";
import { generateProduct, generator } from "../utils/utils.js";
import ProductDAO from '../dao/ProductDAO.js'
import fs from 'fs';
import path from 'path';


class ProductsController {
  static getProducts = async (req, res) => {
    try {
      const products = await ProductService.getProducts(
        req.query.limit,
        req.query.page,
        req.query.category,
        req.query.sort
      );
      const payload = {
        status: "success",
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage || null,
        nextPage: products.nextPage || null,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasPrevPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null,
        nextLink: products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null,
      }
      res.success(payload);
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

  static addProduct = async (req, res, next) => {
    try {
      const product = await ProductService.addProduct(req.body, req.user);
      res.success(product);
    } catch (error) {
      next(error)
    }
  };

  static updateProduct = async (req, res) => {
    try {
      const response = await ProductService.updateProduct(req.params.pid, req.body);
      res.success(response);
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

  static generateProducts = async (req, res) => {
    try {
      const payload = generator(100, generateProduct());
      res.success(payload);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static uploadImage = async (req, res) => {
    try {
      const productId = req.params.pid;
      const file = req.file;

      if (!file) {
        return res.badRequest('No file was uploaded.');
      }
      const product = await ProductDAO.getProductById(productId);
      if (!product) {
        return res.badRequest('Product not found.');
      }
      if (product.thumbnail) {
        fs.unlinkSync(path.resolve(product.thumbnail));
      }

      await ProductDAO.updateProduct(productId, { thumbnail: file.path });

      res.success('Product image uploaded successfully.');
    } catch (error) {
      res.error500(error.message);
    }
  }
}

export default ProductsController;