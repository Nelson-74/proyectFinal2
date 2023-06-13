import { Schema,model } from "mongoose";

const productSchema = new Schema({
  productId: {type : Schema.Types.ObjectId, ref: "products"},
  qty: {type: Number},
}, 
{_id: false}
);

cartSchema = new Schema({
  products : [productSchema]
}, {
  versionKey : false,
});


export const cartModel = model("carts", Schema);