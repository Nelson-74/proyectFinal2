import mongoose from "mongoose";
import Product from "./models/productModel.js";

// Conexión a la base de datos
mongoose.connect("mongodb://localhost/ecommerce", { useNewUrlParser: true, useUnifiedTopology: true });

const daoManager = {
  getAllProducts: async () => {
    try {
      const products = await Product.find({});
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw new Error('Error al obtener los productos');
    }
  },

  getProductById: async (id) => {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      throw new Error("Error al obtener el producto");
    }
  },

  addProduct: async (productData) => {
    try {
      const newProduct = new Product(productData);
      const product = await newProduct.save();
      return product;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      throw new Error("Error al agregar el producto");
    }
  },

  // Resto de las funciones del DAO...

};

export default daoManager;
