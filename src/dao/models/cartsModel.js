import { Schema,model } from "mongoose";

const cartSchema = new Schema({
  products: {
    type : [{
      product: {
        type: Schema.Types.ObjectId, 
      ref: "products",
    required: true},
  qty: {
    type: Number,
    required: true,
    min: 1,
  default: 1 
},
_id: false
}], 
default: [],
required:true
},
});


export const cartModel = model("carts", cartSchema );