import express from "express";
import ViewsController from "../../controllers/views.controller.js";

export const viewsRouter = express.Router();
const viewsController = new ViewsController();

viewsRouter.get("/", viewsController.home);
viewsRouter.get("/realtimeproducts", viewsController.realtimeProducts);
viewsRouter.get("/products", viewsController.products);
viewsRouter.get("/:pid", viewsController.productDetails);
viewsRouter.get("/:cid", viewsController.cartDetails);

export default viewsRouter;


