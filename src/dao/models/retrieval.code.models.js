import { Schema, model } from "mongoose";

const retrievalCodeSchema = new Schema({
    token:{ type :String, required: true},
    email: {type: String,required: true,max: 100},
    expire : { type: Date, required: true},

    })
export const RetrievalCodeModel = model("retrieval.code", retrievalCodeSchema);