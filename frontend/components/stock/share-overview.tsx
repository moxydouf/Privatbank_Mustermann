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
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import type { SharePrice } from "@/types/trading";
import type { Stock } from "@/types/stock";

// ADDED: Dummy data for share prices

export function ShareOverview({ stocks }: { stocks: Stock[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Prices Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((share: any) => (
              <TableRow
                key={share.ticker_symbol}
                className="cursor-pointer hover:bg-muted"
              >
                <TableCell className="font-medium">
                  {share.ticker_symbol}
                </TableCell>
                <TableCell>{share.company_name}</TableCell>
                <TableCell className="text-right">${share.ask_price}</TableCell>
                <TableCell
                  className={`text-right ${
                    share.bid_price >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {share.bid_price >= 0 ? (
                    <ArrowUpIcon className="inline w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="inline w-4 h-4 mr-1" />
                  )}
                  {Math.abs(share.bid_price)}%
                </TableCell>
                <TableCell className="text-right">
                  {(share.total_shares / 1000000).toFixed(1)}M
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
