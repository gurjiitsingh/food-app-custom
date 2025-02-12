'use client'
import React from 'react'
import { IoMdRemove } from 'react-icons/io';
import { cartDataT } from '@/lib/types/cartDataType';
import { useCartContext } from '@/store/CartContext';


export  function ButtonDecCartProduct({product}:{product:cartDataT}) {

  const {  removeCartProduct } =  useCartContext();

  
  function decItemFromCart(product:cartDataT){
    
    removeCartProduct(product)
    //decCartProductAll(product)
  }

  return (
    <button onClick={()=>decItemFromCart(product)} className='border px-3 py-1 rounded-xl'> <IoMdRemove /></button>
  )
}




// export  function ButtonDecCartProduct({product}) {

 
//   const ctx = useCartContext();

//   function decCartProduct(product){
//     //console.log("ljkklklk", product)
  
//    // ctx.addProduct(product);
//    ctx.decCartProduct(product);
//   }

//   return (
//     <button
//     className=" rounded-sm bg-slate-300 p-1"
//     onClick={decCartProduct.bind(null, product)}
//   >
//     <IoMdRemove />
//   </button>
//   )
// }  
  
  
  
  