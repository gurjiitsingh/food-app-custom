
import React, { createContext, useContext, useState } from "react";
import { ProductType } from  '@/utils/types'

interface CartContextType {
  counter: number;
  productTotalCost: number;
  cartData: ProductType | {};
  address:{} ;
  addAddress:(ad:{ad:{}})=>void;
  getAddress:()=>{};
  addProduct: ProductType | {};
  addProductToCart:(c:ProductType)=>void
  decCartProduct:(c:ProductType)=>void
  decCartProductAll:(c:ProductType)=>void
   removeCartProduct:(c:ProductType)=>void
   emptyCart:()=>void
}

//const CartContext = createContext<CartContextType | null>(null);

const CartContext = createContext<CartContextType>({ 
  counter: 0,
  productTotalCost:0,
  cartData: [],
  address: {},
  addAddress:()=>{},
  getAddress:()=>{},
  addProduct:()=>{},
  addProductToCart:()=>{},
  decCartProduct:()=>{},
  decCartProductAll:()=>{},
  removeCartProduct:()=>{},
  emptyCart:()=>{}
  
  });

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};


export default CartContext


