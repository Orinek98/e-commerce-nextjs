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

export const order = models.order || model("order", orderSchema);