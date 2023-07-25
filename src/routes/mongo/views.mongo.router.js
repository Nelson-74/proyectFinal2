import express from "express";
import ViewsController from "../controllers/viewsController.js";

export const viewsRouter = express.Router();
const viewsController = new ViewsController();

viewsRouter.get("/", viewsController.home);
viewsRouter.get("/realtimeproducts", viewsController.realtimeProducts);
viewsRouter.get("/products", viewsController.products);
viewsRouter.get("/products/:pid", viewsController.productDetails);
viewsRouter.get("/carts/:cid", viewsController.cartDetails);

export default viewsRouter;


