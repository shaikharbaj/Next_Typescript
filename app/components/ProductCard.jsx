"use client"
import React from 'react'

const ProductCard = () => {
    const HandleSubmit=()=>{
           console.log('hiii');
    }
  return (
    <div>
          <button onClick={()=>HandleSubmit()}>Add To Cart</button>
    </div>
  )
}

export default ProductCard