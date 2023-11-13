import ProductForm from "@/src/components/ProductForm" 
import { Product } from "@/src/models/product"
import { getProduct } from "@/src/lib/get";



export default async function Edit({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  
  return (
    <>
      <h1>Edit Product</h1>
      {
        product &&(
        <ProductForm {...product as Product} />
        )
      }
    </>
  )
}