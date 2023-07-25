import passport from "passport";
import express from "express";
import {iniPassport} from "../config.js";
export const sessionsRouter = express.Router();
const sessionsController = new sessionsController();

iniPassport();

sessionsRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

sessionsRouter.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), sessionsController.registerGithub);;

sessionsRouter.get("/show", sessionsController.showSession);
