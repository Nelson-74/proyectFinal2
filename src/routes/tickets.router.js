import { Router } from "express";
import {ticketsController} from "../controllers/tickets.controller.js";
import {isLoggedIn, isUser} from "../middlewares/auth.js";

export const ticketsRouter =  Router();

ticketsRouter.get ("/checkout", isLoggedIn,isUser,ticketsController.checkout);
ticketsRouter.get("/finaltickets", isLoggedIn, isUser, ticketsController.addTicket)