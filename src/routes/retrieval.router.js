import express from "express";
import { retrievalController} from "../controllers/retrieval.controller.js"


export const retrievalRouter = express.Router();

// Ruta para enviar un correo de recuperación de contraseña
retrievalRouter.post("/send-recovery-email", retrievalController.sendRecoveryEmail);

// Ruta para validar un token de recuperación
retrievalRouter.get("/validate-token/:token", retrievalController.validateToken);

// Ruta para restablecer la contraseña
retrievalRouter.post("/reset-password", retrievalController.resetPassword);

