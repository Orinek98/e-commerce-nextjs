"use client"
import { useState, createContext, useEffect } from "react";


export const CartContext = createContext({});

function CartContextProvider({children} : {children: React.ReactNode}) {

  const ls =  typeof window !== "undefined" ? window.localStorage : null;
  
  const [cartProducts, setCartProducts] =  useState<string[]>([]);
  
  useEffect(() =>{
      if(cartProducts?.length > 0){
        ls?.setItem('cart', JSON.stringify(cartProducts));
      }
  },[cartProducts])

  useEffect(() =>{
    if(ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart') as string))
    }
  },[])

    
  function addProduct(productId : string){
    setCartProducts(prev  =>[...prev, productId])
  }

  function removeProduct(productId : string){
    setCartProducts(prev =>{
      const pos = prev.indexOf(productId)

      if(pos !== -1){
         return prev.filter((value, index) => index !== pos)
      }

      return prev
    })
  }

  function clearCart(){
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct, clearCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider