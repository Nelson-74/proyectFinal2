import {cartsService} from "../../services/carts.services.js";

const cart = new cartsService();

cart.get("/cart/products/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cartsProducts = await cartsService.getProductsById (cid);
    res.status(200).render("cartsProducts", cartsProducts)
  } catch (error) {
    res.status(500).json ({
      status: "error", 
      msg: "error",
    })
  }
});

cart.put("/:cid/product/:pid", async (req,res) => {
  try {
    const cid = req.params.cid;
    const pId = req.params.pid;
    const qty = parseInt(req.body.qty);
    await cartsService.addProductToCart(cid, pId, qty);
    return res.status(200).json({message: "product added to cart "});
  } catch (error) {
    console.log(err);
    res.status(500).json({
      status : "error",
      msg: "Cart not found"
    })
  }

});