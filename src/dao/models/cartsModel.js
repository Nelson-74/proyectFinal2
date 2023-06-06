import { Schema,model } from "mongoose";

const productSchema = newSchema({
    productId: {type : Schema.Types.ObjectId, ref: "products"},
    quantity: {type: Number}
}, {_id: false});

const cartSchema = newSchema({
    
})