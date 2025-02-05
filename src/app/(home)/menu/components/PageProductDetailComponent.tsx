"use client";
import { ButtonAddToCartButton } from "@/components/CartPageComponent/ButtonAddToCart";
import { ButtonDecCartProduct } from "@/components/CartPageComponent/ButtonDecCartProduct";
import { ItemTotal } from "@/components/CartPageComponent/ItemTotal";
import { CartProvider } from "@/store/CartProvider";
import Link from "next/link";
import React from "react";

export default function PageProductDetailComponent({ product }:{product:any}) {

  return (
    <div className="w-full md:w-[49%] lg:w-[32%] bg-white flex flex-row border  rounded-2xl">
      <Link
        href={{
          pathname: `menu/${product.id}`,
        }}
      >
        <div className="rounded-tl-2xl rounded-bl-2xl">
          <img
            src={product.image}
            className="w-[150px] rounded-tl-2xl rounded-bl-2xl"
          />
        </div>
      </Link>
      <div className="flex flex-col p-3 justify-between">
        <div>{product.name}</div>
        <div className="flex items-center p-1 justify-center  rounded-lg gap-2 fit">
          <div>
          <ButtonDecCartProduct product={product} />
          </div>
          <div className="flex items-center h-full  justify-center w-4"><ItemTotal productId={product.id} /></div>
          
          <div>
          <ButtonAddToCartButton product={product} />
          
          </div>
        </div>
      </div>
    </div>
  );
}
