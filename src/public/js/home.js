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
};