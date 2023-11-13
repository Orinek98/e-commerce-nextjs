"use client"
import Header from "../components/Header"
import Center from "../components/Center"
import { CartContext } from "../components/CartContext"
import {useContext, useEffect, useState} from "react"
import { Product } from "../models/product"
import { usePathname, useRouter } from "next/navigation";


function Cart() {
    const router = useRouter();
    const pathname = usePathname();
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext)
    const [products, setProducts] = useState<Product[]>([]);
    const [orderInfo, setOrderInfo] = useState({
        name: '' as string,
        surname: '' as string,
        email:'' as string,
        country: '' as string,
        city: '' as string,
        postalCode: '' as string,
        streetAddress: '' as string,
        region: '' as string,
    });
    const [isSucess, setIsSuccess] = useState(false);

    useEffect(() => {
        if(cartProducts.length > 0){
          getCart()
        } else{
          setProducts([]);
        }
  
      }, [cartProducts])

    async function getCart(){
        const ids = cartProducts
        const res = await fetch('http://localhost:3000/api/cart',{
            method: "POST",
            body: JSON.stringify({
                ids
            })
        })
        const data = await res.json()
        setProducts(data);
    }

    let totalCart = 0
    for (const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0
        totalCart += price as number
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setOrderInfo({
            ...orderInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e : React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        const cartList = cartProducts.join(',');

        const res = await fetch('http://localhost:3000/api/checkout',{
            method: "POST",
            mode: "no-cors",
            headers: {"Content-Type": "application/json",},
            redirect: "follow",
            body: JSON.stringify({
                orderInfo, cartList
            }),
        })
        let data = await res.json();
        router.push(data.url);
    }

    if (isSucess){
        return (
            <>
                <Header />
                <Center>
                    <div className="grid gap-10 grid-cols-[1.3fr_0.7fr] mt-10">
                        <div className="bg-gray-50 p-7 rounded-lg">
                            <h1 className="text-2xl font-semibold mb-2">Thanks for your order!</h1>
                            <p>We wil email you when your order wil be shipped.</p>
                        </div>
                    </div>
                </Center>
            </>
        )
    }

    useEffect(() =>{
        if(typeof window ==='undefined'){
            return
        }
        if(window?.location.href.includes('success')){
            setIsSuccess(true);
            clearCart();
        }
    });

    
  return (
    <>
        <Header />
        <Center>
            <div className="grid gap-10 grid-cols-[1.3fr_0.7fr] mt-10">
                
                <div className="bg-gray-50 p-7 rounded-lg">
                    
                    <h2 className="text-lg font-semibold mb-2">Cart</h2>
                    {!cartProducts?.length && (
                        <div>Your cart is empty</div>
                    )}
                    
                    {products?.length > 0 && (
                        <table className="cart_table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(p =>(
                                    <tr>
                                        <td>
                                            <div className="cart_imagebox">
                                                <img src={p.images[0]} />
                                            </div>
                                            <p className="capitalize max-w-[70%] p-1">{p.title}</p>
                                        </td>
                                        <td>
                                            <button onClick={() => removeProduct(p._id)}>
                                                -
                                            </button>
                                            {cartProducts.filter((id: string) => id === p._id).length}
                                            <button onClick={() => addProduct(p._id)}>
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            €{((cartProducts.filter((id : string) => id === p._id).length)*(p.price as any)).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="pt-2 text-xl">€{totalCart.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="bg-gray-50 p-7 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Order information</h2>
                    
                    
                    
                        <div className="flex gap-1">
                            <input value={orderInfo.name} onChange={handleChange}
                                name="name" id="name"
                                className="cart_input"
                                type="text" placeholder="Name"
                            />
                            <input value={orderInfo.surname} onChange={handleChange}
                                name="surname" id="surname"
                                className="cart_input"
                                type="text" placeholder="Surname"
                            />
                        </div>

                            <input value={orderInfo.email} onChange={handleChange}
                                name="email" id="email"
                                className="cart_input"
                                type="text" placeholder="Email"
                            />
                            <input value={orderInfo.country} onChange={handleChange}
                                name="country" id="country"
                                className="cart_input"
                                type="text" placeholder="Country"
                            />
                            <input value={orderInfo.streetAddress} onChange={handleChange}
                                name="streetAddress" id="streetAddress"
                                className="cart_input"
                                type="text" placeholder="Street Address"
                            />

                        <div className="flex gap-1">
                            <input value={orderInfo.city} onChange={handleChange}
                                name="city" id="city"
                                className="cart_input"
                                type="text" placeholder="City"
                            />
                            <input value={orderInfo.postalCode} onChange={handleChange}
                                name="postalCode" id="postalCode"
                                className="cart_input"
                                type="text" placeholder="Postal Code"
                            />
                        </div>
                            
                        <input value={orderInfo.region} onChange={handleChange}
                            name="region" id="region"
                            className="cart_input"
                            type="text" placeholder="State/Region"
                        />

                        <input type="hidden" name="products" value={cartProducts.join(',')} />
                    
                        <button type="submit" onClick={handleSubmit}
                            className="cart_button w-full block">
                            Continue to payment
                        </button>

                </div>
            </div>
        </Center>
    </>
  )
}

export default Cart