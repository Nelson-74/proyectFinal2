import { retrievalService } from "../services/retrieval.service.js";

class RetrievalController {
  async handleServiceRequest(req, res, serviceMethod) {
    try {
      const result = await serviceMethod(req);
      // Si result es "tokenExpired," renderiza la plantilla para el token expirado
      if (result === "tokenExpired") {
        return res.render("retrieval.mail", { tokenExpired: true });
      } else {
        // Si no, renderiza la plantilla normal de recuperación
        return res.render("retrieval.mail", { tokenExpired: false, validEmail: result });
      }
    } catch (error) {
      res.status(400).render("error", { Error: error.message });
    }
  }

  async sendRecoveryEmail(req, res) {
    return this.handleServiceRequest(req, res, retrievalService.sendRecoveryEmail);
  }

  async validateToken(req, res){
    return this.handleServiceRequest(req, res, retrievalService.validateToken);
  }

  async resetPassword(req, res) {
    return this.handleServiceRequest(req, res, retrievalService.resetPassword);
  }
}

export const retrievalController = new RetrievalController();
