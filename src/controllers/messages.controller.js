import { MessagesService } from "../services/messages.service.js";

export class MessagesController {
  constructor() {
    this.messagesService = new MessagesService();
  }
  async getAllMessages(req, res) {
    try {
      const messages = await this.messagesService.getAll();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
      res.status(500).render("error",{Error: "Error al obtener los mensajes"});
    }
  }
}
