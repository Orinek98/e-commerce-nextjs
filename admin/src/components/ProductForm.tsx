"use client"
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { Product } from "../models/product"
import Spinner from "./Spinner"

export default function ProductForm({
  _id,
  title:exTitle,
  description:exDescription,
  price:exPrice,
  images:exImages,
  category: exCategory,
  properties: exProperties

} : Product) {

  const [title,setTitle] = useState(exTitle || '');
  const [category, setCategory] = useState(exCategory || '')
  const [productProperties, setProductProperties] = useState(exProperties || {})
  const [description,setDescription] = useState(exDescription || '');
  const [price,setPrice] = useState(exPrice || '');
  const [images,setImages] = useState(exImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([])
  const router = useRouter()

  useEffect(() =>{
    getCategories();
  },[]);

  async function getCategories(){
    let res;
    res = await fetch('http://localhost:3000/api/categories');
    const allCategories = await res.json();
    setCategories(allCategories);
  }

  const saveProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let res
    const path = 'http://localhost:3000/api/new_product';
    console.log(category)
      if(_id){
         //update product
        res = await fetch(path, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id, title, description, price, images, category, properties: productProperties
          })
        })
      } else{
        //create product
        res = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title, description, price, images, category, properties: productProperties
          })
        })
      }
    const result = await res.json()
    console.log(result)
          
    router.replace(`/products`)
  }

  async function uploadImages(ev: any){
    ev.preventDefault();
    const files = ev.target?.files;
    if(files.length > 0) {
      setIsUploading(true);
      try{
        const data = new FormData()
        for(const file of files) {
           data.append('file', file)
        }
        const res = await fetch('http://localhost:3000/api/upload', {
          method: "POST",
          //headers: {'Content-Type' : 'multipart/form-data'},
          body: data
        })
        const r = await res.json();
        setImages(prevImages =>{
          return [...prevImages, ...r.links]
        })
      } catch (e: any) {
          console.error(e);
        }
    }
    setIsUploading(false);
  }
    
    function updateImagesOrder(){
      console.log(arguments)
    }

  function setProductProp(propName, value){
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    })
  }
  
  const propertiesToFill = [];
  if(categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id === category); //selected category
    propertiesToFill.push(...catInfo.properties) //push the property to arrayToFill
    //check for parent category with props
    while(catInfo?.parent?._id) {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent._id);
      propertiesToFill.push(...parentCat.properties)
      catInfo = parentCat //go up to parent -> grand parent etc.. for checking props
    }
  }
    
    return (
          <form onSubmit={saveProduct}>

            <label>Product Name</label>
            <input 
              type='text'
              placeholder="product name"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
            />
  
            <label>Category</label>
            <select value={category} onChange={ev =>setCategory(ev.target.value)}>
              <option value="">Uncategorized</option>
              {categories.length > 0 && categories.map(cat => (
                <option value={cat._id}>{cat.name}</option>
              ))}
            </select>
            {propertiesToFill.length > 0 && propertiesToFill.map(p =>(
              <div className='flex gap-1'>
                <div>{p.name}</div>
                <select value={productProperties[p.name]}
                  onChange={(ev) => setProductProp(p.name, ev.target.value)}>
                  {p.values.map(val =>(
                    <option value={val}>{val}</option>
                  ))}
                </select>
              </div>
            ))}

            <label>Description</label>
            <textarea
              placeholder="description"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
            />
              
              <label>Images</label>
              <div className="mb-2 flex flex-wrap gap-1">
                {!!images?.length && images.map(link =>(
                  <div key={link} className="h-24">
                    <img src={link} alt="" className="rounded-lg" />
                  </div>
                ))}
                {isUploading && (
                  <div className="h-24 p-1 flex items-center">
                    <Spinner />
                  </div>
                )}
                  <label className="w-24 h-24 text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>Upload</div>
                    <input type="file" multiple onChange={uploadImages} className="hidden" />
                  </label>
                  {!images?.length && (
                    <div>No images in this product</div>
                  )}
                </div>
               
              
              <label>Price (in €)</label>
              <input
                type="number" 
                value={price}
                onChange={ev => setPrice(ev.target.value)}
              />
          
              <button
                className="btn-primary"
                type="submit">
                  Save
              </button>
          </form>
    )
  } 