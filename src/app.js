
import express from "express";
import handlebars from "express-handlebars";
import { __dirname, connectMongo,connectSocket } from "./utils.js";
import path from "path";
import {Server as SocketServer} from "socket.io";
import messagesRouter from "./routes/mongo/messages.router.js";
import productRouter from "./routes/mongo/product.mongo.router.js";
import cartRouter from "./routes/mongo/cart.mongo.router.js";
import viewsRouter from "./routes/mongo/views.mongo.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
//import { FileStore } from "session-file-store";
import {authRouter} from "./routes/auth.router.js";



const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

/* app.use(session({
  store: new FileStore({path: "/session", ttl:7200, retires:0}),
  secret: "S3CR3T0",
  resave: false,
  saveUninitialized: true,
}));
 */
/* app.get("/session", (req,res) => {
  if(req.session.cont){
    req.session.cont++;
    res.send("nos visitaste" + req.session.cont);
  }else{
    req.session.cont = 1;
    res.send("nos visitaste" + 1 );
  }
}); */

/* app.get("/logout", (req,res) => {
  req.session.destroy(err => {
    if(err){
      return res.json({
        status: "Logout Error",
        body: err
      })
    }
    res.send(("Logout ok !!"))
  })
}); */



/* app.get("/privado", auth,(req,res) => {
  res.send("si estás viendo esto es porque ya te logeaste!!")
}); */

app.get("/getCookies", (req, res) => {
  res.send(re.cookies);
  console.log(req.cookies);
});

app.get("/setCookie", (req, res) => {
  res.cookie("cookieTest", "Esta es una info muy poderosa", {maxAge: 10000}).send("Cookie")
});

app.get("/deleteCookie",(req, res) => {
  res.clearCookie("cookieTest").send("Cookie Removed")
});

app.use(cookieParser("code secret"));

const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(__dirname);
  console.log(`Example app listening on http://localhost:${port}`);
});
const io = new SocketServer(httpServer);


connectMongo();
connectSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", handlebars.engine());
app.set("views",path.join (__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/",viewsRouter);
app.use("/chat", messagesRouter);
app.use("/auth", authRouter);

app.get("*",(req,res) => {
  return res.status(404).json({
    status:"error",
    message:"the route is not implemented!!!",
    data:{},
  });
});