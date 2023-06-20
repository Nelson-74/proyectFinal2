
import express from "express";
import  {productModel} from "../../DAO/models/productsModel.js";
import CartService from "../../services/cart.service.js";

const productRouter = express.Router();

productRouter.get("/", async (req,res) => {
    try {
      let page = parseInt(req.query.page)
      let limit = parseInt(req.query.limit)
      let sort = req.query.sort
      let sortType = {}
      if(!page) page = 1
      if(!limit) limit = 3
      if(sort === "asc"){
      sortType = { price: 1}
  } else if (sort === "desc"){
    sortType = {price: -1}
  }
  const products = await productModel.paginate({},{page,limit,sort, lean:true})
  res.status(200).send({
    status: "ok",
    payload: products
  })
  } catch (error) {
      return new Error(error)
    }
  })

productRouter.get("/:pid", async (req,res) => { try {
  const productId = req.params.pid;
  const product = await productModel.findOne({ _id: productId}).lean()
  const {tittle, price,description, stock, category, _id} = product
  return res.status(200).render("viewProduct", {tittle, price,description, stock, category, id: _id})
} catch (error) {
  console.error(err)
}
});
export default productRouter;