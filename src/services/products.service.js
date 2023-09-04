import ProductDAO from "../DAO/class/products.dao.js";
import EErrors from "./errors/enums.js";
import mongoosePaginate from "mongoose-paginate-v2"; 

const productDAO = new ProductDAO();
export class ProductService {
  

  validate(title, description, price, thumbnail, code, stock, category) {
    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
      return customError.createError({
        name: "Validate error",
        message: "Please fill all the fields",
        code: EErrors.INVALID_TYPES_ERROR,
        cause:customInfo.generateProductErrorInfo(),
      })
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
    const result = await productDAO.findAllWithPagination(filter, options);
    const response = {
      status: "ok",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}` : null,
    };
    return response;
  }

  async createOne(title, description, price, thumbnail, code, stock, category) {
    this.validate(title, description, price, thumbnail, code, stock, category);
    const productCreated = await productDAO.create({ title, description, price, thumbnail, code, stock, category });
    return productCreated;
  }

  async deleteOne(_id) {
    const deleted = await productDAO.deleteOne({ _id });
    if (deleted.deletedCount === 1) {
      return true;
    } else {
      throw new Error("Product not found");
    }
  }

  async updateOne(id, title, description, price, thumbnail, code, stock, category) {
    this.validate(title, description, price, thumbnail, code, stock, category);
    const productUpdated = await productDAO.updateOne({ _id: id }, { title, description, price, thumbnail, code, stock, category });
    return productUpdated;
  }
}







