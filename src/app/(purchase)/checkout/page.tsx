"use client";
import React from "react";
import CartContent from "@/components/Cart/cartcontent";
import Link from "next/link";
//import { useSession } from "next-auth/react";
import { FaCheckCircle } from "react-icons/fa";
import path from "path";
import Address from './components/Address'
import CartLeft from "@/components/Cart/CartLeft";
const checkout = () => {
  // const { data: session } = useSession();


  return (
    <div className="bg-slate-100 mp flex flex-col ">
      <div className="flex flex-col md:flex-row gap-6 ">
        <div className="flex flex-col w-[65%]">
        <Address />
        </div>
       
       <CartLeft />
      </div>
    </div>
  );
};

export default checkout;
