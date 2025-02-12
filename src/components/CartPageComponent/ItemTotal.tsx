"use client";
import React from "react";
import { useCartContext } from "@/store/CartContext";
import { cartDataT } from "@/lib/types/cartDataType";


export const ItemTotal = ({ productId }:{productId:string}) => {
 
const { cartData } =  useCartContext();


// console.log("cart data", cartData);
// console.log("this item data", productId);
 // const total = parseInt(item.quantity) * parseFloat(item.price);
  return (
  <div className="p-3 "> {cartData.map((item:cartDataT)=>{
return item.id === productId ? item?.quantity : <></>
  })}</div>
   
 
  );
};


