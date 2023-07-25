import { ProductService } from "../services/products.service.js";

const Products = new ProductService();

class ProductsController {

  async getAll(req, res) {
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
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
        data: {},
      });
    }
  }

  async getById(req, res) {
    try {
      const productId = req.params.pid;
      const product = await Products.getById(productId);
      res.status(200).render("viewProduct", product);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
        data: {},
      });
    }
  }

  async createOne(req, res) {
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
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
        data: {},
      });
    }
  }

  async updateOne(req, res) {
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
      res.status(500).json({
        status: "error",
        msg: "Something went wrong",
        data: {},
      });
    }
  }

  async deleteOne(req, res) {
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
      res.status(401).json({
        status: "error",
        msg: error.message,
        data: {},
      });
    }
  }
}

export default ProductsController;
