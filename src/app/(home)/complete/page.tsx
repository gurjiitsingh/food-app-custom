"use client";

import { useCartContext } from "@/store/CartContext";
import { useEffect } from "react";

const OrderComplete = () => {
  // const { data: session } = useSession();

 const ctx = useCartContext();

useEffect(()=>{
  //  setCartData([]);
  window.localStorage.setItem("cart_product_data", JSON.stringify([]));
    ctx.emptyCart();
},[])


  
  return (
    <div className="bg-slate-100 mp flex flex-col ">
      <div className="flex flex-col md:flex-row gap-6 ">
        <div className="flex flex-col w-[65%]">
       Order Completed
        </div>
       
     
      </div>
    </div>
  );
};

export default OrderComplete;
