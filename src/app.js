import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import { __dirname, connectMongo,connectSocket } from "./utils.js";
import path from "path";
import {Server as SocketServer} from "socket.io";
import session from "express-session";
import FileStore  from "session-file-store";
import passport from "passport";
import {usersRouter} from "./routes/users.router.js";
import messagesRouter from "./routes/mongo/messages.router.js";
import productRouter from "./routes/mongo/product.mongo.router.js";
import cartRouter from "./routes/mongo/carts.mongo.router.js";
import viewsRouter from "./routes/mongo/views.mongo.router.js";
import cookieParser from "cookie-parser";
import {iniPassport} from "./config/passport.config.js";
import {authRouter} from "./routes/auth.router.js";
import { isAdmin, isLoggedIn, isUser } from "./utils.js";
import {mockRouter} from "./routes/mock.router.js";
import {ticketsRouter} from "./routes/tickets.router.js";
import {viewsRouterSessions} from "./routes/views.router.js";
import{sessionsRouter} from "./routes/sessions.router.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errors.js";
import {logger} from "./utils/logger.js";
import loggersTestRouter  from "./routes/test.logger.router.js";
import mongoose from "mongoose";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import {retrievalRouter} from "./routes/retrieval.router.js";

const app = express();
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});
const PORT = process.env.PORT|| 3000;
const connection = mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@backendcodernelson.a5badyt.mongodb.net/ecommerce?retryWrites=true&w=majority`); 
const fileStore = FileStore(session);
const httpServer = app.listen(PORT, () => {
  logger.info(__dirname);
  logger.info(`Example app listening on http://localhost:${PORT}`);
});
app.use(express.urlencoded({ extended: false }));
const io = new SocketServer(httpServer);
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.engine("handlebars", handlebars.engine());
app.set("views",path.join (__dirname, "views"));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación Ropa deportiva",
      version: "1.0.0",
      description: "Este proyecto es de ropa deportiva",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`], // Especifica la ubicación de tus archivos de definición de rutas
};
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
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
app.use("/api/tickets", ticketsRouter); 
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouterSessions);
app.use("/api/sessions/current", (req, res) => {
  res.json({ user: req.session });
});
app.use("/api",mockRouter);
app.use(errorHandler);
app.get("/admin", isAdmin, (req, res) => {
  res.send("Página de administrador");// Esta ruta solo estará disponible para usuarios administradores
});
app.get("/user", isLoggedIn, (req, res) => {
  res.send("Página para usuarios autenticados");// Esta ruta requiere que el usuario esté autenticado
});
app.get("/user-auth", isUser, (req, res) => {
  res.send("Página para cualquier usuario autenticado");// Esta ruta requiere que el usuario esté autenticado, pero no necesariamente un administrador
});
app.use("/retrieval-email", retrievalRouter);
//app.use(cookieParser());
app.use(cookieParser("code-secret-123456789"));
app.use("/api/set-cookies", (req, res) =>{
  res.cookie("cookiePower", "info con power", {maxAge:1000000, signed: true, httpOnly: true});
  res.cookie("cont", 0, {maxAge: 10000000});
  return res.status(200).json({
    status: "ok",
    msg:"Cookies setted successfully!",
    data: {},
  })
});
app.get("/api/get-cookies", (req, res) => {
  logger.info("normal", req.cookies);
  logger.info("firmadas" ,req.signedCookies);
  return res.status(200).json({
    status: "ok",
    msg:"look at your console and you will see your cookies!",
    data: {},
  });
});
app.get("/api/deleteCookie",(req, res) => {
  res.clearCookie("cookiePower").send("Cookie Removed");
  
}); 
app.get("/session", (req,res) => {
  if(req.session.cont){
    logger.info(req.session, req.sessionID);
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
iniPassport();
app.use(passport.initialize());
app.use(passport.session());
app.get("/logout", (req,res) => {
  logger.info(req?.session?.user, req?.session?.admin);
  req.session.destroy(err => {
    if(err){
      return res.json({
        status: "Logout Error",
        body: err
      })
    }
    res.send(("Logout ok !!"))
  });
  logger.error(req?.session?.user, req?.session?.admin);
}); 
app.get("/login", (req, res) =>{
  logger.info(req.session.user,req.session.admin);
  const {userName, password} = req.query;
  if(userName !== "pepe" || password !== "pepepass"){
    return res.send("login failed");
  }
  req.session.user = userName;
  req.session.admin = true;
  res.send(" login ok");
});
app.use((req, res, next) => {
  req.logger = logger;
  next();
});
app.use("/testingLogger",loggersTestRouter );
app.get("*",(req,res) => {
  return res.status(404).json({
    status:"error",
    message:"the route is not implemented!!!",
    data:{},
  });
});