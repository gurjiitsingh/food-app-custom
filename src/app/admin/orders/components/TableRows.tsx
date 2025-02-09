import {
 // Table,
  // TableBody,
  TableCell,
 // TableHead,
 // TableHeader,
  TableRow,
//  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import { deleteProduct } from "@/app/action/products/dbOperation";
import { useRouter  } from "next/navigation";
function TableRows({ order }){

const router = useRouter();

 async function handleDelete(order) {
    //console.log(product);
  const result = await deleteProduct(order.id, order.image)
if(result.errors){
  alert(result.errors)
}else{
  // router.push('/admin/products')
   //   router.refresh()
      location.reload()
}

  }

  return (
    <TableRow key={order.id} className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
       <TableCell>{order.customerName}</TableCell>
      <TableCell>{order.time}</TableCell>
      <TableCell>completed</TableCell>
        <TableCell>$25</TableCell>
      <TableCell>masala-bs.de</TableCell>
     </TableRow>
  );
};

export default TableRows;
