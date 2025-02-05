"use client";
import Link from "next/link";
import Slider from "react-slick";
import { db } from "@/--------db";
import { product } from "@/--------db/schema";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/action/products/dbOperation";
import Image from "next/image";
import AddToCartButton from "./CartPageComponent/ButtonAddToCart";
import { CartProvider } from "@/store/CartProvider";
import { FaCheckCircle } from "react-icons/fa";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Hero() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProductPics() {
      const productPics = await fetchProducts();

      setProduct(productPics);
    }
    fetchProductPics();
  }, []);
  // bg-red-400
  return (
    <div className="w-full h-screen  mx-auto overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row gap-2 h-full w-full ">
        <div
          className="rotate-[10deg]  rounded-tl-[25%] bg-[#F2F0EC]  -ml-6 lg:ml-0 pt-12 mb-16 -mt-12
        lg:rotate-0 lg:rounded-tl-0 lg:rounded-tl-none  lg:p-0 lg:mb-0 lg:mt-0"
        >
          <div className=" -rotate-[10deg] lg:rotate-0 flex flex-col w-full  lg:mt-[200px] md:pl-20  gap-4">
            <h1 className="w-full md:w-[70%] text-5xl font-extrabold text-[#FF4D4D]">
              Grandios essen - <i>die ganze Woche </i>{" "}
            </h1>
            <h2 className="w-full md:w-[70%] text-lg font-semibold">
              Praktisch, lecker und gesund.
            </h2>

            <ul>
              <li
                label="Deine Mahlzeiten für die Woche – schnell und frisch!"
                className="flex gap-2"
              >
                <span
                  className="icon-module_icon__K4BP- icon-Circle-Check-kale icon-module_icon-small__XoAT0"
                  label="Deine Mahlzeiten für die Woche – schnell und frisch!"
                >
                  <FaCheckCircle className="text-red-500" size={20} />
                </span>

                <span className="txt-p-1 txt-p-1-s">
                  Deine Mahlzeiten für die Woche – schnell und frisch!
                </span>
              </li>

              <li
                label="Deine Mahlzeiten für die Woche – schnell und frisch!"
                className="flex gap-2"
              >
                <span
                  className="icon-module_icon__K4BP- icon-Circle-Check-kale icon-module_icon-small__XoAT0"
                  label="Deine Mahlzeiten für die Woche – schnell und frisch!"
                >
                  <FaCheckCircle className="text-red-500" size={20} />
                </span>

                <span className="txt-p-1 txt-p-1-s">Jederzeit kündbar.</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[900px] lg:p-b-12">
          <div className=" bg-slate-500  lg:translate-x-32 lg:translate-y-16 lg:-mt-60 lg:-mr-60 ">
            <img
              className="w-full h-full lg:rotate-[10deg]   lg:rounded-bl-[25%]"
              src="/New_Home_Hero_WidePhoto_desktop.webp"
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
