"use client";
import React, { useContext, useEffect } from "react";
import ProductList from "@/components/MiniCart/productList";
import CartContext from "@/store/CartContext";


const MiniCartContent = () => {
  const { cartData } = useContext(CartContext);

  useEffect(() => {
  //  console.log("incart content", cartData);
  }, [cartData]);
  return (
    <div className="flex flex-col gap-4 bg-white px-3 flex-1 ">
      <div className="py-5 px-12 border-b">
        <h1 className=" text-[1.7rem]">Dein Warenkorb</h1>
      </div>
      <div>
        {cartData.map((item) => {
           return (
           
              <ProductList key={item.id} item={item} />
           
          );
        })}
      </div>
    </div>
  );
};
export default MiniCartContent;


