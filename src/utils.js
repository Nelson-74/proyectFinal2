import multer from "multer";

import { logger} from "./utils/logger.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public"));
    
    let uploadFolder = "public/documents"; //carpeta para docs por defecto
    if(file.fieldname === "profileImage"){
      uploadFolder = "public/profiles"; //carpeta para imágenes de perfil 
    }else if(file.fieldname === "productImage"){
      uploadFolder = "public/products"; // carpeta img de prod.
    }
    cb(null, uploadFolder);
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
import { userModel } from "./DAO/models/users.model.js";

export async function connectMongo() {
  try {
    await connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@backendcodernelson.a5badyt.mongodb.net/ecommerce?retryWrites=true&w=majority`
    );
    logger.info("Connected to MongoDB!");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    throw new Error("Unable to connect to the database");
  }
}
//-----------------Socket---------------

import { Server as SocketServer} from "socket.io";
import {MessageModel} from "./DAO/models/messages.model.js";
import  {ProductService}  from "./services/products.service.js";

export const connectSocket = (httpServer) => {
  const socketServer = new SocketServer(httpServer);
  
  socketServer.on("connection", (socket) => { 
    logger.info("new user connected");
  
    socket.on("msg_front_to_back", async (message) => {
      // Procesa y almacena el mensaje en MongoDB
      const msgCreated = await MessageModel.create(message);
      const msgs = await MessageModel.find({});
      socketServer.emit("todos_los_msgs", msgs);
    });
    
    socket.on("product:create", async (newProduct) => {
      logger.info("product created");
      const product = await ProductService.saveProduct(newProduct);
      socketServer.emit("product:created", product);
    });
  
    socket.on("product:delete", async (id) => {
      logger.info(await ProductService.getProductById(parseInt(id)));
      socketServer.emit("product:deleted", id);
    });
  });
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin){
    return next();
  }else{
    return res.status(403).render("error", "Error de autorización, no tienes permisos de administrador");
  }
}

export function isLoggedIn(req, res, next) {
  if (req.session?.email){
    return next();
  }
  return res.status(401).render(error,{error:"Error de autenticación"});
}

export function isUser(req, res, next){
  if(req.user){
    return next();
  }else{
  return res.status(401).send("Error de autorización, debes iniciar sesión");
  }
}






