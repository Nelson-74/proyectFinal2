import fs from "fs";

export class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf8");
      
        return JSON.parse(data);
      }
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async addProduct(product) {
    try {
      const data = await this.getProducts();      
      const toLookForCode = data.find((p) => p.code === product.code);
      if(toLookForCode){
        return "existing code"
      }if (
        !product.title||
        !product.description||
        !product.code||
        !product.price||
        !product.status||
        !product.stock||
        !product.category||
        !product.thumbnail
    ){
        return "missing fields to load";
      }
      const lastDataId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const newProduct = { ...product, id: lastDataId };
      data.push(newProduct);
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return newProduct;
    } catch (error) {
      throw new Error("Error adding product");
    }
  }

  async getProductById(id) {
    try {
      const data = await this.getProducts();
      const productFound = data.find((p) => p.id === id);
      if (!productFound) {
        throw new Error("The product with the requested id was not found");
      }
      return productFound;
    } catch (error) {
      throw new Error("Error getting product by id");
    }
  }

  async updateProduct(id, newData) {
    try {
      const data = await this.getProducts();
      const index = data.findIndex((p) => p.id === id);
      if (index !== -1) {
        data[index] = { ...newData, id };
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
        return data[index];
      } else {
        return "product not found";
      }
    } catch (error) {
      throw new Error("Error updating the product");
    }
  }

  async deleteProduct(id) {
    try {
      const data = await this.getProducts();
      const index = data.findIndex((p) => p.id === id);
      if (index !== -1) {
        data.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Error deleting the product");
    }
  }
}

const productManager = new ProductManager();


const product1 ={
  title: "Ultraboost 5.0 Dna W",
  description : "zapatillas de mujer",
  code : "3557",
  price : 57000,
  status:true,
  stock: 15,
  category: "Zapatillas de mujer",
  thumbnail : "sin datos"
}

const product2 ={
  title: "zapatillas ultraboost 1.0",
  description : "zapatillas hombre",
  code : "9542",
  price : 60000,
  status:true,
  stock: 9,
  category: "Zapatillas de hombre",
  thumbnail : "sin datos"
}

const product3 ={
  title: "zapatillas terrex Ax4",
  description : "zapatillas de mujer",
  code : "3435",
  price : 47000,
  status:true,
  stock: 5,
  category: "Zapatillas de mujer",
  thumbnail : "sin datos"
}
const product4 ={
  title: " zapatillas trail running terrex",
  description : "zapatillas outdoor de hombre",
  code : "1123",
  price : 45000,
  status:true,
  stock: 7,
  category: "Zapatillas de hombre",
  thumbnail : "sin datos"
}

const product5 ={
  title: "remera fram print ",
  description : "remera de mujer",
  code : "3840",
  price : 13000,
  status:true,
  stock: 25,
  category: "Remera de mujer",
  thumbnail : "sin datos"
}

const product6 ={
  title: "remera aeroready",
  description : "remera de hombre",
  code : "4648",
  price : 12000,
  status:true,
  stock: 11,
  category: "Remera de hombre",
  thumbnail : "sin datos"
}
const product7 ={
  title: "campera premium slim ",
  description : "Campera para mujer",
  code : "3456",
  price : 58000,
  status:true,
  stock: 3,
  category: "Campera de mujer",
  thumbnail : "sin datos"
}
const product8 ={
  title: "campera térmica",
  description : "campera para hombre",
  code : "9920",
  price : 69000,
  status:true,
  stock: 4,
  category: "campera para hombre ",
  thumbnail : "sin datos"
}

const product9 ={
  title: "camiseta alternativa selección",
  description : "camiseta para mujer",
  code : "2223",
  price : 21000,
  status:true,
  stock: 9,
  category: "Remera para hombre ",
  thumbnail : "sin datos"
}
const product10 ={
  title: "chomba de entremamiento Boca",
  description : "chomba para hombres",
  code : "1974",
  price : 22000,
  status:true,
  stock: 10,
  category: "Remera de hombre ",
  thumbnail : "sin datos"
}

const product11 ={
  title: "zapatillas adidas grand court",
  description : "zapatillas para niñas",
  code : "1435",
  price : 23000,
  status:true,
  stock: 8,
  category: "zapatillas para niñas ",
  thumbnail : "sin datos"
}

const product12 ={
  title: "conjunto buzo con capucha",
  description : "conjunto para niños",
  code : "7890",
  price : 24000,
  status:true,
  stock:5, 
  category: "conjunto para niños ",
  thumbnail : "sin datos"
} 

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
productManager.addProduct(product5);
productManager.addProduct(product6);
productManager.addProduct(product7);
productManager.addProduct(product8);
productManager.addProduct(product9);
productManager.addProduct(product10);
productManager.addProduct(product11);
productManager.addProduct(product12); 

console.log(productManager.getProducts());