
import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
// __dirname
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/

import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


import { connect,Schema,model } from "mongoose";
import { Server } from "socket.io";
//import { userModel } from "./DAO/models/usersModel.js";

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://nelsonandrada:CedW4PNucNIwKThz@backendcodernelson.a5badyt.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("Connect to MongoDB!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
} 
//-----------------Socket---------------

import { Server as socketServer} from 'socket.io';
import {MessageModel} from './DAO/models/messagesModel.js';
import  ProductService  from "./services/products.service.js";
import { userModel } from "./DAO/models/usersModel.js";


export const connectSocket = (httpServer) => {
  const socketServer = new Server(httpServer);
  
  socketServer.on("connection", (socket) => { 
    console.log("new user connected");
  
    socket.on("msg_front_to_back", async (message) => {
      const msgCreated = await MessageModel.create(message);
      const msgs = await MessageModel.find({});
      socketServer.emit("todos_los_msgs", msgs);
    });
  
    socket.on("product:create", async (newProduct) => {
      console.log("yaya");
      const product = await ProductService.saveProduct(newProduct);
      socketServer.emit("product:created", product);
    });
  
    socket.on("product:delete", async (id) => {
      console.log(await ProductService.getProductById(parseInt(id)));
      socketServer.emit("product:deleted", id);
    });
  });
}

export function isAdmin(req, res, next) {
  if (req.session?.isAdmin){
    return next();
  }
  return res.status(403).render(error,{error:"Error de autorización"})
}

export function isLogedIn(req, res, next) {
  if (req.session?.email){
    return next();
  }
  return res.status(401).render(error,{error:"Error de autorización"})
}

/* export function isAdmin(req, res, next){
  if(req.session?.admin){
    return next();
  }
  return res.status(401).send("error de autorización");
} */
  