"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
//import { useRouter } from "next/navigation";
import {
  // Table,
  // TableBody,
  TableCell,
  // TableHead,
  // TableHeader,
  TableRow,
  // TableCaption,
} from "@/components/ui/table";
//import { deleteCategory } from "@/app/action/category/dbOperations";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { categoryType } from "@/lib/types/categoryType";
export default function TableRows({ item }:{item:categoryType}) {

    
  //const router = useRouter();
  async function handleDelete() {

    if (!confirm("Are you sure?")) return;

   // await deleteCategory(JSON.stringify({id:item.id}));
   
  }

// async function handleUpdate(){
//  // changeForm()
// }


  return (
    <>
      <TableRow key={item.name}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.desc}</TableCell>
        <TableCell>
          <img src={item.image} width={100} height={100} alt={item.name} />
        </TableCell>

        <TableCell>{/* <FeaturitemUpdate /> */}</TableCell>

        <TableCell>
          <p className="flex gap-2">
         <Link href={
          {
            pathname:'/admin/categories',
            query: {
              id:item.id,
               name:item.name,
               desc:item.desc,
               
            },
          }

         }><Button  className="p-1">  <CiEdit /></Button></Link>
            {/* <Button onClick={async () => {await deleteItem("foobar")}} className="p-1">  <CiEdit /></Button> */}
        

          <Button  onClick={handleDelete} className="bg-red-500 p-1">
          <MdDeleteForever className="text-white" />
          </Button>
          </p>
        </TableCell>
      </TableRow>
    </>
  );
}
