"use client"
import {useState} from "react"

function ProductImages({images} : {images : string[]}) {
    const [activeImg, setActiveImg] = useState(images?.[0])
    
  return (
    <>
        <img className='max-w-[80%] max-h-[80%] mx-auto' src={activeImg} />
        
        <div className='flex mt-4 justify-center grow-0 gap-3'>
            {images?.map(image => (
                <div key={image} onClick={() => setActiveImg(image)} className='w-[30%] p-2 rounded-md cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover: duration-300 '>
                    <img src={image} alt=""/>
                </div>
            ))}
        </div>
    </>
  )
}

export default ProductImages