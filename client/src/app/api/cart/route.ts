import { mongooseConnect } from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import { product } from "@/app/models/product";

export async function POST(req : Request){
    await mongooseConnect();

    const data = await req.json()
    const {ids} = data
    const res = await product.find({_id: ids})

    return NextResponse.json(res);
}