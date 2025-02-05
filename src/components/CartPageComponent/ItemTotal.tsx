"use client";
import React, { useContext } from "react";
import { useCartContext } from "@/store/CartContext";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";

export const ItemTotal = ({ productId }:{productId:string}) => {
 
const { cartData } =  useCartContext();


// console.log("cart data", cartData);
// console.log("this item data", productId);
 // const total = parseInt(item.quantity) * parseFloat(item.price);
  return (
  <div className="p-3 "> {cartData.map((item)=>{
return item.id === productId ? item?.quantity : <></>
  })}</div>
   
 
  );
};


