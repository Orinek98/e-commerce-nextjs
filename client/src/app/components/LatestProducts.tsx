import Center from "./Center";
import { Product } from "../models/product";
import ProductBox from "./ProductBox";



async function LatestProducts({products} : {products : Product[]}) {
  return (
    <Center>
      <h2 className="text-4xl font-semibold mt-6 mb-4 ">New Arrivals</h2>
      <div className='grid gap-7 grid-cols-[1fr_1fr_1fr] pt-7'>
        {products?.map(prod  =>(
          <ProductBox {...prod}/>
      ))}
      </div>
    </Center>
  )
}

export default LatestProducts