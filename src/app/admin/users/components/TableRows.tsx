import {
 // Table,
  // TableBody,
  TableCell,
 // TableHead,
 // TableHeader,
  TableRow,
//  TableCaption,
} from "@/components/ui/table";
//import { deleteProduct } from "@/app/action/products/dbOperation";
import { userType } from "@/lib/types/userType";
//import { useRouter  } from "next/navigation";
function TableRows({ user }:{user:userType}){



//  async function handleDelete(user) {
//     //console.log(product);
//   const result = await deleteProduct(user.id, user.image)
// if(result.errors){
//   alert(result.errors)
// }else{
//   // router.push('/admin/products')
//    //   router.refresh()
//       location.reload()
// }

//   }

  return (
    <TableRow key={user.id} className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
       <TableCell>{user.id}</TableCell>
       <TableCell>{user.username}</TableCell>
       <TableCell>{user.email}</TableCell>
       <TableCell>{user.role}</TableCell>
      {/* <TableCell>{user.time}</TableCell> */}
      </TableRow>
  );
};

export default TableRows;
