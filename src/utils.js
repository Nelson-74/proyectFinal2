import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";


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

 export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export default __dirname; 

import { connect,Schema,model } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      
      "mongodb+srv://nelsonandrada:CedW4PNucNIwKThz@backendcodernelson.a5badyt.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
} 
