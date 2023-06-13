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
        return "existing code";
      }
      if (
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
  description : "Zapatillas de mujer",
  code : "3557",
  price : 57000,
  status:true,
  stock: 15,
  category: "Zapatillas de mujer",
  thumbnail : "https://i.ibb.co/31pj7gg/zapatilla-Mujer1.jpg"
}

const product2 ={
  title: "Zapatillas ultraboost 1.0",
  description : "zapatillas hombre",
  code : "9542",
  price : 60000,
  status:true,
  stock: 9,
  category: "Zapatillas de hombre",
  thumbnail : "https://i.ibb.co/3mgRdZK/zapatillas-Hombre.jpg"
}

const product3 ={
  title: "Zapatillas terrex Ax4",
  description : "zapatillas de mujer",
  code : "3435",
  price : 47000,
  status:true,
  stock: 5,
  category: "Zapatillas de mujer",
  thumbnail : "https://i.ibb.co/VjmKmy5/zapatilla-Mujer2.jpg"
}
const product4 ={
  title: " Zapatillas trail running terrex",
  description : "zapatillas outdoor de hombre",
  code : "1123",
  price : 45000,
  status:true,
  stock: 7,
  category: "Zapatillas de hombre",
  thumbnail : "https://i.ibb.co/NZZHv3y/zapatillas-Hombre2.jpg"
}

const product5 ={
  title: "Remera fram print ",
  description : "remera de mujer",
  code : "3840",
  price : 13000,
  status:true,
  stock: 25,
  category: "Remera de mujer",
  thumbnail : "https://i.ibb.co/6RFw2sr/remera-Mujer.jpg"
}

const product6 ={
  title: "Remera aeroready",
  description : "remera de hombre",
  code : "4648",
  price : 12000,
  status:true,
  stock: 11,
  category: "Remera de hombre",
  thumbnail : "https://i.ibb.co/Cnn52BL/remera-Hombre.jpg"
}
const product7 ={
  title: "Campera premium slim ",
  description : "Campera para mujer",
  code : "3456",
  price : 58000,
  status:true,
  stock: 3,
  category: "Campera de mujer",
  thumbnail : "https://i.ibb.co/7nSW35F/campera-Mujer.jpg"
}
const product8 ={
  title: "Campera térmica",
  description : "campera para hombre",
  code : "9920",
  price : 69000,
  status:true,
  stock: 4,
  category: "Campera para hombre ",
  thumbnail : "https://i.ibb.co/g7wQ8mq/campera-Hombre.jpg"
}

const product9 ={
  title: "Camiseta alternativa selección",
  description : "camiseta para mujer",
  code : "2223",
  price : 21000,
  status:true,
  stock: 9,
  category: "Remera para mujer ",
  thumbnail : "https://i.ibb.co/Ld92BG4/camiseta-Seleccion-Mujer.jpg"
}
const product10 ={
  title: "Chomba de entremamiento Boca",
  description : "chomba para hombres",
  code : "1974",
  price : 22000,
  status:true,
  stock: 10,
  category: "Remera de hombre ",
  thumbnail : "https://i.ibb.co/LzTSr0G/chomba-Boca.jpg"
}

const product11 ={
  title: "Zapatillas adidas grand court",
  description : "zapatillas para niñas",
  code : "1435",
  price : 23000,
  status:true,
  stock: 8,
  category: "Zapatillas para niñas ",
  thumbnail : "https://i.ibb.co/hV7DbSL/zapatillas-Ni-a.jpg"
}

const product12 ={
  title: "Conjunto buzo con capucha",
  description : "conjunto para niños",
  code : "7890",
  price : 24000,
  status:true,
  stock:5, 
  category: "Conjunto para niños ",
  thumbnail : "https://i.ibb.co/By6vj72/conjunto-Ni-os.jpg"
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