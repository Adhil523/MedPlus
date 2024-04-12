'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const TableRowComponent = ({ order, key,setfunction }) => {
  const [selected,setSelected]=useState('')
  const [keyselect,setKeyselect]=useState(null)
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it's zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  
  return (
    <TableRow className={keyselect===key?selected:null} key={key}>
      <TableCell>
        <div
          className="font-medium"
          onClick={() => {
            console.log("Hello");
            setfunction(order);
            setSelected("bg-accent")
            setKeyselect(key)
          }}
        >
          {order.patient}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge className="text-xs" variant="secondary">
          {order.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formattedDate}
      </TableCell>
      <TableCell className="text-right">{order.total}</TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
