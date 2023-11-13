import { NextResponse } from "next/server";
import { mongooseConnect } from "@/app/lib/mongoose";
import { product } from "@/app/models/product";



export async function GET(){
    const id = process.env.FEATURED_PRODUCT_ID;
    await mongooseConnect();
    const data = await product.findById({_id : id});
    return NextResponse.json(data);
}