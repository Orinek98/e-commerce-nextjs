"use client"
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation"
import { Product } from "@/src/models/product"



export default function Delete({ params }: { params: { id: string } }) {
  let [product, setProduct] = useState<Product>(); 
  const router = useRouter()
  const path = 'http://localhost:3000/api/new_product?id='+params.id
  
  const getProduct = async () =>{
    const response = await fetch(path);
    setProduct(await response.json());
  }
    

  const deleteProduct = async () =>{
    const res = await fetch(path, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    },
  })
  router.push(`/products`);
}

  useEffect(() =>{
    getProduct()
  },[])
  
  return (
  <>
    {product && (
      <h1>Do you really want to delete "{product.title}"</h1>
      )
    }
    <div className="flex gap-2 justify-center"> 

      <button className="btn-red" onClick={() => deleteProduct()}>
        Yes
      </button>
      
      <button className="btn-default" onClick={()=> router.push(`/products`)}>
        No
      </button>
    </div>
  </>
  )
}