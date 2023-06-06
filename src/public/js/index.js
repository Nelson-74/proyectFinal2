document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addProductForm");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const title = titleInput.value;

    const thumbnailInput = document.getElementById("thumbnail");
    const thumbnails = thumbnailInput.value;

    const descriptionInput = document.getElementById("description");
    const description = descriptionInput.value;

    const priceInput = document.getElementById("price");
    const price = parseFloat(priceInput.value);

    const codeInput = document.getElementById("code");
    const code = codeInput.value;

    const stockInput = document.getElementById("stock");
    const stock = parseInt(stockInput.value);

    const product = {
      title,
      thumbnails,
      description,
      price,
      code,
      stock,
    };

    socket.emit("addProduct", product);

    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Cannot add product");
        }
      })
      .then(data => {
        const productData = data.payload;
        const container = document.getElementById("product-list");
        const productListElement = document.createElement("div");
        productListElement.innerHTML = `
          <div class="card text-center" id="${productData.id}">
            <h2>List of Products</h2>
            <div class="container">
              <div class="card-group">
                <div class="row">
                  <main class="col-sm-auto row"></main>
                  <aside class="col-sm-10 row-4">
                    <div class="product">
                      <h2>${productData.title}</h2>
                      <ul class="list-group">
                        <hr>
                        <img src="${productData.thumbnails}" alt="">
                        <p><strong>${productData.description}</strong></p>
                        <h3>Price: ${productData.price}</h3>
                        <h3>Stock: ${productData.stock}</h3>
                        <p>Code: ${productData.code}</p>
                        <p>Id: ${productData.id}</p>
                      </ul>
                      <button class="delete-btn" onclick="deleteProduct('${productData.id}')">Delete</button>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        `;

        container.appendChild(productListElement);
      })
      .catch(error => {
        console.log(error);
        alert("Cannot add product");
      });
  });
});
function deleteProduct(id) {
  fetch(`/api/products/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        const div = document.getElementById(id);
        if (div) {
          div.remove();
        }
      } else {
        throw new Error("Cannot delete product");
      }
    })
    .catch(error => {
      console.log(error);
      alert("Cannot delete product");
    });
  }






