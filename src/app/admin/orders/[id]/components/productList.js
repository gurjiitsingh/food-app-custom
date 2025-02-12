"use client";
import React from "react";
// import CartContext from "@/store/CartContext";

const ProductList = ({ item }) => {
  // const { addProductToCart, decCartProduct, removeCartProduct } =
  //   useContext(CartContext);

  //   console.log("cart item", item)

  // function addProductToCartNew() {
  //   //console.log("llll")
  //   addProductToCart(item);
  // }

  const total = parseInt(item.quantity) * parseFloat(item.price);
  return (
    <div className="flex flex-row gap-2  justify-between border-b mt-2 rounded-xl">
      <div className="w-[20%]">
        <div className="w-[100px]">
          {" "}
          {/* <Image
            src={item.image}
            width="0"
            height="0"
            sizes="100vw"
            loading="eager"
            priority={true}
            className="w-full h-[100px] rounded-tl-xl rounded-bl-xl"
            alt={item.name}
          /> */}
        </div>
      </div>
      <div className="w-full flex flex-col justify-between gap-2 p-2 ">
        <div className="flex flex-row gap-3  items-start ">
          <div className="text-sm w-[40%] flex items-start ">{item.name}</div>

          <div className="flex gap-2 w-[60%]">
            <div className="text-[1rem] w-[33%] flex items-start justify-end ">
              &euro;{item.price}
            </div>
            <div className="text-[1rem] w-[33%] flex items-start justify-end ">
              X {item.quantity}
            </div>
            <div className="text-[1rem] w-[33%] flex items-start justify-end">
              &euro;{total.toFixed(2)}
            </div>
          </div>
        </div>
        <div> {item.productDesc} </div>

        <div className="flex flex-row justify-between ">
          <div className="flex justify-between items-center gap-2 "></div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
