export async function getOrders(){
    const res = await fetch('http://localhost:3000/api/orders',{
        cache: 'no-store',
      })
    let data = await res.json()

    return data
}

export async function getProduct(id: string){
    const res = await fetch('http://localhost:3000/api/new_product?id='+id,{
        cache: 'no-store',
      })
    let data = await res.json();
    
    return data
}

export async function getAllProducts(){
    const response = await fetch("http://localhost:3000/api/new_product",{
        cache: 'no-store',
      })
    let data = await response.json();
    
    return data
}

