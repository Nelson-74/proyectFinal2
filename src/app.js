import express from "express";
import{productsRouter} from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { __dirname } from "./utils.js";
import path from "path";
import {Server as SocketServer} from "socket.io";
import handlebars from "express-handlebars";
import homeRouter from "./routes/home.router.js";
import websocket from "./websockets/websocket.js";
import { connectMongo } from "utils.js";

const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(__dirname);
  console.log(`Example app listening on http://localhost:${port}`);
});
const io = new SocketServer(httpServer);

websocket(io);

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.engine("handlebars", handlebars.engine());
app.set("views",path.join (__dirname, "views"));
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

// Ruta:  API rest con JSON
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/",homeRouter);
app.use("/realtimeproducts", homeRouter);

connectMongo();
app.get("*",(req,res) => {
  return res.status(404).json({
    status:"error",
    message:"the route is not implemented!!!",
    data:{},
  });
});