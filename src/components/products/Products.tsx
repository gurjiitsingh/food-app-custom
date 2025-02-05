'use client'
import { fetchProducts } from '@/app/action/products/dbOperation';
import React, { useEffect, useState } from 'react'
import ProductDetail from './components/ProductDetail';
import { CartProvider } from '@/store/CartProvider';
import CartCount from '@/components/CartCount';
import Header from '@/components/Header';

export default function page() {

   // const products = await fetchProducts();
   const [products, setProduct] = useState([]);

   useEffect(() => {
     async function fetchProductPics() {
       const productPics = await fetchProducts();
    
       setProduct(productPics);
     }
     fetchProductPics();
   }, []);

  return (
  <div className='px-15 py-5'>
  <div className='grid grid-cols-4'> 
    {products.map((product, i)=>{
return (<>
 <div className='w-20 h-20'>
<ProductDetail key={i} product={product} /></div></>) 

    })}
    
   </div>
    </div>
  )
}
