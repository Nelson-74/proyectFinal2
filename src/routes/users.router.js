import express from "express";
import { userService } from "../services/users.service.js";
import  {UserController}  from "../controllers/usersController.js";
import { isAdmin } from "../utils.js";

export const usersRouter = express.Router();

const userController = new UserController();

usersRouter.get("/users", userController.getAllUsers);
usersRouter.post("/user/:id", isAdmin, userController.createOne);
usersRouter.put("/user/update/:id",userController.updateOne );
usersRouter.delete("/delete/:id", userController.deleteOne);


