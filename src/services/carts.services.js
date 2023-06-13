import { CartModel } from "../DAO/models/cartsModel.js";

class CartService {
  async createOne(cartData) {
    try {
      const newCart = new CartModel(cartData);
      const createdCart = await newCart.save();
      return createdCart;
    } catch (error) {
      throw new Error("Failed to create cart");
    }
  }

  async get(cartId){
    try {
      const cart = await CartModel.findById(cartId).populate("products.product");
      if(!cart){
        throw new Error("Cart not found");
      }
      return cart;
    }catch (error) {
      throw new Error ("Failed");
    }
  }
}

export default CartService;
