import mongoose, { Schema, model, models } from "mongoose"
import { Category } from "./categories";

const productSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    images: {type: [String]},
    category: {type: mongoose.Types.ObjectId, ref:'category'},
    properties: {type: Object}

}, {
  timestamps: true,
})


export type Product = {
    _id?: string,
    title: string,
    description: string,
    price: string,
    images: string[],
    category?: Category,
    properties: {},
  }


export const product = models.product || model("product", productSchema);