import { MessageModel } from "../DAO/models/messages.model.js";
import {startLogger, devLogger, prodLogger} from "../../utils/logger.js";

class messageDAO {
  async findAll() {
    try {
      const messages = await MessageModel.find();
      return messages;
    } catch (error) {
      startLogger.error(e.message);
      throw new Error("Error al obtener los mensajes");
    }
  }
}

export default messageDAO;
