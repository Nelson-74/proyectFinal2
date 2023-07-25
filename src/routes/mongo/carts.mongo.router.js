import express from "express";
import cartsController from "../../controllers/carts.controller.js";

const cartRouter = express.Router();
const cartsController = new cartsController();

cartRouter.post("/", cartsController.createOne);
cartRouter.post("/:cid/product/:pid",cartsController.addProductToCart);
cartRouter.delete("/:cid/products/:pid", cartsController.removeProduct);
cartRouter.get("/:cid", cartsController.getProductsById);
cartRouter.get("/", cartsController.get);


export default cartRouter;