
import express from "express";
import handlebars from "express-handlebars";
import { __dirname, connectMongo } from "./utils.js";
import path from "path";
import {Server as SocketServer} from "socket.io";
import messagesRouter from "./routes/mongo/messages.router.js";
import homeRouter from "./routes/fs/home.fs.router.js";
import websocket from "./websockets/websocket.js";
import productRouter from "./routes/mongo/product.mongo.router.js";
import cartRouter from "./routes/mongo/cart.mongo.router.js";


const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(__dirname);
  console.log(`Example app listening on http://localhost:${port}`);
});
const io = new SocketServer(httpServer);

connectMongo();
websocket(io);

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", handlebars.engine());
app.set("views",path.join (__dirname, "views"));
app.set("view engine", "handlebars");

/* app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter); */
app.use("/", productRouter)
app.use("/cart", cartRouter)
app.use("/",homeRouter);
app.use("/realtimeproducts", homeRouter);
app.use("/chat", messagesRouter);

app.get("*",(req,res) => {
  return res.status(404).json({
    status:"error",
    message:"the route is not implemented!!!",
    data:{},
  });
});