import express from "express";
import {userModel} from "../DAO/models/usersModel.js";
import {isAdmin, isUser} from "../middlewares/auth.js";

export const authRouter = express.Router();

// Ruta de inicio de sesión
authRouter.get("/login", (req, res) => {
  
});

authRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if(err){
      return res.status(500).render("error",{ error: "error al desconectar el usuario"});
  }
  return res.redirect("/auth/login");
});
});

authRouter.post("/login", (req, res) => {
  // Lógica para verificar las credenciales y crear una sesión
});

// Ruta de registro
authRouter.get("/register", (req, res) => {
  // Renderizar la vista del formulario de registro
});

authRouter.post("/register", (req, res) => {
  // Lógica para crear un nuevo usuario en la base de datos
});

// Ruta de logout
authRouter.post("/logout", (req, res) => {
  
});

export { router as loginRoutes };
