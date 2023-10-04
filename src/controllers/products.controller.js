import { ProductService } from "../services/products.service.js";
import customError from "../services/errors/custom.error.js";
import EErrors from "../services/errors/enums.js";
import {devLogger, prodLogger} from "../utils/logger.js";
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
      const response = await Products.getAll(queryParams);
      return res.status(200).json(response);
    } catch (error) {
      logger.error(error.message);
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
      startLogger.error(error.message);
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

  async createOne(req, res, next) {
    try {
      const { title, description, price, thumbnail, code, stock, category } = req.body;
      const user = req.user; // Obtener el usuario que realiza la solicitud
  
      if (!user.canCreateProducts) {
        return res.status(403).json({ message: "No tienes permiso para crear productos" });
      }
  
      // Crear el producto y establecer el owner
      const productCreated = await Products.createOne({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        owner: user.email, // O puedes usar user._id, dependiendo de tus preferencias
      });
  
      res.status(200).json({
        status: "ok",
        msg: "Producto creado",
        data: productCreated,
      });
    } catch (error) {
      logger.error(error.message);
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
      logger.error(error.message);
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

  async deleteOne(req, res, next) {
    try {
      const productId = req.params.id;
      const user = req.user; // Obtener el usuario que realiza la solicitud
      const product = await Products.getById(productId);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      // Verificar los permisos de eliminación
      if (user.rol === "admin" || (user.rol === "premium" && product.owner === user.email)) {
        const productDeleted = await Products.deleteOne(productId);
        res.status(200).json({
          status: "ok",
          msg: "Producto eliminado",
          data: { productDeleted },
        });
      } else {
        return res.status(403).json({ message: "No tienes permiso para eliminar este producto" });
      }
    } catch (error) {
      logger.error(error.message);
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
