import { ProductManager } from "../productsManager.js";
import { __dirname } from "../utils.js";
import path from "path";


const productsFilePath = path.join(__dirname, "products.json");
const productsManager = new ProductManager(productsFilePath);


export default (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado", socket.id);

    socket.on("addProduct", async (data) => {
      try {
        await productsManager.addProduct(data);
        const updatedProducts = await productsManager.getProducts();
        io.emit("productAdded", updatedProducts);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("productDeleted", async (id) => {
      try {
        await productsManager.deleteProduct(id);
        const updatedProducts = await productsManager.getProducts();
        io.emit("productDeleted",updatedProducts, id);

      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });
};

/* const socketServer = new Server(httpServer);
let msgs = [];
socketServer.on("connection", (socket)=> {
  socket.on("ms_front_to_back", (msg)=>{
    msgs.unshift(msg);
    socketServer.emit("msg_back_to_front", msgs);
  });
}); */
/* socket.on("productAdded", (product) => {
  const container = document.getElementById("product-list");
  const productListElement = document.createElement("div");
  productListElement.innerHTML = `
    <div class="card text-center" id="${product.id}">
      <h2>List of Products</h2>
      <div class="container">
        <div class="card-group">
          <div class="row">
            <main class="col-sm-auto row"></main>
            <aside class="col-sm-10 row-4">
              <div class="product">
                <h2>${product.title}</h2>
                <ul class="list-group">
                  <hr>
                  <img src="${product.thumbnails}" alt="">
                  <p><strong>${product.description}</strong></p>
                  <h3>Price: ${product.price}</h3>
                  <h3>Stock: ${product.stock}</h3>
                  <p>Code: ${product.code}</p>
                  <p>Id: ${product.id}</p>
                </ul>
                <button class="delete-btn" onclick="deleteProductSocket('${product.id}')">Delete</button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  `;
  container.appendChild(productListElement);
});

socket.on("product:deleted", (id) => {
  const div = document.getElementById(id);
  if (div) {
    div.remove();
  }
}); */