import express from "express";
import { userService } from "../services/users.service.js";
import { usersController } from "../controllers/usersController.js";

export const usersRouter = express.Router();

const Service = new userService();

usersRouter.get("/users", usersController.getAllUsers());
usersRouter.post("/user/:id", isAdmin, usersController.createOne);
usersRouter.put("/user/update/:id",usersController.updateOne );
usersRouter.delete("/delete/:id", usersController.deleteOne);


