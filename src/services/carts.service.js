import {cartsDAO,productDAO,TicketDAO,} from "../DAO/factory.js";

class CartService {
  async createOne() {
    try {
      const newCart = new cartsDAO({ products: [] });
      const createdCart = await newCart.save();
      return createdCart;
    } catch (error) {
      throw new Error("Failed to create cart");
    }
  }

  async get(cartId) {
    try {
      const cart = await cartsDAO.findById(cartId).populate("products.product");
      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      throw new Error("Failed to get cart");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await cartsDAO.findById(cartId);
      const product = await productDAO.findById(productId);
      if (!cart) {
        throw new Error("Cart does not exist");
      }
      if (!product) {
        throw new Error("Product does not exist");
      }
      cart.products.push({ product: product._id, qty: 1 });
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Failed to add product to cart");
    }
  }

  async updateProductQty(cartId, productId, qty) {
    try {
      const cart = await cartsDAO.findById(cartId);
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
      throw new Error("Failed to update product quantity");
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
      throw new Error("Failed to remove product from cart");
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await cartsDAO.findById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      console.error("Failed to clear cart");
    }
  }
}

export default CartService;
