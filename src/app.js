import express from "express";
import{productsRouter} from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import path from "path";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars"
import {Server} from "socket.io";
import viewsRouter from "./routes/views.router.js";


const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.engine("handlebars", handlebars.engine());
app.set("views",path.join (__dirname+ "./views"));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "./public")));
app.use("/",viewsRouter);

// Ruta:  API rest con JSON
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Ruta: html render server side
//app.use("/products", productsHtmlRouter);
//Ruta: Sockets
//app.use("chat", products);






app.get("*",(req,res) => {
  return res.status(404).json({
    status:"error",
    message:"the route is not implemented!!!",
    data:{},
  });
});