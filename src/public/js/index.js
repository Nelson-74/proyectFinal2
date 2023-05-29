const thumbnailsInput = document.getElementById("thumbnail_input");
const priceInput = document.getElementById("price_input");
const codeInput = document.getElementById("code_input");
const stockInput = document.getElementById("stock_input");
const descriptionInput = document.getElementById("description_input");
const categoryInput = document.getElementById("category_input");

const socket = io();

function deleteProductSocket(id) {
  socket.emit("product:delete", id);
}

async function deleteProduct(id) {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      const div = document.getElementById(id);
      div.remove();
    } else {
      alert("Cannot delete product");
    }
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addProductForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const titleInput = document.getElementById("title_input");
    const title = titleInput.value;
    const thumbnails = thumbnailsInput.value;
    const description = descriptionInput.value;
    const price = parseFloat(priceInput.value);
    const code = codeInput.value;
    const stock = parseInt(stockInput.value);

    const product = {
      title,
      thumbnails,
      description,
      price,
      code,
      stock,
    };

    try {
      socket.emit("addProduct", product);
    } catch (error) {
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(product)
        });

        if (response.ok) {
          if (response.hasOwnProperty('payload')) {
            const productData = (await response.json()).payload;
            const container = document.getElementById("product-container");
            const productListElement = document.createElement("div");
            productListElement.innerHTML = `
            <div class="card text-center" id="product-list" >
              <h2>List of Products</h2>
                <div class="container" >
                  <div class="card-group" >
                    <div class="row">
                      <main class="col-sm-auto row "></main>
                        <aside class="col-sm-10 row-4">
                          <div class="product">
                            <h2>${productData.title}</h2>
                              <ul class="list-group">
                                <hr>
                                <img src= "${productData.thumbnails}" alt="">
                                <p><strong>"${productData.description}"</strong></p>
                                <h3>Price: ${productData.price}</h3>
                                <h3>Stock: ${productData.stock}</h3>
                                <p>Code: ${productData.code}</p>
                                <p>Id: ${productData.id}</p>
                              </ul>
                              <button class="delete-btn" onclick="deleteProductSocket('${productData.id}')">Delete</button>
                          </div>
                        </aside>
                    </div>
                  </div>
                </div>
            </div>        
            `;

            container.appendChild(productListElement);
          } else {
            console.log("Response does not contain 'payload' property");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
});

try {
  socket.on("productAdded", (product) => {
    const container = document.getElementById("product-container");
    const productListElement = document.createElement("div");
    productListElement.innerHTML = `
    <div class="card text-center" id="product-list" >
      <h2>List of Products</h2>
        <div class="container" >
          <div class="card-group" >
            <div class="row">
              <main class="col-sm-auto row "></main>
                <aside class="col-sm-10 row-4">
                  <div class="product">
                    <h2>${product.title}</h2>
                      <ul class="list-group">
                        <hr>
                        <img src= "${product.thumbnails}" alt="">
                        <p><strong>"${product.description}"</strong></p>
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
    div.remove();
  });
} catch (error) {}



