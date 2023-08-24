import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import { __dirname, connectMongo,connectSocket } from "./utils.js";
import path from "path";
import {Server as SocketServer} from "socket.io";
import {usersRouter} from "./routes/users.router.js";
import messagesRouter from "./routes/mongo/messages.router.js";
import productRouter from "./routes/mongo/product.mongo.router.js";
import cartRouter from "./routes/mongo/carts.mongo.router.js";
import viewsRouter from "./routes/mongo/views.mongo.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore  from "session-file-store";
import passport from "passport";
import {iniPassport} from "./config/passport.config.js";
import {authRouter} from "./routes/auth.router.js";
import {mockRouter} from "./routes/mock.router.js";
import {ticketsRouter} from "./routes/tickets.router.js";
import {viewsRouterSessions} from "./routes/views.router.js";
import{sessionsRouter} from "./routes/sessions.router.js";
import errorHandler from "./middlewares/errors.js";
import EErrors from "./services/errors/enums.js";
import winston from "winston";
import startLogger from "./middlewares/logger.middleware.js";

const app = express();
app.use(startLogger );

const port = 8080;
const fileStore = FileStore(session);

const httpServer = app.listen(port, () => {
  console.log(__dirname);
  console.log(`Example app listening on http://localhost:${port}`);
});

app.use(express.urlencoded({ extended: false }));

const io = new SocketServer(httpServer);


app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.engine("handlebars", handlebars.engine());
app.set("views",path.join (__dirname, "views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));


app.use(
  session({
  store: MongoStore.create({mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@backendcodernelson.a5badyt.mongodb.net/ecommerce?retryWrites=true&w=majority`, ttl:7200}),
  secret:"un-re-secreto",
  resave: true,
  saveUninitialized: true
}));

connectMongo();
connectSocket(httpServer);

app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/",viewsRouter);
app.use("/chat", messagesRouter);
app.use("/auth", authRouter);


app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouterSessions);
app.use("/api/sessions/current", (req, res) => {
  res.json({ user: req.session });
});

app.use("/api",mockRouter);
app.use(errorHandler);

app.get("*",(req,res) => {
  return res.status(404).json({
    status:"error",
    message:"the route is not implemented!!!",
    data:{},
  });
});





app.use(cookieParser());

app.use("/api/set-cookies", (req, res) =>{
  res.cookie("cookiePower", "info con power", {maxAge:1000000, signed: true, httpOnly: true});
  res.cookie("cont", 0, {maxAge: 10000000});
  return res.status(200).json({
    status: "error",
    msg:"Cookies setted successfully!",
    data: {},
  })
});

app.get("/api/get-cookies", (req, res) => {
  console.log("normal", req.cookies);
  console.log("firmadas" ,req.signedCookies);
  return res.status(200).json({
    status: "ok",
    msg:"look at your console and you will see your cookies!",
    data: {},
});
});

app.get("/api/deleteCookie",(req, res) => {
  res.clearCookie("cookiePower").send("Cookie Removed");
  res.clearCookie("cont").send("Cookie Removed");
}); 
 app.get("/session", (req,res) => {
  if(req.session.cont){
    console.log(req.session, req.sessionID);
    req.session.cont++;
    res.send("nos visitaste" + req.session.cont);
  }else{
    req.session.cont = 1;
    res.send("nos visitaste" + 1 );
  }
});  
 app.use(session({
  store: new fileStore({path: "/session", ttl:7200, retires:0}),
  secret: "S3CR3T0",
  resave: false,
  saveUninitialized: true,
})); 


 app.get("/logout", (req,res) => {
  //console.log(req?.session?.user, req?.session?.admin);
  req.session.destroy(err => {
    if(err){
      return res.json({
        status: "Logout Error",
        body: err
      })
    }
    res.send(("Logout ok !!"))
  });
  //console.log(req?.session?.user, req?.session?.admin);
}); 

app.get("login", (req, res) =>{
  console.log(req.session.user,req.session.admin);
  const {userName, password} = req.query;
  if(userName !== "pepe" || password !== "pepepass"){
    return res.send("login failed");
  }
  req.session.user = userName;
  req.session.admin = true;
  res.send(" login ok");
});

app.get("/privado", auth,(req,res) => {
  res.send("si estás viendo esto es porque ya te logeaste!!")
});  

//app.use(cookieParser("code-secret-123456789"));