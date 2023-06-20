import { cartModel } from "../DAO/models/cartsModel.js";
import {productModel} from "../DAO/models/productsModel.js"

class CartService {
  async createOne(cartData) {
    try {
      const newCart = new cartModel(cartData);
      const createdCart = await newCart.save();
      return createdCart;
    } catch (error) {
      throw new Error("Failed to create cart");
    }
  }

  async get(cartId){
    try {
      const cart = await cartModel.findById(cartId).populate("products.product");
      if(!cart){
        throw new Error("Cart not found");
      }
      return cart;
    }catch (error) {
      throw new Error ("Failed");
    }
  }

  async addProductCart(cartId, productId){
    try {
      const cart = await cartModel.findById(cartId);
      const product = await productModel.findById(productId);
      if(!cart){
        throw new Error("Cart does not exist");
      }
      if(!product){
        throw new Error("Product does not exist");
      }
      cart.products.push({product: product._id, qty: 1});
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("error");
    }
  }

  async updateProductQty(cartId, productId, qty){
    try {
      const cart = await cartModel.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1){
        throw new Error ("Product not found")
      }
      cart.products[productIndex].qty = qty;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error updated product quantity");
    }
  }

  async removeProductCart(cartId, productId){
    try{
      const cart = await cartModel.findById(cartId);
      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if(productIndex === -1){
        throw new Error("Product not found to cart");
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
      return cart;
  }catch(error){
    throw new Error("Error deleted product from cart");
  }
}

async clearCart(cartId){
  try{
    const cart = await cartModel.findById(cartId);cart.products = []; 
    await cart.save();
  }catch(error){
    console.error("clear error");
  }
}
}
export default CartService;
