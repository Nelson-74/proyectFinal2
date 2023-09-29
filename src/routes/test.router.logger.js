import express from "express";
import { devLogger, prodLogger,startLogger } from "../utils/logger.js";

const loggersTestRouter =express.Router(); 

loggersTestRouter.get("/", async (req, res) => {
  try{
    devLogger().info("This is a test message");
    prodLogger().info("This is another test message");
    await startLogger(req, res,() => {
      res.status(201).send({message: 'Hello World'});
    });
    } catch (error){
      console.log(`Error: ${error}`);
      }  });

export default loggersTestRouter;
