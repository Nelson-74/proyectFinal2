import express from "express";
import { isAdmin, isLoggedIn, isUser } from "../middlewares/auth.js";
import AuthController from "../controllers/auth.controller.js";
import { UserController } from "../controllers/usersController.js";

export const authRouter = express.Router();
const authController = new AuthController();
const userController = new UserController();

// Rutas públicas
authRouter.get("/login", authController.loginPage);
authRouter.post("/login", authController.login);
authRouter.get("/register", authController.registerPage);
authRouter.post("/register", authController.register);

// Rutas protegidas por middleware de autenticación
authRouter.get("/profile", isLoggedIn, authController.profile);
authRouter.get("/administration", isAdmin, authController.administration);
authRouter.get("/logout", isLoggedIn, authController.logout);
authRouter.get("/shop", isLoggedIn, userController.shop);

export default authRouter;


