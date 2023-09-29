import CartService from "../services/carts.service.js";
import {startLogger} from '../utils/logger.js';

const Carts = new CartService();
class CartsController {
  async createOne(req, res) {
    try {
      const newCart = await Carts.createOne();
      res.status(200).json(newCart);
    } catch (error) {
      startLogger.error(e.message);
      res.status(500).json({ 
        status: "error",
        msg: "Failed to create cart" });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await Carts.addProductToCart(cid, pid);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({
        status: "error",
        msg: "Failed to add product to cart",
      });
    }
  }

  async removeProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      await Carts.removeProduct(cid, pid);
      res.status(200).json({
        status: "ok",
        msg: "Product removed from cart",
      });
    } catch (error) {
      startLogger.error(e.message);
      res.status(500).json({
        status: "error",
        msg: "Failed to remove product from cart",
      });
    }
  }

  async getProductsById(req, res) {
    try {
      const cid = req.params.cid;
      const cartProducts = await Carts.getProductsById(cid);
      res.status(200).json(cartProducts);
    } catch (error) {
      res.status(500).json({
        status: "error",
        msg: "Failed to get cart products",
      });
    }
  }

  async getCarts(req, res) {
    try {
      const carts = await Carts.get();
      res.status(200).json(carts);
    } catch (error) {
      startLogger.error(e.message);
      res.status(500).json({ 
        status: "error",
        msg: "Failed to get carts" });
    }
  }
}

export default CartsController;
