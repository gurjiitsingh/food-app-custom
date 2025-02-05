'use client'
import { fetchProducts } from '@/app/action/products/dbOperation';
import React, { useEffect, useState } from 'react'
import PageProductDetailComponent from './components/PageProductDetailComponent';
import { CartProvider } from '@/store/CartProvider';
import CartCount from '@/components/CartCount';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
//import { Sidebar } from '@/components/Sidebar';
//import { Sidebar } from '@/components/SidebarFramer';

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

  return (<>
     
    
    <Hero />
  
    {/* <Sidebar /> */}
  <div className='container mx-auto py-5 p-1'>
  <div className='flex flex-col md:flex-row flex-wrap gap-3'> 
    {products.map((product, i)=>{
return (
 
<PageProductDetailComponent key={i} product={product} />) 

    })}
    
   </div>
    </div>
    </>
  )
}
