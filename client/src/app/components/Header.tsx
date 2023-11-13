"use client"
import Link from 'next/link'
import Center from './Center'
import {useContext} from 'react'
import { CartContext } from './CartContext'

export default function Header() {
  const {cartProducts} = useContext(CartContext)
  return (
    <header className='bg-neutral-900'>
        <Center>
            <div className='flex justify-between py-5'>
                <Link className='basic_link' href={'/'}>Ecommerce</Link>
                <nav className='flex gap-4'>
                    <Link className='nav_link' href={'/'}>Home</Link>
                    <Link className='nav_link' href={'/products'}>All Products</Link>
                    <Link className='nav_link' href={'/categories'}>Categories</Link>
                    <Link className='nav_link' href={'account'}>Account</Link>
                    <Link className='nav_link' href={'/cart'}>Cart ({cartProducts.length})</Link>
                </nav>
            </div>
        </Center>
    </header>
  )
}
