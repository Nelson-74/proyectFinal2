import { userModel } from "../DAO/models/users.model.js";
import {isAdmin, isUser} from "../middlewares/auth.js";
import session from "express-session";

class AuthController {

  async login(req, res) {
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
  }

  async register(req, res) {
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
  }

  async logout(req, res) {
    req.session.destroy(err => {
      if(err){
        return res.json({
          status: "Logout Error",
          body: err
        })
      }
      res.send(("Logout ok !!"))
    })
  }
  loginPage(req, res) {
    return res.render("login", {});
  }

  profile(req, res) {
    const user = { email: req.session.email, isAdmin: req.session.isAdmin };
    return res.render("profile", { user: user });
  }

  administration(req, res) {
    return res.send("Top secret data!!");
  }


  registerPage(req, res) {
    return res.render("register");
  }
}

export default AuthController;
