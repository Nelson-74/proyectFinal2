import { faker } from "@faker-js/faker/locale/es";

class MockProducts {
  constructor() {
    this.products = [];
    this.generateProduct = this.generatingProduct.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
    this.init();
  }

  generatingProduct() {
    const product = {
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 100, max: 60000, dec: 0, symbol: "$" }),
      thumbnails: [faker.image.sportswear()],
      code: faker.finance.bic({ includeBranchCode: true }),
      stock: faker.datatype.number({ max: 100 }),
      category: faker.commerce.department(),
      status: faker.datatype.boolean(),
    };
    return product;
  }

  init() {
    while (this.products.length < 100) {
      this.products.push(this.generateProduct());
    }
  }

  getAllProducts() {
    try {
      return {
        status: 200,
        result: { status: "ok", payload: this.products },
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        result: { 
        status: "error",
        msg: "Internal Server Error",
        payload: {}
        },
      };
    }
  }
}

export default MockProducts;
