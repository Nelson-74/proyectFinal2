import {Router} from "express";
import {ProductManager} from "../productsManager.js";


export const productsRouter = Router();
const productsManager = new ProductManager ("../productsManager.js");

productsRouter.get("/",async (req,res) => {
  try {
      const {limit} = req.query;
      const products = await productsManager.getProducts();
          if(limit){
            return res.status(200).json(products.slice(0, limit));
        }else{
          res.status(200).json(products);    
        }
        
    } catch (error) {
      res.status(500).json({message: "There was a mistake"});
    }
});

productsRouter.get("/:pid",async (req,res) => {
  try {
    const product = await productsManager.getProduct(req.params.pid);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: "there was a mistake"});
  }
});
productsRouter.post("/",async(req,res) => {
  const newProduct = req.body;
  newProduct.id = (Math.random()*100000000).toFixed(0).toString();
  const product = await productsManager.addProduct(newProduct);
  return res.status(201).json({
    status: "ok",
    message: "create product",
    data: product,
  })
});

productsRouter.put("/:pid",async(req,res) => {
    try {
      const updatedProduct = req.body;
      const product = await productsManager.updatedProduct(req.params.id, updatedProduct);
      return res.status(200).json({
      status: "ok",
      message:"update product",
      data: product})
    } catch (error) {
      res.status(500).json({ message: " There was a mistake"});
    }
});

productsRouter.delete("/:pid",async(req,res) => {
  try {
  await productsManager.deleteProduct(req.params.pid);
  return res.status(200).json({
      status: "ok",
      message: "delete product",
    });
  } catch (error) {
    res.status(500).json({ message: "There eas a mistake"});
  }
});

