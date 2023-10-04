import {cartsDAO,ProductDAO,TicketDAO,} from "../DAO/factory.js";
import {logger} from "../utils/logger.js";
class CartService {
  async createOne() {
    try {
      const newCart = new cartsDAO({ products: [] });
      const createdCart = await newCart.save();
      return createdCart;
    } catch (error) {
      logger.error("Failed to create cart");
    }
  }

  async get(cartId) {
    try {
      const cart = await cartsDAO.findById(cartId).populate("products.product");
      if (!cart) {
        logger.error("Cart not found");
      }
      return cart;
    } catch (error) {
      logger.error("Failed to get cart");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await cartsDAO.findById(cartId);
      const product = await ProductDAO.findById(productId);
      if (!cart) {
        logger.error("Cart does not exist");
      }
      if (!product) {
        logger.error("Product does not exist");
      }
      cart.products.push({ product: product._id, qty: 1 });
      await cart.save();
      return cart;
    } catch (error) {
      logger.error("Failed to add product to cart");
    }
  }

  async updateProductQty(cartId, productId, qty) {
    try {
      const cart = await cartsDAO.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        logger.info("Product not found");
      }
      cart.products[productIndex].qty = qty;
      await cart.save();
      return cart;
    } catch (error) {
      logger.error("Failed to update product quantity");
    }
  }

  async removeProduct(cartId, productId) {
    try {
      const cart = await cartsDAO.findById(cartId);
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
      logger.info("Failed to remove product from cart");
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await cartsDAO.findById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      logger.error("Failed to clear cart");
    }
  }
}

export default CartService;
