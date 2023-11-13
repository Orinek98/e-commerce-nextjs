import { NextResponse } from "next/server";
import { mongooseConnect } from "@/app/lib/mongoose";
import { product } from "@/app/models/product";


export async function GET(req: Request){
    await mongooseConnect();
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if(id){
        
        const data = await product.findOne({_id:id});
        return NextResponse.json(data)
    } else {
        
        const data = await product.find({}, null, {sort : {'_id':1}})
        return NextResponse.json(data);
    }
}