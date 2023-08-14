import { MockProducts } from "../mocks/MockProducts.js"; 

class MockController {
  constructor() {
  this.mockProducts = new MockProducts(); // Crea una instancia de MockProducts
  this.getMockProducts = this.getMockProducts.bind(this);
  }

  getMockProducts(req, res) {
    try {
      const response = this.mockProducts.getAllProducts(); // Llama al método getAllProducts del módulo MockProducts
      res.status(response.status).json(response.result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        msg: "Internal Server Error",
        payload: {},
      });
    }
  }
}

export { MockController }; 

