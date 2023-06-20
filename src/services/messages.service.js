import { MessageModel } from "../DAO/models/messagesModel.js";

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
