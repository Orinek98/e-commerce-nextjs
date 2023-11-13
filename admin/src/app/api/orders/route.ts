import { mongooseConnect } from "@/src/lib/mongoose";
import { NextResponse } from "next/server"
import { order } from "@/src/models/order";

export async function GET(req: Request){
    await mongooseConnect();
    let data = await order.find().sort({createdAt: -1});

    return NextResponse.json(data);
}