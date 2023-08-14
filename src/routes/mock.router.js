import express from "express";
import mockController from "../controllers/mock.controller.js";

export const mockRouter = express.Router();

const mockController = new mockController();

mockRouter.get("/mockingproducts", mockController.getMockProducts);



