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
usersRouter.put("/premium/:uid", isAdmin,userController.togglePremiumRole);
usersRouter.put("/premium/:uid/upgrade", isAdmin, userController.updateToPremium);
usersRouter.use("/:uid/documents", documentsRouter); 

usersRouter.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      console.log("Validation error: Please complete firstName, lastName, email, and password.");
      return res.status(400).render("error",{ Error : "Validation error: Please complete firstName, lastName, email, and password."});
    }
    const userCreated = await userModel.create({ firstName, lastName, email, password });
    if (!userCreated) {
      return res.status(500).render("error",{Error : "Failed to create user."});
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
    return res.status(500).render("error",{ Error:"Something went wrong while creating the user."});
  }
});


