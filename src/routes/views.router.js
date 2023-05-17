import express from "express";

const router = express();

router.get("/", (req,res) => {
    res.render("index", []);
});
//conexiones de socket.io
 io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado")}); 

  // Envía la lista de productos a un nuevo cliente conectado
  socket.emit("updateProducts", products);

  // Maneja el evento 'createProduct' al crear un nuevo producto
  socket.on("createProduct", (productName) => {
    products.push(productName);
    io.emit("updateProducts", products);
  });

  // Maneja el evento deleteProduct al eliminar un producto
  socket.on("deleteProduct", (productId) => {
    const index = products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      io.emit('updateProducts', products);
    }
  });

  // Maneja la desconexión de un cliente
   socket.on("disconnect", () => {
    console.log('Cliente desconectado');
  }); 

export default router;