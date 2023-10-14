import { retrievalService } from "../services/retrieval.service.js";

class RetrievalController {
  async handleServiceRequest(req, res, serviceMethod) {
    try {
      const result = await serviceMethod(req);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async sendRecoveryEmail(req, res) {
    return this.handleServiceRequest(req, res, retrievalService.sendRecoveryEmail);
  }

  async validateToken(req, res) {
    return this.handleServiceRequest(req, res, retrievalService.validateToken);
  }

  async resetPassword(req, res) {
    return this.handleServiceRequest(req, res, retrievalService.resetPassword);
  }
}

export const retrievalController = new RetrievalController();
