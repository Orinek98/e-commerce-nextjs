import mongoose from "mongoose"
import { Schema, model, models } from "mongoose"

const categorySchema = new Schema({
    name: {type: String, required:true},
    parent: {type: mongoose.Types.ObjectId, ref:'category'},
    properties: [{type:Object}]
})

export type Category = {
    _id?: string,
    name: string,
    parent?: Category,
    properties?: Object[]
}

export const category = models?.category || model("category", categorySchema)