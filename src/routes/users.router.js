import express from "express";
import { userService } from "../services/users.service.js";
import  {UserController}  from "../controllers/usersController.js";
import { isAdmin } from "../utils.js";
import documentsRouter from "./document.router.js";
import { userModel } from "../DAO/models/users.model.js";

export const usersRouter = express.Router();
const userController = new UserController();

usersRouter.get("/", userController.getAllUsers);
usersRouter.post("/:id", isAdmin, userController.createOne);
usersRouter.put("/update/:id",userController.updateOne );
usersRouter.delete("/delete/:id", userController.deleteOne);
usersRouter.put("/premium/:uid", userController.togglePremiumRol);
usersRouter.put("/premium/:uid/upgrade", userController.updateToPremium);
usersRouter.use("/:uid/documents", documentsRouter); 

usersRouter.post("/", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      if (!firstName || !lastName || !email || !password) {
        console.log(
          "validation error: please complete firstName, lastName and email."
        );
        return res.status(400).json({
          status: "error",
          msg: "please complete firstName, lastName and email.",
          data: {},
        });
      }
      const userCreated = await userModel.create({ firstName, lastName, email, password });
      return res.status(201).json({
        status: "success",
        msg: "user created",
        data: userCreated,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        data: {},
      });
    }
  });
  

