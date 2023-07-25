import express from "express";
import {userModel} from "../DAO/models/usersModel.js";
import {isAdmin, isUser} from "../middlewares/auth.js";
import session from "express-session";
import AuthController from "../controllers/authController.js";
import { userService } from "../services/users.service.js";

export const authRouter = express.Router();
const authController = new AuthController();

authRouter.get("/login", authController.loginPage);
authRouter.get("/profile", authController.profile);
authRouter.get("/administration", authController.administration);
authRouter.get("/logout", authController.logout);
authRouter.post("/login", authController.login);
authRouter.get("/register", authController.registerPage);
authRouter.post("/register", authController.register);



