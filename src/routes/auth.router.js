import express from "express";
import {userModel} from "../DAO/models/usersModel.js";
import {isAdmin, isUser} from "../middlewares/auth.js";
import session from 'express-session';

export const authRouter = express.Router();


authRouter.get("/login", (req, res) => {
  return res.render("login", {});
});

authRouter.get("/profile", isUser,(req, res) => {
  const user = {email: req.session.email, isAdmin: req.session.isAdmin};
  return res.render("profile", { user: user });
});

authRouter.get("/administration" , isUser, isAdmin, (req, res) => {
  return res.send("Date top secret!!")
});

authRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if(err){
      return res.status(500).render("error",{ error: "error disconnecting user"});
  }
  return res.redirect("/auth/login");
});
});

authRouter.post("/login", async(req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).render("error","enter your email and password");
  }
  try {
    let userFound = await userModel.findOne({ email });
    if (userFound && userFound.password == password){
      req.session.email = userFound.email;
      req.session.isAdmin = userFound.isAdmin;
      return res.redirect("/auth/perfil");
    }else{
      return res.status(401).render("error", { error: "email or password are wrong"})
    }
  }catch(error){
    console.log(`Error ${error}`);
    return res.status(500).render("error", {error:"Internal server Error"});
  }
});

authRouter.get("/register", (req, res) => {
  res.render("register");
});

authRouter.post("/register", async(req, res) => {
  const {email, password, firstName, lastName} = req.body;
  if(!email || !password || !firstName || !lastName){
    return res.status(400).render("error", {error: "fill all the fields"});
  }
  try {
    await userModel.create({ email: email, password: password, firstName: firstName, lastName : lastName, isAdmin: false });
    req.session.email = email;
    req.session.isAdmin = false;
    return res.redirect("/auth/profile");
  }catch(error){
    return res.status(400).render("error", {error: "Failed to create user, try another email"});
  }
});

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "nelson" && password === "n3ls0npa5s") {
    req.session.user = username;
    req.session.admin = true;
    res.send("Login success !!");
  } else if (username === "nelson@gmail.com" && password === "n3ls0npa5s") {
    req.session.email = username;
    req.session.role = "admin";
    res.redirect("/products");
  } else {
    res.redirect("/");
  }
});


authRouter.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if(err){
      return res.json({
        status: "Logout Error",
        body: err
      })
    }
    res.send(("Logout ok !!"))
  })
});

authRouter.get("/products", (req, res) => {
  if (req.session.email) {
    const user = {
      email: req.session.email,
      user: req.session.user|| "user",
    };
    res.render("products", { user });
  } else {
    res.redirect("/auth/login");
  }
});

