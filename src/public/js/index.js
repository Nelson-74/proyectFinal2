const socket = io();

socket.on("updateProducts", (products)=> {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = product;
        productList.appendChild(li);
    });
});

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    socket.emit("createProduct", productName);
    productForm.reset();
});

const deleteProductForm = document.getElementById("deleteProductForm");
  deleteProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const productId = document.getElementById("productId").value;
    socket.emit("deleteProduct", productId);
    deleteProductForm.reset();
  });