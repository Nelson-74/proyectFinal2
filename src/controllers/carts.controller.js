import CartService from "../services/carts.service.js";
import {logger} from '../utils/logger.js';

const Carts = new CartService();
class CartsController {
  async createOne(req, res) {
    try {
      const newCart = await Carts.createOne();
      res.status(200).json({
      status: "success",
      message: "Cart created successfully",
      data: newCart});
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).json({ 
        status: "error",
        msg: "Failed to create cart" });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await Carts.addProductToCart(cid, pid);
      res.status(200).json({
      status: "success",
      message: "Product added to cart successfully",
      data: cart,});
    } catch (error) {
      logger.error(error.message,error);
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
        status: "success",
        message: "Product removed from cart successfully",
      });
    } catch (error) {
      logger.error(error.message,error);
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
      res.status(200).json({
        status: "success",
        message: "Cart products retrieved successfully",
        data: cartProducts,
      });
      res.render("cartView", {cartProducts});
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).json({
        status: "error",
        msg: "Failed to get cart products",
      });
    }
  }

  async getCarts(req, res) {
    try {
      const carts = await Carts.get();
      res.status(200).json({
        status: "success",
        message: "Carts retrieved successfully",
        data: carts,
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).json({ 
        status: "error",
        msg: "Failed to get carts" });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const newProducts = req.body.products; // proporcionar un arreglo de productos en req.body
      const updatedCart = await Carts.updateCart(cid, newProducts);
      res.status(200).json({
        status: "success",
        message: "Cart updated successfully",
        data: updatedCart,
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).json({
        status: "error",
        msg: "Failed to update cart",
      });
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { qty } = req.body; // proporcionar la nueva cantidad en req.body
      const updatedCart = await Carts.updateProductQuantity(cid, pid, qty);
      res.status(200).json({
        status: "success",
        message: "Product quantity updated successfully",
        data: updatedCart,
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).json({
        status: "error",
        msg: "Failed to update product quantity",
      });
    }
  }

  async clearCart(req, res) {
    try {
      const { cid } = req.params;

      await Carts.clearCart(cid);
      res.status(200).json({
        status: "success",
        message: "Cart cleared successfully",
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).json({
        status: "error",
        msg: "Failed to clear cart",
      });
    }
  }
}

export default CartsController;
