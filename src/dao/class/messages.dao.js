import { MessageModel } from "../DAO/models/messages.model.js";

class MessagesDAO {
  async findAll() {
    try {
      const messages = await MessageModel.find();
      return messages;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los mensajes");
    }
  }
}

export default MessagesDAO;
