import express from "express";
import {ProductManager} from "../productsManager.js";

const homeRouter = express.Router();
const productsManager = new ProductManager("../productsManager.js");

homeRouter.get("/", async (req, res) => {
  try {
    const products = await productsManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    // Manejar el error adecuadamente
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos"});
  }
});

homeRouter.get("/realTimeProducts", async (req, res) => {
  try {
    const products = await productsManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    // Manejar el error adecuadamente
    console.error(error);
    res.status(500).json({message:"Error al obtener los productos"});
  }
});

export default homeRouter;
