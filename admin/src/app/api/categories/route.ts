import { category } from "@/src/models/categories";
import { mongooseConnect } from "@/src/lib/mongoose"
import { NextResponse } from "next/server"

export async function GET(){
    await mongooseConnect();
    return NextResponse.json(await category.find().populate('parent'));
}

export async function POST(request: Request) {
    await mongooseConnect();
    const data = await request.json();
    const {name, parentCategory, prop} = data;
    console.log('server data: ',data)
    const categoryDoc = await category.create({
        name, 
        parent:parentCategory || undefined, 
        properties: prop,
    });

    return NextResponse.json(categoryDoc)
}

export async function PUT(request: Request){
    await mongooseConnect();
    const data = await request.json();
    const {name, parentCategory, _id, prop} = data;
    await category.updateOne({_id}, {
        name, 
        parent: parentCategory || undefined, 
        properties: prop,
    });

    return NextResponse.json

}

export async function DELETE(request: Request){
    await mongooseConnect();
    const data = await request.json();
    const {id} = data;
    if(id){
        await category.deleteOne({_id: id})
        return NextResponse.json(true);
    } else {
        return NextResponse.json(false);
    }
}
        
