import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [{
    idProduct: { type: Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  }],
});
cartSchema.index({ cartId: 1 });
export const cartModel = model("cart", cartSchema);
