import { Schema,model } from "mongoose";

const schema = new Schema({
  code: {type: String},
  purchase_datetime:{ type: Date},
  amount:{type:Number},
  purchaser:{type:String},
  cartId: { type: String, required: true },
	amount: { type: Number, required: true },
  products: [{
      idProduct: {type:Object},
      quantity :{type: Number},
      _id: false,
      total_price: {type: Number}
  }]
},{versionKey: false} 
);

export const TicketModel = model("tickets", schema);