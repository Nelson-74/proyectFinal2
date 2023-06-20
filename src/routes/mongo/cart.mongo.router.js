import express from "express";
import CartService from "../../services/cart.service.js";

const cartRouter = express.Router();
const cartService = new CartService();

cartRouter.post("/" , async (req,res) => {
  try {
    const newCart = await CartService.createOne();
    res.status(200).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(401).json({status: "error", 
    msg: "error",})
  }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  try{
    const {cid, pid} = req.params;
    const cart = await CartService.addProductToCart(cid, pid);
    res.status(200).json(cart);
  }catch(error){
    res.status(403).json({
      status:"error",
      msg: " error",
    });
  }
});

cartRouter.get("/cart/products/:cid", async (req, res)=> {
  try {
    const cid = req.params.cid;
    const cartsProducts = await CartService.getProductsById (cid);
    res.status(200).render("cartsProducts", cartsProducts)
  } catch (error) {
    res.status(500).json ({
      status: "error", 
      msg: "error",
    })
  }
});

cartRouter.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const card = await CartService.get(cartId);
  } catch (error) {
    res.status(404).json({
      status: "error", 
      msg: "error",
    })
  }
});

cartRouter.put("/:cid", async (req, res) => {
  try {
    const {cid} = req.params;
    const{products} = req.body;
    const cart = await CartService.updateCart(cid, products);
    res.status(200).json({
      status:"ok",
      msg: "cart updated ",
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg:"server internal error",
    })
  }
})

cartRouter.put("/:cid/product/:pid", async (req,res) => {
  try {
    const cid = req.params.cid;
    const pId = req.params.pid;
    const qty = parseInt(req.body.qty);
    await CartService.addProductToCart(cid, pId, qty);
    return res.status(200).json({message: "product added to cart "});
  } catch (error) {
    console.log(err);
    res.status(500).json({
      status : "error",
      msg: "Cart not found"
    })
  }
});

cartRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
      const {cid, pid} = req.params;
      const cart = await CartService.removeProduct(cid, pid);
      res.status(200).json({
        status: "ok",
        msg: "product remove",
      });
    }catch{
      console.log("Error");
      res.status(500).json({
        status: "error",
        msg: "Internal server error",
      });
    }
  });
  
cartRouter.delete("/:cid", async (req, res) => {
  try {
    const {cid}= req.params;
    await CartService.clearCart(cid);
    res.status(200).json({
      status: "ok",
      msg: `cart ${cid} deleted`,
    });
  }catch (error){
    console.log("error");
    res.status(401).json({
      status: "error",
      msg:"Internal server error",
      })
  }
});  
  export default cartRouter;