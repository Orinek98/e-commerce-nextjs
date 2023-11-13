"use client"
import Center from './Center'
import Link from 'next/link';
import {useContext} from 'react'
import { CartContext } from './CartContext';
import { Product } from '../models/product';

function Featured({product} : {product : Product}) {
    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart(){
        addProduct(product._id)
    }

  return (
    <div className='bg-neutral-900 text-white py-12'>
        <Center>
            <div className='grid grid-cols-[0.8fr_1.2fr] gap-10'>
                <div className='flex items-center'>
                    <div>
                        <h1 className='text-5xl mb-4 font-normal'>{product.title}</h1>
                        <p className='text-sm mb-2'>{product.description}</p>
                        <div className='flex gap-2'>
                            <Link className='bg-transparent rounded-lg text-white border border-gray-100 py-1 px-4 cursor-pointer'
                                href={'/products/'+product._id}>
                                Read More
                            </Link>
                            <button className='bg-blue-500 rounded-lg text-white py-1 px-4 cursor-pointer inline-flex items-center gap-1'
                                onClick={addFeaturedToCart}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                Add to Cart
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div className='flex items-center'>
                    <img className='max-w-[300px]' src={product.images[0]} />
                </div>
            </div>
        </Center>
    </div>
  )
}



export default Featured