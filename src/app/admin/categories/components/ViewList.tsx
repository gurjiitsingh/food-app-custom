'use server'
import React, { useEffect, useState } from 'react'
import { db } from '@/--------db'
import { category } from '@/--------db/schema'
import { eq } from 'drizzle-orm';
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
import { deleteCategory, fetchCategories } from '@/app/action/category/dbOperations';

const ViewList = async ({changeForm}) => {
  //  const [categories, setCategories ] = useState([])
  async function deleteItem(itemId: string) {
    "use server"; // mark function as a server action (fixes the error)
    changeForm();
   }
   let categories
 // const categories = await db.select().from(category)
  console.log("in client old",categories);
           try {    
             categories = await fetchCategories()
             console.log("in client new", categories)
            // setCategories(result)
          } catch (error) {
            console.log(error)
          }        
    
     
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden md:table-cell">Name1</TableHead>
          <TableHead className="hidden md:table-cell">
            Description
          </TableHead>
          <TableHead className="hidden md:table-cell">Image</TableHead>
          <TableHead className="hidden md:table-cell">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((item: Titem) => {
          return <TableRows deleteItem={deleteItem}  key={item.id} item={item} />
        })}
      </TableBody>
    </Table>
  )
}




export default ViewList