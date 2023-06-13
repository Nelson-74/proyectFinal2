import {Router} from "express";
import { ProductManager } from "../../DAO/fyleSystem/productsManager.js";
import {CartManager} from "../../DAO/fyleSystem/cartsManager.js";


export const cartsRouter = Router();

const products = new ProductManager("../DAO/fyleSystem/products.json")
const carts = new CartManager("../DAO/fyleSystem/carts.json")

cartsRouter.get("/", async (req, res, next) => {
  try {
    const data = await carts.getCarts();
    res.status(200).json({ 
      status: "success",
      msg: "cart created",
      data: carts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      status: "error",
      msg: "Internal Server Error",
      data: {},
  });
  }
});

cartsRouter.get("/:cid", async (req, res, next) => {
  try {
    const id = parseInt(req.params.cid);
    const cart = await carts.getCartById(id);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ 
        status :"error",
        msg:`Cart with id ${id} not found`,
        data: {},
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Internal server error",
    data:{},
  });
  }
});
cartsRouter.post("/", async (req, res, next) => {
  try {
    const newCart = await carts.addCart({ products: [] });
    res.status(200).json(newCart);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ 
        status: "error",
        msg: "Invalid input",
        data: {},
      });
    } else {
      res.status(500).json({ 
        status: "error",
        msg: "Error in server",
        data: {},
      });
    }
  }
});
  

cartsRouter.post("/:cid/products/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    
    const cart = await carts.getCartById(parseInt(cid));
    if (!cart) {
      return res.status(404).json({
        status: "error",
        msg: `Cart not found with id ${cid}`,
        data:{},
    });
    }    
    const product = await products.getProductById(parseInt(pid));
    if (!product) {
      return res.status(404).json({ 
        status: "error", 
        msg: `Product not found with id ${pid}`,
      data: {},
    });
    }    
    const updatedCart = await carts.addProductToCart(cart.id, product);    
    res.status(200).json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      status: "error", 
      msg: "Internal server error", 
      data: {} });
  }
});

