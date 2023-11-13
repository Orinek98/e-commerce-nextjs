import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
    name: {type: String, required:true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
},
    {timestamps: true}
);

export type User = {
    _id?: string,
    name: string,
    email: string,
    password?: string,
}

export const user = models?.user || model("user", userSchema)