import express from "express";
import ProductsController from "../../controllers/productsController.js";

const productRouter = express.Router();
const productsController = new ProductsController();

productRouter.get("/", productsController.getAll);
productRouter.get("/:pid", productsController.getById);
productRouter.post("/", productsController.createOne);
productRouter.put("/:id", productsController.updateOne);
productRouter.delete("/:id", productsController.deleteOne);

export default productRouter;
