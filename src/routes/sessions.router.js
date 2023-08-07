import passport from "passport";
import express from "express";
import {iniPassport} from "../config.js";
export const sessionsRouter = express.Router();
const sessionsController = new sessionsController();

iniPassport();

sessionsRouter.get("/api/sessions/github", passport.authenticate("github", { scope: ["user:email"] }));

sessionsRouter.get("/api/sessions/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), sessionsController.registerGithub);;

sessionsRouter.get("/api/sessions/current", sessionsController.currentSession);
