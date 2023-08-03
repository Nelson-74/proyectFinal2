import { MessageModel } from "../DAO/models/messages.model.js";

export class MessagesService {
  async getAll() {
    try {
      const messages = await MessageModel.find();
      return messages;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los mensajes");
    }
  }
}
