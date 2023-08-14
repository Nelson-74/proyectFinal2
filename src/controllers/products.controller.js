import { ProductService } from "../services/products.service.js";
import customError from "../services/errors/custom.error.js";
import EErrors from "../services/errors/enums.js";

const Products = new ProductService();

class ProductsController {

  async getAll(req, res,next) {
    try {
      const queryParams = {
        limit: req.query.limit,
        page: req.query.page,
        sort: req.query.sort,
        query: req.query.query,
      };
      const response = await Products.get(queryParams);
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      next(
        customError.createError({
          name: "DatabaseError",
          cause: error,
          message: "Something went wrong",
          code: EErrors.DATABASE_ERROR,
        })
      );
    }
  }

  async getById(req, res,next) {
    try {
      const productId = req.params.pid;
      const product = await Products.getById(productId);
      res.status(200).render("viewProduct", product);
    } catch (error) {
      console.error(error);
      next(
        customError.createError({
          name: "DatabaseError",
          cause: error,
          message: "Something went wrong",
          code: EErrors.DATABASE_ERROR,
        })
      );
    }
  }

  async createOne(req, res,next) {
    try {
      const { title, description, price, thumbnail, code, stock, category } = req.body;
      const productCreated = await Products.createOne(title, description, price, thumbnail, code, stock, category);
      res.status(200).json({
        status: "ok",
        msg: "Product created",
        data: productCreated,
      });
    } catch (error) {
      console.error(error);
      next(
        customError.createError({
          name: "DatabaseError",
          cause: error,
          message: "Something went wrong",
          code: EErrors.DATABASE_ERROR,
        })
      );
    }
  }

  async updateOne(req, res,next) {
    try {
      const { id } = req.params;
      const { title, description, price, thumbnail, code, stock, category } = req.body;
      const productUpdated = await Products.updateOne(id, title, description, price, thumbnail, code, stock, category);
      res.status(200).json({
        status: "ok",
        msg: "Product updated successfully!",
        data: productUpdated,
      });
    } catch (error) {
      console.error(error);
      next(
        customError.createError({
          name: "DatabaseError",
          cause: error,
          message: "Something went wrong",
          code: EErrors.DATABASE_ERROR,
        })
      );
    }
  }

  async deleteOne(req, res,next) {
    try {
      const { id } = req.params;
      const productDeleted = await Products.deleteOne(id);
      res.status(200).json({
        status: "ok",
        msg: "Product deleted",
        data: { productDeleted },
      });
    } catch (error) {
      console.error(error);
      next(
        customError.createError({
          name: "DatabaseError",
          cause: error,
          message: "Something went wrong",
          code: EErrors.DATABASE_ERROR,
        })
      );
    }
  }
}

export default ProductsController;
