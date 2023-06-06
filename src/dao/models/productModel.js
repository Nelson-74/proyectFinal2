import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100, unique: true },
  description: { type: String, required: true, max:100 },
  price: { type: Number, required: true, max:100  },
  stock: { type: Number, required: true, max:100  },
  category: { type: String, required: true, max:100  },
  code: { type: String, required: true, max:100  },
  thumbnail: { type: String, required: true, max:100  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
