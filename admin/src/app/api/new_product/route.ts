import { NextResponse } from "next/server"
import {product} from "@/src/models/product"
import { mongooseConnect } from "@/src/lib/mongoose"


export async function GET(request: Request){
    await mongooseConnect();
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if(id){
        const data = await product.findOne({_id:id});
        return NextResponse.json(data)
    } else{
        const data = await product.find({});
    //console.log('server data: ',data);
    return NextResponse.json(data)
    }
    
}

export async function POST(request: Request) {
    await mongooseConnect();
    const data = await request.json()
    const { title, description, price, images, category, properties} = data;
    const productDoc = await product.create({
        title, description, price, images, category, properties
    })
    console.log('data: ', data)

    return NextResponse.json(productDoc);
}

export async function PUT(request: Request){
    await mongooseConnect();
    const data = await request.json()
    const { _id, title, description, price, images, category, properties} = data;
    await product.updateOne({_id}, {title,description, price, images, category, properties});
    console.log(`Update ${title} done`);
    
    return NextResponse.json(true);
}

export async function DELETE(request: Request){
    await mongooseConnect();
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if(id){
        await product.deleteOne({ _id: id})
        return NextResponse.json(true);
    } else {
        return NextResponse.json(false);
    }
}
