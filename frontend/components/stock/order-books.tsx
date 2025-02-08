"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { OrderBookEntry } from "@/types/trading";

// ADDED: Dummy order book data

export function OrderBook({ orders }: { orders: OrderBookEntry[] }) {
  // console.log("orders", orders);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Book</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders.slice(0, 7).map((order, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge
                      className={`${
                        order.type === "BUY" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {order.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{order.symbol}</TableCell>
                  <TableCell>${order.price}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        order.type === "BUY" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {" "}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.time).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
