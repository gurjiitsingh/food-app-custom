'use client'
import React from 'react'
import { useCartContext } from '@/store/CartContext';
import { cartDataT } from '@/lib/types/cartDataType';

export default function RemoveFromCartButton({product}:{product:cartDataT}) {

 
  const ctx = useCartContext();

  function removeItemToCart(product:cartDataT){
    //console.log("ljkklklk", product)
  
   // ctx.addProduct(product);
   ctx.removeCartProduct(product);
  }

  return (
    <button onClick={()=>removeItemToCart(product)} className='border px-3 py-1 rounded-xl'>-</button>
  )
}
