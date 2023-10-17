import express from "express";
import { MessagesController } from "../../controllers/messages.controller.js";

const messagesRouter = express.Router();
const messagesController = new MessagesController();

// Obtener todos los mensajes
messagesRouter.get('/', async (req, res) => {
  await messagesController.getAllMessages(req, res);
});

export default messagesRouter;


