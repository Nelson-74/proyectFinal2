import nodemailer from "nodemailer";
import { RetrievalCodeModel } from "../DAO/models/retrieval.code.models.js";
import { userModel } from "../DAO/models/users.model.js";


class RetrievalService {
  async sendRecoveryEmail(email) {
    try {
      // Verifica si el usuario existe en la base de datos
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }      
      const token = crypto.randomBytes(20).toString("hex");
      // Establece la fecha de expiración (1 hora a partir de ahora)
      const expire = new Date();
      expire.setHours(expire.getHours() + 1);

      // Guarda el token y la fecha de expiración en la base de datos
      await RetrievalCodeModel.create({ token, email, expire });
      // Envía el correo electrónico con el enlace de recuperación
      const recoveryLink = `${env.API_URL}/reset-password?token=${token}`;
      const transporter = nodemailer.createTransport({
        // Configura tu servicio de correo electrónico aquí
      });

      await transporter.sendMail({
        to: email,
        subject: "Recuperación de Contraseña",
        html: `Haga click <a href="${env.API_URL}">aquí</a> para restablecer su contraseña.`,
      });
      return "Correo de recuperación enviado con éxito";
    } catch (error) {
      throw error;
    }
  }
  async validateToken(token) {
    try {
      const retrievalCode = await RetrievalCodeModel.findOne({ token });
      if (!retrievalCode) {
        throw new Error("Token inválido");
      }
      if (retrievalCode.expire < new Date()) {
        throw new Error("El token ha expirado");
      }
      return "Token válido"; 
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(token, newPassword) {
    try {
      const retrievalCode = await RetrievalCodeModel.findOne({ token });
      if (!retrievalCode) {
        throw new Error("Token inválido");
      }
      if (retrievalCode.expire < new Date()) {
        throw new Error("El token ha expirado");
      }
      const user = await userModel.findOne({ email: retrievalCode.email });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      if (user.password === newPassword) {
        throw new Error("La nueva contraseña no puede ser igual a la contraseña actual");
      }
      // Actualiza la contraseña del usuario
      user.password = newPassword;
      await user.save();
      // Elimina el token de recuperación de la base de datos
      await RetrievalCodeModel.deleteOne({ token });
      return "Contraseña restablecida con éxito";
    } catch (error) {
      throw error;
    }
  }
}

export const retrievalService = new RetrievalService();
