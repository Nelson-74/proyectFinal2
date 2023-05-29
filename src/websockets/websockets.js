import { ProductManager } from "../productsManager.js";
const path = "../products.json";

const productsManager = new ProductManager(path);

export default (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado", socket.id);

    // Maneja el evento "newProduct" para crear un nuevo producto
    socket.on("newProduct", async (data) => {
      try {
        await productsManager.addProduct(data);
        const updatedProducts = await productsManager.getProducts();
        io.emit("updateProducts", updatedProducts);
      } catch (error) {
        console.log(error);
      }
    });

    // Maneja la desconexión de un cliente
    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};
