import express from "express";
import CartsController from "../../controllers/carts.controller.js";

const cartRouter = express.Router();
const cartsController = new CartsController();

cartRouter.post("/cart", cartsController.createOne);
cartRouter.post("/:cid/product/:pid",cartsController.addProductToCart);
cartRouter.delete("/:cid/products/:pid", cartsController.removeProduct);
cartRouter.get("/:cid", cartsController.getProductsById);
cartRouter.get("/", cartsController.getCarts);
cartRouter.put("/:cid", cartsController.updateCart);
cartRouter.put("/:cid/products/:pid", cartsController.updateProductQuantity);
cartRouter.post("/:cid/purchase", cartsController.purchaseCart);

export default cartRouter;
