import { Date } from "mongoose";
import {Schema, models, model} from "mongoose";

const orderSchema = new Schema({
    line_items: Object,
    name: String,
    surname: String,
    email: String,
    country: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    region: String,
    paid: Boolean,
}, {
    timestamps: true,
});

export type Order ={
    _id: string
    line_items: Object[],
    name: String,
    surname: String,
    email: String,
    country: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    region: String,
    paid: Boolean,
    createdAt: string
}

export const order = models.order || model("order", orderSchema);
