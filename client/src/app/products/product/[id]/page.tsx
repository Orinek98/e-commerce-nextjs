import Center from '@/app/components/Center'
import Header from '@/app/components/Header'
import { Product } from '@/app/models/product'
import { getProduct } from '@/app/lib/products'
import ProductImages from '@/app/components/ProductImages'
import CartButton from '@/app/components/CartButton'

async function productPage({params} : {params : {id: string} }) {
    const product = await getProduct(params.id)
  return (
    <>
        <Header />
        <Center>
            <div className="grid grid-cols-[1.2fr_0.8fr] gap-10 mt-10">
                <div className='bg-slate-50 rounded-md p-6'>
                    <ProductImages images={product.images} />
                </div>
                <div>
                    <h1 className='text-4xl font-semibold mt-6 mb-4'>{product.title}</h1>
                    <p className='text-md mb-3 '>{product.description}</p>
                    <div className="flex w-[100%] justify-between gap-5">
                        <div>
                            <CartButton id={product._id} />
                        </div>
                        <h2 className='text-3xl'>€{product.price}</h2>
                    </div>
                </div>
            </div>
        </Center>
    </>
  )
}

export default productPage