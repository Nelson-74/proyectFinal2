import CartsDAO from "../DAO/class/carts.dao.js"
import ProductDAO from "../DAO/class/products.dao.js";
import {logger} from "../utils/logger.js";
class CartService {
  async createOne() {
    try {
      const newCart = new CartsDAO({ products: [] });
      const createdCart = await newCart.save();
      return createdCart;
    } catch (error) {
      logger.error("Failed to create cart");
      throw new Error("Failed to create cart");
    }
  }

  async get(cartId) {
    try {
      const cart = await CartsDAO.findById(cartId).populate("products.product");
      if (!cart) {
        logger.error("Cart not found");
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      logger.error("Failed to get cart");
      throw new Error("Failed to get cart");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await CartsDAO.findById(cartId);
      const product = await ProductDAO.findById(productId);
      if (!cart) {
        logger.error("Cart does not exist",error);
        throw new Error("Cart does not exist");
      }
      if (!product) {
        logger.error("Product does not exist");
        throw new Error("Product does not exist");
      }
      cart.products.push({ product: product._id, qty: 1 });
      await cart.save();
      return cart;
    } catch (error) {
      logger.error("Failed to add product to cart");
      throw new Error("Failed to add product to cart");
    }
  }

  async updateProductQuantity(cartId, productId, qty) {
    try {
      const cart = await CartsDAO.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        logger.info("Product not found");
        // Lanza un error para indicar que el producto no se encontró en el carrito
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
      const cart = await CartsDAO.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        logger.error("Product not found in cart");
        // Lanza un error para indicar que el producto no se encontró en el carrito
      throw new Error("Product not found in cart");
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
      return cart;
    } catch (error) {
      logger.error("Failed to remove product from cart");
    throw new Error("Failed to remove product from cart");
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await CartsDAO.findById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      logger.error("Failed to clear cart");
      throw new Error("Failed to clear cart");
    }
  }
}

export default CartService;
