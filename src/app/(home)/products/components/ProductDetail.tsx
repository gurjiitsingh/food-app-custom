'use client'
import { ButtonAddToCartButton } from '@/components/CartPageComponent/ButtonAddToCart'

import React from 'react'

export default function ProductDetail({product}) {
   // console.log("in product detail")
  return (
    <div className='flex flex-col border p-2 rounded-lg'>
<div className=''><img src={product.image} className='w-[150px]' /></div>
<div className=''>{product.name}</div>
<button onClick={()=>{console.log("thes")}}>test</button>
<ButtonAddToCartButton product={product} />

    </div>
   
  )
}
