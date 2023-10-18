import { ProductService } from "../services/products.service.js";
import customError from "../services/errors/custom.error.js";
import EErrors from "../services/errors/enums.js";
import {logger} from "../utils/logger.js";

const Products = new ProductService();

class ProductsController {

  async getAll(req, res,next) {
    try {
      const{limit = 10, page = 1,sort, query} = req.query;
      const queryParams = {
        limit: parseInt(limit),
        page: parseInt(page),
        query:query,
      };
      const user = req.user;
      const cartId = user ? user.cartId : null;
      const response = await Products.getAll(queryParams);
      res.render("products", {
        user: req.user,
        products: response.products,
        cartId: cartId,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        hasPrevPage:response.hasPrevPage,
        hasNextPage:response.hasNextPage,
        currentPage:response.currentPage,
        prevLink: response.prevLink,
        nextLink: response.nextLink,
      })
    } catch (error) {
      logger.error(error.message,error);
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
      logger.error(error.message,error);
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
      const user = req.user; 
      if (!user.canCreateProducts) {
        const error = customError.createError({
          name: "PermissionError",
          message: "No tienes permiso para crear productos",
          code: EErrors.PERMISSION_ERROR,
        });
        return next(error);
      }  
      const productCreated = await Products.createOne({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        owner: user.email,
      }); 
      if (productCreated) {
        res.status(200).json({
          status: "ok",
          msg: "Producto creado",
          data: productCreated,
        });
      } else {
        res.status(500).json({ message: "Error al crear el producto" });
      }
    } catch (error) {
      logger.error(error.message,error);
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
      logger.error(error.message,error);
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
        return res.status(404).render( "error",{ Error: "Producto no encontrado" });
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
        return res.status(401).render("error",{ Error: "No tienes permiso para eliminar este producto" });
      }
    } catch (error) {
      logger.error(error.message,error);
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
