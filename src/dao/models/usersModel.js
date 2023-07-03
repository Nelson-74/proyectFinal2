import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
      isAdmin: {
        type: Boolean,
        required: true,
      }
    });
    schema.plugin(mongoosePaginate);
    export const userModel = model("users", schema);    
