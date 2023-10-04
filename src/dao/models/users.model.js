import { Schema, model } from "mongoose";
//import mongoosePaginate from "mongoose-paginate-v2"

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 100,
    },
    lastName: {
      type: String,
      required: true,
      max: 100,         
      },
      email:{ 
        type:String,
        required: true,
        unique :true,
        max: 100,
      },
      password: {
        type: String,
        required: true,
        max: 100,
      },
      rol: {
        type: String,
        default: "user",
        enum: ["user", "premium", "admin"],
        required: true,
        max: 100,
      },
      canCreateProducts: { 
        type: Boolean,
        default: false },
      age: {
        type: Number,
        required: false,
      },
      cart: {
        type: String,
        required: false,
      },
      document : [
        {
        name: String,
        reference: String
      }
    ],
      last_connection: Date,
    });
    //schema.plugin(mongoosePaginate);
    export const userModel = model("users", schema);    
