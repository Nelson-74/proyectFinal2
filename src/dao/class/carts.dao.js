import { cartModel } from "../DAO/models/carts.models.js";
import { productModel } from "../DAO/models/products.model.js";
import {logger} from "../../utils/logger.js";

class CartsDAO {
  async create() {
    try {
      const newCart = new cartModel({ products: [] });
      const createdCart = await newCart.save();
      return createdCart;
    } catch (error) {
      logger.error(error.message, error);
      throw new Error("Failed to create cart");
    }
  }

  async findById(cartId) {
    try {
      const cart = await cartModel.findById(cartId).populate("products.product");
      if (!cart) {
        logger.error("Cart not found");
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      logger.error(error.message.error, error);
      throw new Error("Failed to get cart");
    }
  }

  async addProduct(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      const product = await productModel.findById(productId);
      if (!cart) {
        logger.error(error.message.error, error);
        throw new Error("Cart does not exist");
      }
      if (!product) {
        logger.error(error.message, error);
        throw new Error("Product does not exist");
      }
      cart.products.push({ product: product._id, qty: 1 });
      await cart.save();
      return cart;
    } catch (error) {
      logger.error(error.message, error);
      throw new Error("Failed to add product to cart");
    }
  }

  async updateProductQuantity(cartId, productId, qty) {
    try {
      const cart = await cartModel.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        logger.error(error.message, error);
        throw new Error("Product not found");
      }
      cart.products[productIndex].qty = qty;
      await cart.save();
      return cart;
    } catch (error) {
      logger.error("Failed to update product quantity");
      throw new Error("Failed to update product quantity");
    }
  }

  async removeProduct(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        logger.error(error.message, error);
        throw new Error("Product not found in cart");
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
      return cart;
    } catch (error) {
      logger.error(error.message, error);
      throw new Error("Failed to remove product from cart");
    }
  }

  async clear(cartId) {
    try {
      const cart = await cartModel.findById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      logger.error(error.message, error);
      throw new Error("Failed to clear cart");
    }
  }
}

export default CartsDAO;
