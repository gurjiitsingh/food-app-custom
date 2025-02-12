
import  { createContext, useContext } from "react";
//import { cartDataT } from  '@/lib/types/cartDataT'
//import { cartDataTT } from "@/lib/types/cartDataType";
import { cartDataT } from "@/lib/types/cartDataType";
interface CartContextType {
  counter: number;
  productTotalCost: number;
  cartData: cartDataT[] ;
  address:{} ;
  addAddress:{};
  //getAddress:()=>{};
  addProduct: cartDataT | {};
  addProductToCart:(c:cartDataT)=>void
  decCartProduct:(c:cartDataT)=>void
  decCartProductAll:(c:cartDataT)=>void
   removeCartProduct:(c:cartDataT)=>void
   emptyCart:()=>void
}

//const CartContext = createContext<CartContextType | null>(null);

const CartContext = createContext<CartContextType>({ 
  counter: 0,
  productTotalCost:0,
  cartData: [],
  address: {},
  addAddress:()=>{},
 // getAddress:()=>{},
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


