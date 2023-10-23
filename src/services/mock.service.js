import express from "express";
import faker from "faker";
import {logger} from "../utils/logger.js";
class MockProducts {
  constructor() {
    this.products = [];
    this.init();
  }

  generatingProduct() {
    const product = {
      _id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 100, max: 60000, dec: 0, symbol: "$" }),
      thumbnails: [faker.image.imageUrl()],
      code: faker.finance.bic({ includeBranchCode: true }),
      stock: faker.datatype.number({ max: 100 }),
      category: faker.commerce.department(),
      status: faker.datatype.boolean(),
    };
    return product;
  }

  init() {
    while (this.products.length < 100) {
      this.products.push(this.generatingProduct());
    }
  }

  async getAllProducts() {
    try {
      return this.products;
    } catch (error) {
      logger.error(error.message);
      return {
        status: "error",
        message: "Internal Server Error",
        payload: {},
      };
    }
  }
}

export default MockProducts;
