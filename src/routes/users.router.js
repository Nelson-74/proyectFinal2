import express from "express";
import { userService } from "../services/users.service.js";
import { usersController } from "../controllers/usersController.js";

export const usersRouter = express.Router();

const Service = new userService();

usersRouter.get("/", usersController.getAllUsers());
usersRouter.post("/:id", isAdmin, usersController.createOne);
usersRouter.put("/:id",usersController.updateOne );
usersRouter.delete("/:id", usersController.deleteOne);


