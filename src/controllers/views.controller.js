import {ProductService} from "../services/products.service.js";
import CartService from "../services/carts.service.js";
import {startLogger, devLogger, prodLogger} from "../utils/logger.js";
const productService = new ProductService();
const cartService = new CartService();

class ViewsController {
  async home(req, res) {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      const queryParams = { limit, page, sort, query };
      const products = await productService.getAll(queryParams);
      return res.status(200).render("home", { products });
    } catch (err) {
      startLogger.error(e.message);
      return res
        .status(500)
        .json({ status: "error", msg: "Error in server", products: {} });
    }
  }

  async realtimeProducts(req, res) {
    try {
      const products = await productService.getAll();
      return res.status(200).render("realTimeProducts", { products });
    } catch (err) {
      return res
        .status(500)
        .json({ status: "error", msg: "Error in server", products: {} });
    }
  }

  async products(req, res) {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      const queryParams = { limit, page, sort, query };

      const {
        payload: products,
        totalPages,
        payload,
        prevPage,
        nextPage,
        page: currentPage,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      } = await productService.getAll(queryParams);

      let productsSimplified = products.map((item) => {
        return {
          _id: item._id.toString(),
          title: item.title,
          description: item.description,
          price: item.price,
          thumbnail: item.thumbnail,
          code: item.code,
          stock: item.stock,
          category: item.category,
        };
      });

      return res.render("products", {
        products: productsSimplified,
        totalPages,
        prevPage,
        nextPage,
        currentPage,
        hasPrevPage,
        hasNextPage,
        prevLink: prevLink?.substring(4) || "",
        nextLink: nextLink?.substring(4) || "",
      });
    } catch (error) {
      startLogger.error(e.message);
      return res
        .status(500)
        .json({ status: "error", message: "Error in server" });
    }
  }

  async productDetails(req, res, next) {
    try {
      const { pid } = req.params;
      const product = await productModel.findById(pid);
      const productSimplified = {
        _id: product._id.toString(),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
      };
      console.log(productSimplified);
      res.render("productDetails", { product: productSimplified });
    } catch (error) {
      next(error);
    }
  }

  async cartDetails(req, res, next) {
    try {
      const { cid } = req.params;
      const cart = await cartService.get(cid);

      const simplifiedCart = cart.products.map((item) => {
        return {
          title: item.product.title,
          price: item.product.price,
          qty: item.qty,
        };
      });
      console.log(simplifiedCart);
      res.render("cartDetails", { cart: simplifiedCart });
    } catch (error) {
      startLogger.error(e.message);;
    }
  }
}

export default ViewsController;
