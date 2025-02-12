'use server'
import React from 'react'
import TableRows from './TableRow'
import {
    Table,
    TableBody,
   // TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
  } from "@/components/ui/table";
import {  fetchCategories } from '@/app/action/category/dbOperations';
import {  categoryTypeArr } from '@/lib/types/categoryType';
type Props = {
  //onClick: React.MouseEventHandler<HTMLButtonElement>
  changeForm: ()=>void
};
const ViewList = async ({changeForm}:Props) => {
  //  const [categories, setCategories ] = useState([])
  async function deleteItem() {
    "use server"; // mark function as a server action (fixes the error)
    changeForm();
   }
   let categories = [] as categoryTypeArr;
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
        {categories.map((item) => {
          // return <TableRows deleteItem={deleteItem}  key={item.id} item={item} />
          return <TableRows   key={item.id} item={item} />
        })}
      </TableBody>
    </Table>
  )
}




export default ViewList