import { Order } from '@/src/models/order'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]/options'
import { getOrders } from '@/src/lib/get'

async function OrdersPage() {
    const session = await getServerSession(authOptions)
    const orders : Order[] = await getOrders()

    if(session?.user.role==="admin"){
        return (
            <table className='basic'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Recipient</th>
                        <th>Products</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((o: Order) =>(
                        <tr key={o._id}>
                            <td>{o.createdAt}</td>
                            <td>
                                {o.name} {o.surname} {o.email}<br />
                                {o.city} {o.postalCode} {o.country} <br />
                                {o.streetAddress}
                            </td>
                            <td>
                                {o.line_items.map(l =>(
                                    <>
                                        {l.price_data.product_data.name} x {l.quantity} <br/>
                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
      )
    } else {
        return (
            <div>Not allowed</div>
        )
    }
}

export default OrdersPage