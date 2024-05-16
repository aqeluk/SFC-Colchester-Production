"use client";

import { createClient } from "@/utils/supabase/browser";
import { Order } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { OrderType } from "@/types/types";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Link from "next/link";

export default function RealtimeOrders({
  serverOrders,
}: {
  serverOrders: any;
}) {
  const [orders, setOrders] = useState(serverOrders);
  const supabase = createClient();

  useEffect(() => {
    setOrders(serverOrders);
  }, [serverOrders]);

  useEffect(() => {
    const channel = supabase
      .channel("orderChanges")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Order",
          filter: "userEmail=session?.user?.userEmail",
        },
        (payload) => {
          const orderToBeUpdated = payload.old as Order;
          const updatedOrder = payload.new;
          const existingOrderIndex = orders.findIndex(
            (order: Order) => order.id === orderToBeUpdated.id
          );
          if (existingOrderIndex !== -1) {
            // Update existing order in place
            setOrders((prevOrders: Order[]) => [
              ...prevOrders.slice(0, existingOrderIndex),
              updatedOrder,
              ...prevOrders.slice(existingOrderIndex + 1),
            ]);
          } else {
            // Add the order if it's completely new
            setOrders((prevOrders: Order[]) => [...prevOrders, updatedOrder]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverOrders]);

  return (
    <div className="p-2 lg:px-20 xl:px-40">
      <Table
        color="primary"
        selectionMode="single"
        aria-label="User Order Table"
        classNames={{
          th: "text-xl text-center",
          td: "text-center text-lg",
        }}
      >
        <TableHeader className="text-xl">
          <TableColumn>Order Created</TableColumn>
          <TableColumn>Due Time</TableColumn>
          <TableColumn>Products</TableColumn>
          <TableColumn>Payment Status</TableColumn>
          <TableColumn>Order Status</TableColumn>
          <TableColumn>Price</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((item: OrderType) => (
            <TableRow
              className={`${item.orderStatus !== "delivered" && "bg-blue-50"}`}
              key={item.id}
            >
              <TableCell>
                {item.createdAt.toString().slice(0, 10)}
              </TableCell>
              <TableCell>
                <p>
                  {item.deliveryTime.toString().split("T")[0].slice(-2) +
                    "-" +
                    item.deliveryTime.toString().split("T")[0].slice(5, 7)}
                </p>
                <p>{item.deliveryTime.toString().split("T")[1].slice(0, 5)}</p>
              </TableCell>
              <TableCell>
                {item.products[0].title}
              </TableCell>
              <TableCell>{item.paymentStatus}</TableCell>
              <TableCell>{item.orderStatus}</TableCell>
              <TableCell>
                <p>£{item.totalPrice.toFixed(2)}</p>
                <Button variant="faded">
                  <Link href={`/orders/${item.id}`}>View Order</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
