import { cartModel } from "../DAO/models/carts.models.js";
import { productModel } from "../DAO/models/products.model.js";
import {startLogger} from "../../utils/logger.js";

class CartsDAO {
  async create() {
    try {
      const newCart = new cartModel({ products: [] });
      const createdCart = await newCart.save();
      return createdCart;
    } catch (error) {
      startLogger.error("Failed to create cart");
    }
  }

  async findById(cartId) {
    try {
      const cart = await cartModel.findById(cartId).populate("products.product");
      if (!cart) {
        startLogger.info("Cart not found");
      }
      return cart;
    } catch (error) {
      startLogger.error("Failed to get cart");
    }
  }

  async addProduct(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      const product = await productModel.findById(productId);
      if (!cart) {
        startLogger.error("Cart does not exist");
      }
      if (!product) {
        startLogger.error("Product does not exist");
      }
      cart.products.push({ product: product._id, qty: 1 });
      await cart.save();
      return cart;
    } catch (error) {
      startLogger.error("Failed to add product to cart");
    }
  }

  async updateProductQuantity(cartId, productId, qty) {
    try {
      const cart = await cartModel.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        throw new Error("Product not found");
      }
      cart.products[productIndex].qty = qty;
      await cart.save();
      return cart;
    } catch (error) {
      startLogger.error("Failed to update product quantity");
    }
  }

  async removeProduct(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
      return cart;
    } catch (error) {
      startLogger.error("Failed to remove product from cart");
    }
  }

  async clear(cartId) {
    try {
      const cart = await cartModel.findById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      startLogger.error(e.message);
    }
  }
}

export default CartsDAO;
