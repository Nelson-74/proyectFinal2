import CartService from "../services/carts.service.js";
import {logger} from "../utils/logger.js";
import CartsDAO from "../DAO/class/carts.dao.js";
import ProductDAO from "../DAO/class/products.dao.js";

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
      res.status(500).render("error",{ Error: "Failed to create cart" });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      if (!cid ||!pid ) return res.sendStatus(401).json({
        status: "error",
          msg: "Invalid request. Both 'cid' and 'pid' must be provided.",
      }); 
      const cart = await Carts.addProductToCart(cid, pid);
      res.status(200).json({
      status: "success",
      message: "Product added to cart successfully",
      data: cart,});
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).render("error",{Error: "Failed to add product to cart"});
    }
    console.log('Añadir producto al carrito:', productId);
  }

  async removeProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      if (!cid || !pid) return res.sendStatus(401);
      await Carts.removeProduct(cid, pid);
      res.status(200).json({
        status: "success",
        message: "Product removed from cart successfully",
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).render("error",{Error: "Failed to remove product from cart"});
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
      res.status(500).render("error",{Error: "Failed to get cart products"});
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
      res.status(500).render("error",{ Error: "Failed to get carts" });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const newProducts = req.body.products; // proporcionar un arreglo de productos en req.body
      const currentCart = await Carts.get(cid);
      currentCart.products = newProducts;
      const updatedCart = await currentCart.save();
      res.status(200).json({
        status: "success",
        message: "Cart updated successfully",
        data: updatedCart,
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).render("error",{Error: "Failed to update cart"});
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body; // proporcionar la nueva cantidad en req.body
      const updatedCart = await Carts.updateProductQuantity(cid, pid, quantity);
      res.status(200).json({
        status: "success",
        message: "Product quantity updated successfully",
        data: updatedCart,
      });
    } catch (error) {
      logger.error(error.message,error);
      res.status(500).render("error",{Error: "Failed to update product quantity"});
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
      res.status(500).render("error",{Error: "Failed to clear cart"});
    }
  }
  async purchaseCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await CartsDAO.get(cid);
      if (!cart) {
        return res.status(404).json({
          status: "error",
          message: "Cart not found",
        });
      }
      // Iterate through the products in the cart
      for (const cartProduct of cart.products) {
        const productId = cartProduct.product.toString();
        const product = await ProductDAO.findById(productId);
        if (!product) {
          return res.status(404).json({
            status: "error",
            message: `Product with ID ${productId} not found`,
          });
        }
        if (product.stock >= cartProduct.quantity) {
          product.stock -= cartProduct.quantity;
          await product.save();
        } else {
          return res.status(400).json({
            status: "error",
            message: `Product ${product.title} doesn't have enough stock.`,
          });
        }
        }
        // Clear the cart after purchasing all its contents
        await this.clearCart(cart._id);
        return res.status(201).json({
          status: "success",
          message: "Order placed successfully.",
        });
        } catch (err) {
        console.log(err);
        return res.status(500).send('Server error');
      }
    }
}

export default CartsController;
