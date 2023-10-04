import express from "express";
import {uploader}from "../utils.js"; 
import { UserController } from "../controllers/usersController.js";

const documentsRouter = express.Router();
const userController = new UserController();

// Ruta para subir documentos
documentsRouter.post("/:uid/documents", uploader.array("documents"), userController.uploadDocuments);

export default documentsRouter;
