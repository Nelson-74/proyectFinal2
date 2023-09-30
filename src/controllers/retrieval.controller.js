import { retrievalService } from "../services/retrieval.service.js";

class RetrievalController {
  async sendRecoveryEmail(req, res) {
    const { email } = req.body;

    try {
      const result = await retrievalService.sendRecoveryEmail(email);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async validateToken(req, res) {
    const { token } = req.params;

    try {
      const result = await retrievalService.validateToken(token);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
      const result = await retrievalService.resetPassword(token, newPassword);
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const retrievalController = new RetrievalController();
