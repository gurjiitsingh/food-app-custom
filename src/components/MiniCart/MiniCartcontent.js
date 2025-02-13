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
      <div className="py-1 px-3 border-b">
        <h1 className=" text-[1.1rem]">Dein Warenkorb</h1>
      </div>
      <div><div className='max-h-[300px] overflow-y-auto'>
        {cartData.map((item) => {
           return (
           
              <ProductList key={item.id} item={item} />
           
          );
        })}
        </div>
      </div>
    </div>
  );
};
export default MiniCartContent;


