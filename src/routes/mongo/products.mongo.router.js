import  {productModel} from "../../DAO/models/productsModel.js"

productsRouter.get("/", async (req,res) => {
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
  // @ts-ignore
  const products = await productModel.paginate({},{page,limit,sort, lean:true})
  res.status(200).send({
    status: "ok",
    payload: products
  })
  } catch (error) {
      return new Error(error)
    }
  })