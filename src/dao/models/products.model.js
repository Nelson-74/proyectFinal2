import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true},
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  code: { type: String, required: true },
  thumbnail: { type: String, required: true },
  idProduct: { type: Schema.Types.ObjectId, ref: "product", required: true },
  owner: { type: Schema.Types.ObjectId, required : true, ref: "user", default: "admin" }
},{versionKey:false});

productSchema.index({ description: "text" });
productSchema.plugin(mongoosePaginate);
export const productModel = model("product", productSchema);



