import fs from "fs";

export class CartManager {
    constructor(path) {
        this.path = "src/carts.json";
        let productsFile = [];
        if (fs.existsSync(this.path) && fs.readFileSync(this.path, "utf-8").length > 0) {
        const productsString = fs.readFileSync(this.path, "utf-8")
        productsFile = JSON.parse(productsString)
            this.products = productsFile
        } else {
            fs.writeFileSync(this.path, "[]");
            this.products = []
        }
    }

    async addCart(object) {
  try {
    const data = await this.getCarts();
    const newCart = {
      ...object,
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
    };
    data.push(newCart);
    const productsString = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.path, productsString);
    return newCart;
  } catch (err) {
    console.log(err);
  }
}
async getCartById(id) {
    try {
        const data = await this.getCarts()
        const cart = this.findCartById(data, id);
        if (cart) {
            return cart;
        } else {
            return (`The cart does not exist id: ${id}`);
        }
    } catch (err) {
        console.log(err)
    }
}

findCartById(data, id) {
    return data.find((cart) => cart.id === id);
}
async updateCart(id, productId) {
  try {
      const data = await this.getCarts();
      const cartIndex = data.findIndex((cart) => cart.id == id);
      if (cartIndex !== -1) {
          const cart = data[cartIndex];
          const productIndex = cart.products.findIndex((product) => product.idProduct == productId);
          if (productIndex !== -1) {
              cart.products[productIndex].quantity += 1;
          } else {
              cart.products.push({idProduct: productId, quantity: 1});
          }
          data[cartIndex] = cart;
          const productsString = JSON.stringify(data, null, 2);
          fs.writeFileSync(this.path, productsString);
          return cart.products.find((product) => product.idProduct == productId);
      } else {
          return ("The cart does not exist");
      }
  } catch (err) {
      console.log(err);
  }
}
async getCarts() {
  try {
      await fs.promises.stat(this.path);
  } catch (err) {
      await fs.promises.writeFile(this.path, "[]", "utf-8");
      return "cart created";
  }

  const read = await fs.promises.readFile(this.path, "utf-8");
  const data = JSON.parse(read);
  return data;
}
async deleteCart(id) {
  return this.getCarts().then((data) => {
      const cart = data.find((cart) => cart.id == id);
      if (cart) {
          const index = data.indexOf(cart)
          data.splice(index, 1)
          const productsString = JSON.stringify(data, null, 2)
          return fs.promises.writeFile(this.path, productsString).then(() => {
              return "cart deleted";
          })
      } else {
          return "The cart does not exist";
      }
  }).catch((err) => {
      console.log(err);
  })
}

async deleteAll() {
  return fs.promises.writeFile("src/carts.json", "[]", "utf-8").then(() => {
      return "deleted carts";
  }).catch((err) => {
      console.log(err);
  })
}
}
