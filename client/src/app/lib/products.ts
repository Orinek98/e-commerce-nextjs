export async function getProduct(id : string){
  const res = await fetch('http://localhost:3000/api/products?id='+id,{
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
}

export async function getProducts(){
  const res = await fetch('http://localhost:3000/api/products',{
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
}

export async function getFeatured(){
  const res = await fetch('http://localhost:3000/api/featured',{
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
}

export async function getLatest(){
  const res = await fetch('http://localhost:3000/api/latest',{
    cache: 'no-store',
  });
  const data = await res.json()
  return data;
}
  