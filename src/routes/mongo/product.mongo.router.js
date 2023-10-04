import express from "express";
import ProductsController from "../../controllers/products.controller.js";
import {isAdmin, isUser} from "../../utils.js";
import { productModel } from "../../DAO/models/products.model.js";
const productRouter = express.Router();
const productsController = new ProductsController();

productRouter.get("/", productsController.getAll);
productRouter.get("/products/:pid", productsController.getById);
productRouter.post("/novel", productsController.createOne);
productRouter.put("/update/:id", productsController.updateOne);
productRouter.delete("/delete/:id", productsController.deleteOne);
//HANDLEBARS - WEBSOCKETS
productRouter.get("/realTimesProducts",isUser, isAdmin, async(req, res) => {
try {
    const products = await productService.get();
    return res.status(200).render(realTimesProducts, {products : products, session: session})
} catch (error) {
    res.status(500).alert({Error:"no is user"})
}
});

productRouter.get("products", async (req, res)=>{
  const limit = req.query.limit;
    try{
        let allProduct = await productService.get({});
        if(limit){
          let allProductLimit = allProduct.slice(0,limit);
          res.status(200).render("products", {allProduct : allProductLimit});
        }else {
          res.status(200).render("products", {allProduct : allProduct });
        }
        }catch (error) {
          res.status(500).json({Error :"No products"})
        }
});
productRouter.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock, category} = req.body;
  try {
    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
      console.log(
        "validation error: please complete title, description, price, thumbnail, code, stock and category."
      );
      return res.status(400).json({
        status: "error",
        msg: "please complete title, description, price, thumbnail, code, stock and category.",
        data: {},
      });
    }
    const userCreated = await productModel.create({ title, description, price, thumbnail, code, stock, category });
    return res.status(201).json({
      status: "success",
      msg: "user created",
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

export default productRouter;
