import MockProducts  from "../services/mock.service.js"; 
import {logger} from '../utils/logger.js';

class MockController {
  constructor() {
  this.mockProducts = new MockProducts(); // Crea una instancia de MockProducts
  }

  async getMockProducts(req, res) {
    try {
      const products = await this.mockProducts.getAllProducts(); // Llama al método getAllProducts del módulo MockProducts
      res.status(200).json({ status: "ok", payload: products });
    } catch (error) {
      logger.error(error.message, error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  }
}

export { MockController }; 

