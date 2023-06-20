import { Schema, model } from "mongoose";

const Schema = new Schema ({
    user: { type: String, required: true },
    message: { type: String, required: true },
});

export const messagesModel = model("messages", Schema);