import express from "express";
import ProductsController from "../../controllers/productsController.js";

const productRouter = express.Router();
const productsController = new ProductsController();

productRouter.get("/", productsController.getAll);
productRouter.get("/products/:pid", productsController.getById);
productRouter.post("/products/novel", productsController.createOne);
productRouter.put("/products/update/:id", productsController.updateOne);
productRouter.delete("/products/delete/:id", productsController.deleteOne);

//HANDLEBARS - WEBSOCKETS

productRouter.get("realTimesProducts",isUser, isAdmin, async(req, res) => {
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



export default productRouter;
