'use server'
import React, { useEffect, useState } from 'react'
import TableRows from './TableRow'


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
  } from "@/components/ui/table";
import { deleteCategory, fetchCategories } from '@/app/action/category/fetchCategories';

const ViewList = async () => {
  //  const [categories, setCategories ] = useState([])


   const categories = await db.select().from(brand)
 // console.log("result ", categories)
// useEffect(()=>{
//   console.log("===sdfsfs===========")
// async function categoryList(){
// // const result = await fetch("http://localhost:3000/api/categories");
// // const data = await result.json();

// const res = await fetchCategories();
// setCategories(res);
// //console.log(data.data.category)
// console.log(res)
//   }
//   categoryList();
 
// },[])
// const categories = await db.select().from(category)
// console.log("result ", categories)



  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden md:table-cell">Name</TableHead>
          <TableHead className="hidden md:table-cell">
            Description
          </TableHead>
          <TableHead className="hidden md:table-cell">Image</TableHead>
          <TableHead className="hidden md:table-cell">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((item: Titem) => {
          return <TableRows  key={item.id} item={item} />
        })}
      </TableBody>
    </Table>
  )
}




export default ViewList