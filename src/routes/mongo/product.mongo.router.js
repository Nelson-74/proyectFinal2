import express from "express";
import ProductService from "../../services/products.service.js";
import { productModel } from "../../DAO/models/productsModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let sort = req.query.sort;
    let sortType = {};

    if (!page) page = 1;
    if (!limit) limit = 3;

    if (sort === "asc") {
      sortType = { price: 1 };
    } else if (sort === "desc") {
      sortType = { price: -1 };
    }

    const totalProducts = await productModel.countDocuments({});
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await productModel
      .find({})
      .sort(sortType)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.status(200).send({
      status: "ok",
      payload: products,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Something went wrong",
      data: {},
    });
  }
});


productRouter.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productModel.findById(productId).lean();
    const { title, description, price, thumbnail, code, stock, category, _id } = product;

    res.status(200).render("viewProduct", { title, price, description, stock, category, id: _id });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Something went wrong",
      data: {},
    });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, category } = req.body;
    const productCreated = await ProductService.createOne(title, description, price, thumbnail, code, stock, category);

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
});

productRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock, category } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
      console.log("Validation error: please complete all fields.");
      return res.status(400).json({
        status: "error",
        msg: "Validation error: please complete all fields.",
        data: {},
      });
    }

    const productUpdated = await ProductService.updateOne(id, title, description, price, thumbnail, code, stock, category);

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
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await ProductService.deleteOne(id);

    res.status(200).json({
      status: "ok",
      msg: "Product deleted",
      data: {},
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      status: 'error',
      msg: error.message,
      data: {},
    });
  }
});

export default productRouter;
