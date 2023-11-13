import Header from './components/Header'
import Featured from './components/Featured'
import LatestProducts from './components/LatestProducts'
import { Product } from './models/product';
import { getFeatured, getLatest } from './lib/products';

export default async function Home() {
  const latestProduct : Product[] = await getLatest();
  const featProd = await getFeatured()

  return (
    <main>
      <Header />
      <Featured product={featProd}/>
      <LatestProducts products={latestProduct} />
    </main>
  )
}