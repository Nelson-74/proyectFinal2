import express from 'express';
import { userService } from "../services/users.service.js";

export const usersRouter = express.Router();

const Service = new userService();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await Service.getAll();
    res.render("users", { users });
  } catch (error) {
    console.log("Failed to fetch users", error);
    return res.status(500).json({
      status: "error",
      msg: "Failed to fetch users",
      data: {},
    });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userCreated = await Service.createOne(firstName, lastName, email);
    return res.status(201).json({
      status: "ok",
      msg: "user created",
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong ",
      data: {},
    });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw new Error("Invalid ObjectId");
    // delete the user with this ID from DB and send response back to client
    return res.status(200).json({
      status: "ok",
      msg: "user deleted",
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong ",
      data: {},
    });
  }
});

usersRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    return res.status(201).json({
      status: "ok",
      msg: "user uptaded",
      data: { _id: id, firstName, lastName, email },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong ",
      data: {},
    });
  }
});