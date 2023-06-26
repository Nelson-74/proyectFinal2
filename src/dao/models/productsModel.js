import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new Schema({
  title: { type: String, required: true, max: 100, unique: true },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true, max: 100 },
  stock: { type: Number, required: true, max: 100 },
  category: { type: String, required: true, max: 100 },
  code: { type: String, required: true, max: 100 },
  thumbnail: { type: String, required: true, max: 100 },
});

productSchema.plugin(mongoosePaginate);
export const productModel = model("products", productSchema);



