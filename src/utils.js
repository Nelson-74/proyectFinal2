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

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export default __dirname;