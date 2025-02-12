'use client'
import React from 'react'
//import { useCartContext } from '@/store/CartContext';
import { IoMdRemove } from 'react-icons/io';
import { ProductType } from '@/lib/types/productType';


export  function ButtonDecCartProduct({product}:{product:ProductType}) {

  // const {  removeCarProductType } =  useCartContext();
//addProductToCart, decCarProductType, decCarProductTypeAll,


  function decItemFromCart(product:ProductType){
    
    // removeCarProductType(product)
    //decCarProductTypeAll(product)
  }

  return (
    <button onClick={()=>decItemFromCart(product)} className='border px-3 py-1 rounded-xl'> <IoMdRemove /></button>
  )
}




// export  function ButtonDecCarProductType({product}) {

 
//   const ctx = useCartContext();

//   function decCarProductType(product){
//     //console.log("ljkklklk", product)
  
//    // ctx.addProduct(product);
//    ctx.decCarProductType(product);
//   }

//   return (
//     <button
//     className=" rounded-sm bg-slate-300 p-1"
//     onClick={decCarProductType.bind(null, product)}
//   >
//     <IoMdRemove />
//   </button>
//   )
// }  
  
  
  
  