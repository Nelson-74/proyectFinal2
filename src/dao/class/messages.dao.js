import { MessageModel } from "../DAO/models/messages.model.js";
import {logger} from "../../utils/logger.js";

class messageDAO {
  async findAll() {
    try {
      const messages = await MessageModel.find();
      return messages;
    } catch (error) {
      logger.error(e.message);
      throw new Error("Error al obtener los mensajes");
    }
  }
}

export default messageDAO;
