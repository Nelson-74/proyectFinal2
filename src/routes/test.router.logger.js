import express from "express";
import { startLogger } from "../utils/logger.js";

const loggersTestRouter = express.Router();

loggersTestRouter.get("/", async (req, res) => {
  try {
    const logger = startLogger(); 
    logger.error("This is an error message"); 
    logger.info("This is an info message"); 
    res.status(201).send({ message: 'Hello World' });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

export default loggersTestRouter;


