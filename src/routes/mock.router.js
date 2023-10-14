import express from "express";
import {MockController} from "../controllers/mock.controller.js";

export const mockRouter = express.Router();
const mockController = new MockController();

mockRouter.get("/mockingproducts", mockController.getMockProducts);


