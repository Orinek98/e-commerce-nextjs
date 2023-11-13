import { NextResponse } from "next/server";
import { mongooseConnect } from "@/app/lib/mongoose";
import { product } from "@/app/models/product";


export async function GET(){
    await mongooseConnect();
    const data = await product.find({}, null, {sort : {'_id':-1}, limit :10})
    
    return NextResponse.json(data);
}