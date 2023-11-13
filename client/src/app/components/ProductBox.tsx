"use client"
import { Product } from "../models/product"
import Link from "next/link";
import {useContext} from 'react'
import { CartContext } from "./CartContext";

function ProductBox({_id, title, description, price, images} : Product) {
    const uri = '/product/'+_id;
    const {addProduct} = useContext(CartContext);
   
  return (
    <div className="max-w-[200px]">
        <Link href={'/products/product/'+_id}>
            <div className="white_box">
                <img className="max-w-full max-h-[180px] p-1" src={images[0]} />
            </div>

            <div className="mt-1">

                <h2 className="text-sm m-0 font-normal text-black">
                    {title}
                </h2>
            </div>
        </Link>
            
            <div className="flex items-center justify-between mt-1">
                <h2 className="text-lg font-semibold">€{price}</h2>
                <div>
                    <button className='cart_button z-10'
                        onClick={() => addProduct(_id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
  )
}

export default ProductBox