import { productModel } from "../models/products.model.js";
import {logger} from "../../utils/logger.js";

class ProductDAO {
  validate(title, description, price, thumbnail, code, stock, category) {
    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
      logger.error("Validation error: please complete all fields.");
      throw new Error("Validation error: please complete all fields.");
    }
  };

  async findOneById(productId){
    try{
    const product = await productModel.findById(productId);
    return product;
    }catch (error) {
      logger.error("Error al buscar el producto por Id:", error);
      throw  new Error(`Error al obtener los datos del producto ${productId}`);
      }
  };

  async getAll(queryParams) {
    const { limit = 10, page = 1, sort, query } = queryParams;
    const filter = {};
    if (query) {
      filter.$or = [{ category: query }, { availability: query }];
    }
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === "desc" ? "-price" : "price",
    };    
    return await productModel.paginate(filter, options);
  }  

  async findAllWithPagination(filter, options) {
    const { page, limit, sort } = options;
    const skip = (page - 1) * limit;
    const query = productModel.find(filter).skip(skip).limit(limit).sort(sort);
    const result = await query.exec();
    return result;
  }
  
  async createOne(title, description, price, thumbnail, code, stock, category) {
    try{
    this.validate(title, description, price, thumbnail, code, stock, category);
    const productCreated = await productModel.create({ title, description, price, thumbnail, code, stock, category });
    return productCreated;
    }catch (error){
      logger.error("Error creating product:", error);
      throw error;
    }
  }

  async deleteOne(_id) {
    try{
    const deleted = await productModel.deleteOne({ _id });
    if (deleted.deletedCount === 1) {
      return true;
    } else {
      logger.error("Product not found");
      throw new Error("Product not found");
    }
    } catch (error) {
      logger.error("Error deleting product:", error);
      throw error;
    }
  }

  async updateOne(id, title, description, price, thumbnail, code, stock, category) {
    try{
    this.validate(title, description, price, thumbnail, code, stock, category);
    const productUpdated = await productModel.updateOne({ _id: id }, { title, description, price, thumbnail, code, stock, category });
    return productUpdated;
    } catch (error) {
      logger.error(`Error updating product ${id}:`, error); 
      throw error;
      }
  }
}

export default ProductDAO;
