"use client";

type productTableProps = {
  limit?: number;
  title?: string;
};
import { TProduct } from "@/types/products";


import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

//import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import TableRows from "./TableRows";
import { fetchProducts } from "@/app/action/products/dbOperation";
//import FeaturProductUpdate from "./FeaturProductUpdate";

const ListView = ({ title }: productTableProps) => {
  const [productData, setProductData] = useState([]);
var pageNo = 1;
var limit = 10

  useEffect(() => {
    async function fetchProduct(): Promise<any>{


      try {

        const result = await fetchProducts()
        setProductData(result)
      } catch (error) {
        console.log(error)
      }
    
   };
    fetchProduct();
  
  }, []);


  function handleDelete(id:string){
    console.log(id)
  }
  // Sort posts in dec product based on date

//   const sortedproducts: TProduct[] = [...products].sort((a, b) => {
//     return new Date(b.date).getTime() - new Date(a.date).getTime();
//   });

  return (
    <>
      <div className="mt-10 p-2">
        <h3 className="text-2xl mb-4 font-semibold">
          {title ? title : "Products"}
        </h3>
        <div className="bg-slate-50 rounded-lg p-1">
        <Table >
          {/* <TableCaption>Product List</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Product Name</TableHead>
              <TableHead className="hidden md:table-cell">Product Price</TableHead>
              <TableHead className="hidden md:table-cell">Image</TableHead>
             
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData.map((product: TProduct) => {
              return (
                <TableRows product={product} />
              );
            })}
          </TableBody>
        </Table></div>
      </div>
    </>
  );
};

export default ListView;
