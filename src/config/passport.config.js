import passport from "passport";
import { userModel } from "../DAO/models/users.model.js";
import local from "passport-local";
import { createHash, isValidPassword} from "./bcrypt.js";
import GitHubStrategy from "passport-github2";
import { config } from "./config.js";
import { userService } from "../services/users.service.js";
import { logger } from "../utils/logger.js";
import winston from "winston";

const LocalStrategy = local.Strategy;

export function iniPassport(){
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL,
      },
      async (_, __, profile, done) => {
        logger.info(profile);
        try {
        let user = await userModel.findOne({ email: profile.email });
        if (!user) {
          const newUser = {
          email: profile.email,
          firstName: profile._json.name || profile._json.login || "noname",
          lastName: "nolast",
          isAdmin: false,
          password: "nopass",
        };
          let userCreated = await userModel.create(newUser);
          logger.info("User Registration succesful");
          return done(null, userCreated);
          } else {
          logger.info("User already exists");
          return done(null, user);
          }
        } catch (e) {
          logger.info("Error en auth github");
          logger.error(error.message);
          return done(e);
        }
      }
    )
  );

  passport.use (
    "login",
    new LocalStrategy ({ usernameField :"email"}, async ( username,password,done) => {
      try{
        const users = await userService.getUsers();
        let user;
        users.map((u) => u.email == username ? user = u : "");
        if(!user){
          logger.info("User not found (email" + username);
          return done(null, false);
        }
        if(!isValidPassword(password, user.password)){
          logger.info("Invalid Password");
          return done(null,false,{message:"Incorrect Email or Password."});
        }
        return done(null, user);
        }catch(error){
          return done(error);
        }
      })
  );
  
  passport.use(
    "register",
    new LocalStrategy({
      passReqToCallback: true, // allows us to access the request object in the callback
      usernameField: "email",
      },
    async (req, username,password, done) => {
      try{
        const {email, firstName, lastName, age, password} = req.body
        let newUser = {
          email,
          firstName,
          lastName,
          age,
          password,
        };
        let userCreated = await userService.addUser(newUser);
        logger.info("user registration ok");
        return done(null, userCreated);
        } catch(err){
          logger.error("failed to register" );
          return done(err);
      }
    }
  ) 
);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
}