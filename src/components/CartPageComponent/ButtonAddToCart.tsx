'use client'
import React from 'react'
import { useCartContext } from '@/store/CartContext';
import { IoMdAdd } from 'react-icons/io';

export  function ButtonAddToCartButton({product}) {

 
  const ctx = useCartContext();

  function addItemToCart(product){
    //console.log("ljkklklk", product)
  
   // ctx.addProduct(product);
   ctx.addProductToCart(product);
  }

  return (
    <button onClick={()=>addItemToCart(product)} className='border px-3 py-1 rounded-xl'><IoMdAdd /></button>
  )
}
