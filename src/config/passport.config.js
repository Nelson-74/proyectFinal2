import passport from "passport";
import { userModel } from "../DAO/models/usersModel.js";
import local from "passport-local";
import { createHash, isValidPassword} from "../utils.js";
import GitHubStrategy from "passport-github2";
import { userService } from "../services/users.service.js";
const LocalStrategy = local.Strategy;

export function iniPassport(){
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "....",
        clientSecret: "....",
        callbackURL: "http://localhost:8080/api/sessions/githubCallback",
      },
      async (_, _, profile, done) => {
       console.log(profile);
        try {
          /*const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: "Bearer" + accesToken,
              "X-Github-Api-Version': '2022-11-28",
            },
          });
        const emails = await res.json();
        const emailDetail = emails.find((email) => email.verified == true);

        if (!emailDetail) {
          return done(new Error("cannot get a valid email for this user"));
        }
          profile.email = emailDetail.email; */

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
          console.log("User Registration succesful");
          return done(null, userCreated);
          } else {
          console.log("User already exists");
          return done(null, user);
          }
        } catch (e) {
          console.log("Error en auth github");
          console.log(e);
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
          console.log("User not found (email" + username);
          return done(null, false);
        }
        if(!isValidPassword(password, user.password)){
          console.log('Invalid Password');
          return done(null,false,{message:'Incorrect Email or Password.'});
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
        console.log("user registration ok");
        return done(null, userCreated);
        } catch(err){
          console.log("failed to register" );
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