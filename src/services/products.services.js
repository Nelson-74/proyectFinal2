import { Product } from '../dao';

function getAllProducts() {
  return Product.find();
}

function getProductById(id) {
  return Product.findById(id);
}

function addProduct(product) {
  const newProduct = new Product(product);
  return newProduct.save();
}

// ...otros métodos del servicio
