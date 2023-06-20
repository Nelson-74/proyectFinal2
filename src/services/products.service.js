
import { productModel } from "../DAO/models/productsModel.js";

class ProductService {

  async getAllProducts() {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      throw new Error("Error al obtener los productos");
    }
  };

  async getProductById(productId) {
    try {
      const product = await productModel.findById(productId);
      return product;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      throw new Error("Error al obtener el producto");
    }
  };

  async addProduct(product) {
    try {
      const newProduct = new productModel(product);
      return newProduct.save();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      throw new Error("Error al agregar el producto");
    }
  };
};

export default new ProductService();

