import React from 'react'
import Header from '../components/Header'
import Center from '../components/Center'
import { mongooseConnect } from '../lib/mongoose'
import { Product, product } from '../models/product'
import { getProducts } from '../lib/products';
import ProductBox from '../components/ProductBox'

async function productsPage() {
    const products : Product[] = await getProducts()
  return (
    <>
        <Header />
        <Center>
            <h2 className="text-4xl font-semibold mt-6 mb-4 ">All Products</h2>
            <div className='grid gap-7 grid-cols-[1fr_1fr_1fr] pt-7'>
                {products?.map(prod  =>(
                    <ProductBox {...prod}/>
                ))}
            </div>
        </Center>
    </>
  )
}

export default productsPage