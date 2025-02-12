import {
 // Table,
  // TableBody,
  TableCell,
 // TableHead,
 // TableHeader,
  TableRow,
//  TableCaption,
} from "@/components/ui/table";
import { orderMasterDataT } from "@/lib/types";

import Link from "next/link";
function TableRows({ order }:{order:orderMasterDataT}){



  return (
    <TableRow key={order.userId} className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
       <TableCell>{order.userId}--{order.customerName}</TableCell>
      <TableCell>{order.time}</TableCell>
      <TableCell>completed</TableCell>
        <TableCell>$25</TableCell>
      <TableCell><Link href={{ pathname: `/admin/orders/${order.id}`, query: { masterId: order.id, userId: order.userId,addressId:order.addressId } }}>Detail</Link></TableCell>
     </TableRow>
  );
};

export default TableRows;
