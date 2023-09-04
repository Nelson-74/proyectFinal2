import { productModel } from "../models/products.model.js";
import mongoosePaginate from "mongoose-paginate-v2"; 

class ProductDAO {
  validate(title, description, price, thumbnail, code, stock, category) {
    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
      console.log("Validation error: please complete all fields.");
      throw new Error("Validation error: please complete all fields.");
    }
  }

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
  }

  async findAllWithPagination(filter, options) {
    const { page, limit, sort } = options;

    const skip = (page - 1) * limit;

    const query = productModel.find(filter).skip(skip).limit(limit).sort(sort);
    const result = await query.exec();

    return result;
  }

  async createOne(title, description, price, thumbnail, code, stock, category) {
    this.validate(title, description, price, thumbnail, code, stock, category);
    const productCreated = await productModel.create({ title, description, price, thumbnail, code, stock, category });
    return productCreated;
  }

  async deleteOne(_id) {
    const deleted = await productModel.deleteOne({ _id });
    if (deleted.deletedCount === 1) {
      return true;
    } else {
      throw new Error("Product not found");
    }
  }

  async updateOne(id, title, description, price, thumbnail, code, stock, category) {
    this.validate(title, description, price, thumbnail, code, stock, category);
    const productUpdated = await productModel.updateOne({ _id: id }, { title, description, price, thumbnail, code, stock, category });
    return productUpdated;
  }
}

export default ProductDAO;
