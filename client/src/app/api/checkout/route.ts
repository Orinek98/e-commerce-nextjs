import { NextResponse } from "next/server";
import { mongooseConnect } from "@/app/lib/mongoose";
import { product } from "@/app/models/product";
import { order } from "@/app/models/order";
const stripe = require('stripe')(process.env.STRIPE_SK);


export async function POST(req: Request, res: Response) {
    await mongooseConnect()
    const data = await req.json()
    const {orderInfo, cartList} = data

    const productsIds = cartList.split(',')
    console.log('productIds: ',productsIds)
    const uniqueIds = [...new Set(productsIds)]
    console.log('ids: ',uniqueIds);
    const productsInfos = await product.find({_id: uniqueIds})

    let line_items = []
    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId)
        const quantity = productsIds.filter((id: string) => id === productId)?.length || 0;
        console.log('quantity: ', quantity, 'productInfo.price: ', productInfo.price, 'tot:', quantity*productInfo.price)

        if (quantity > 0 && productInfo){
            
            line_items.push({
                quantity,
                price_data: {
                    currency: 'EUR',
                    product_data: {name: productInfo.title},
                    unit_amount: Math.round(productInfo.price*100),
                },
            })
        }
    }

    const orderDoc = await order.create({
        line_items,
        name: orderInfo.name,
        surname: orderInfo.surname,
        email: orderInfo.email,
        country: orderInfo.country,
        city: orderInfo.city,
        postalCode: orderInfo.postalCode,
        streetAddress: orderInfo.steetAddress,
        region: orderInfo.region,
        paid: false,
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: orderInfo.email,
        success_url: 'http://localhost:3000/cart?success=1',
        cancel_url: 'http://localhost:3000/cart?canceled=1',
        metadata: {orderId: orderDoc._id.toString()},
    })

    console.log(session.url)
    return NextResponse.json({url : session.url});
}