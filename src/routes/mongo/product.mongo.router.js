import express from "express";
import ProductsController from "../../controllers/products.controller.js";
import {isAdmin, isUser} from "../../utils.js";
import { ProductService } from "../../services/products.service.js";
const productRouter = express.Router();
const productsController = new ProductsController();
const productService = new ProductService();

productRouter.get("/", productsController.getAll);
productRouter.get("/:pid", productsController.getById);
productRouter.post("/novel", productsController.createOne);
productRouter.put("/update/:id", productsController.updateOne);
productRouter.delete("/delete/:id", productsController.deleteOne);

//HANDLEBARS - WEBSOCKETS
productRouter.get("/realTimeProducts", isUser, isAdmin, async (req, res) => {
  try {
    const products = await productService.get();
    return res.status(200).render("realTimesProducts", { products });
  } catch (error) {
    res.status(500).send({ Error: "No es usuario" });
  }
});


export default productRouter;
