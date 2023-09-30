import passport from "passport";
import express from "express";
import {iniPassport} from "../config/passport.config.js";
import SessionsController from "../controllers/sessions.controller.js";

export const sessionsRouter = express.Router();
const sessionsController = new SessionsController();

sessionsRouter.get("/api/sessions/github", passport.authenticate("github", { scope: ["user:email"] }));
sessionsRouter.get("/api/sessions/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), sessionsController.registerGithub);;
sessionsRouter.get("/api/sessions/current", sessionsController.currentSession);
