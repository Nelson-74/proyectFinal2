import { MessageModel } from "../DAO/models/messages.model.js";
import {startLogger} from "../utils/logger.js";
export class MessagesService {
  async getAll() {
    try {
      const messages = await MessageModel.find();
      return messages;
    } catch (error) {
      startLogger.error(e.message);
      throw new Error("Error al obtener los mensajes");
    }
  }
}
