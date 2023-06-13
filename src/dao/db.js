/* import mongoose from 'mongoose';

// URL de conexión a la base de datos de MongoDB en Atlas
const dbURI = "mongodb+srv://nelsonandrada:CedW4PNucNIwKThz@backendcodernelson.a5badyt.mongodb.net/?retryWrites=true&w=majority";


// Opciones de configuración de la conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conexión a la base de datos
mongoose.connect(dbURI, options)
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

// Importar los modelos
import Product from "./models/productModel.js";
import Cart from "./models/cartModel.js";
import Message from "./models/messageModel.js";

// Exportar los modelos
export { Product, Cart, Message }; */