import express from "express";
import CartService from "../../services/cart.service.js";

const cartRouter = express.Router();
const cartService = new CartService();

cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartService.createOne();
    res.status(200).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", msg: "Failed to create cart" });
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.addProductToCart(cid, pid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Failed to add product to cart",
    });
  }
});

cartRouter.get("/cart/products/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartProducts = await cartService.getProductsById(cid);
    res.status(200).json(cartProducts);
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Failed to get cart products",
    });
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.get(cartId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({
      status: "error",
      msg: "Cart not found",
    });
  }
});

cartRouter.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await cartService.updateCart(cid, products);
    res.status(200).json({
      status: "ok",
      msg: "Cart updated",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Failed to update cart",
    });
  }
});

cartRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const qty = parseInt(req.body.qty);
    await cartService.updateProductQty(cid, pid, qty);
    return res.status(200).json({ message: "Product quantity updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "Failed to update product quantity",
    });
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await cartService.removeProduct(cid, pid);
    res.status(200).json({
      status: "ok",
      msg: "Product removed from cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "Failed to remove product from cart",
    });
  }
});

cartRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    await cartService.clearCart(cid);
    res.status(200).json({
      status: "ok",
      msg: `Cart ${cid} deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      msg: "Failed to delete cart",
    });
  }
});

export default cartRouter;
