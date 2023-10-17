import express from "express";
import  {UserController}  from "../controllers/usersController.js";
import { isAdmin , isUser} from "../utils.js";
import documentsRouter from "./document.router.js";
import { userModel } from "../DAO/models/users.model.js";

export const usersRouter = express.Router();
const userController = new UserController();

usersRouter.get("/", userController.getAllUsers);
usersRouter.post("/:id", isAdmin, userController.createOne);
usersRouter.put("/update/:id",userController.updateOne );
usersRouter.delete("/delete/:id", userController.deleteOne);
usersRouter.put("/premium/:uid", userController.togglePremiumRole);
usersRouter.put("/premium/:uid/upgrade", userController.updateToPremium);
usersRouter.use("/:uid/documents", documentsRouter); 

usersRouter.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      console.log("Validation error: Please complete firstName, lastName, email, and password.");
      return res.status(400).json({
        status: "error",
        msg: "Validation error: Please complete firstName, lastName, email, and password.",
        data: {},
      });
    }
    const userCreated = await userModel.create({ firstName, lastName, email, password });
    if (!userCreated) {
      return res.status(500).json({
        status: "error",
        msg: "Failed to create user.",
        data: {},
      });
    }
    return res.status(201).json({
      status: "success",
      msg: "User created successfully.",
      data: userCreated,
    });
  } catch (error) {
    console.error("Error in user creation:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        status: "error",
        msg: "User with this email already exists.",
        data: {},
      });
    }
    return res.status(500).json({
      status: "error",
      msg: "Something went wrong while creating the user.",
      data: {},
    });
  }
});


