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
      const{cid, pid} = req.params;
      if(!cid || !pid) return res.sendStatus(401);
      const cart = await CartsDAO.findById(cartId);
      const product = await ProductDAO.findById(productId);
      if (!cart) {
        logger.error("Cart does not exist",error);
        throw new Error("Cart does not exist");
      }
      const userId = req.user._id;
      const user = await userModel.findById(userId);
      if(user.role === "premium"){
        const product = await ProductDAO.findById(pid);
      }
      if (!product) {
        logger.error("Product does not exist");
        return res.status(404).render(error,{Error: "product witch Id : ${pid} not found"});
      }
      if(product.owner.toString() === userId){
        return res.status(403).json({message:"You cannot add your own product to the cart as a premium user"});
      }
      cart.products.push({ product: product._id, qty: 1 });
      await cart.save();
      return cart;
    } catch (error) {
      logger.error("Failed to add product to cart");
      throw new Error("Failed to add product to cart");
    }
  }

  async updateProductQuantity(cartId, productId) {
    try {
      const cart = await CartsDAO.findById(cartId);
      for(const product of cartOutStock){
        const productId = product.idProduct;
        const productIndex = cart.products.findIndex(
          (p) => p.product.toString() === productId
      );
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
      }
      }
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
  };

export default CartService;
