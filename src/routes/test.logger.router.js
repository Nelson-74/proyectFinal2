import express from "express";
import { prodLogger,devLogger } from "../utils/logger.js";

const loggersTestRouter = express.Router();

loggersTestRouter.get("/", async (req, res) => {
  try {
    const logger = process.env.NODE_ENV === "production" ? prodLogger() : devLogger();
    logger.error("This is an error message"); 
    logger.info("This is an info message"); 
    res.status(201).send({ message: 'Hello World' });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

export default loggersTestRouter;

