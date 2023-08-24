import express from "express";
export const viewsRouterSessions = express.Router();

viewsRouterSessions.get("/view", async (req, res) => {
  res.render("session");
});

viewsRouterSessions.get("/login", async (req, res) => {
  res.render("login-github");
});