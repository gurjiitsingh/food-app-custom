"use client";
import React from "react";
import CartContent from "@/components/Cart/cartcontent";
//import Link from "next/link";
//import { useSession } from "next-auth/react";
//import { FaCheckCircle } from "react-icons/fa";
//import path from "path";
import CartLeft from "@/components/Cart/CartLeft";
const Cart = () => {
  // const { data: session } = useSession();


  return (
    <div className="bg-slate-100 px-32 py-32 flex flex-col ">
      <div className="flex flex-col md:flex-row gap-6 ">
        <CartContent />
       <CartLeft />
      </div>
    </div>
  );
};

export default Cart;
