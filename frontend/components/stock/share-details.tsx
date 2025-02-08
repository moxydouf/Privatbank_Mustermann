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
import {
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  TrendingDown,
  MinusIcon,
} from "lucide-react";
import type { HistoricalPrice } from "@/types/trading";

// ADDED: Dummy historical data generator
function generateHistoricalData(basePrice: number): HistoricalPrice[] {
  const data: HistoricalPrice[] = [];
  let currentPrice = basePrice;

  for (let i = 9; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    currentPrice = currentPrice * (1 + (Math.random() * 0.06 - 0.03));
    data.push({
      date: date.toISOString().split("T")[0],
      price: Number(currentPrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }

  return data.reverse(); // Most recent first
}

interface PriceChangeIndicatorProps {
  currentPrice: number;
  previousPrice: number;
}

function PriceChangeIndicator({
  currentPrice,
  previousPrice,
}: PriceChangeIndicatorProps) {
  const difference = currentPrice - previousPrice;
  const percentageChange = (difference / previousPrice) * 100;

  if (difference === 0) {
    return (
      <div className="flex items-center text-gray-500">
        <Minus className="w-4 h-4 mr-1" />
        <span>0.00%</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center ${
        difference > 0 ? "text-green-600" : "text-red-600"
      }`}
    >
      {difference > 0 ? (
        <ArrowUp className="w-4 h-4 mr-1" />
      ) : (
        <ArrowDown className="w-4 h-4 mr-1" />
      )}
      <span>{Math.abs(percentageChange).toFixed(2)}%</span>
    </div>
  );
}

function TrendIndicator({ data }: { data: HistoricalPrice[] }) {
  const firstPrice = data && data[0].price;
  const lastPrice = data && data[data.length - 1].price;
  const trend = lastPrice - firstPrice;

  return (
    <div
      className={`flex items-center ${
        trend > 0
          ? "text-green-600"
          : trend < 0
          ? "text-red-600"
          : "text-gray-500"
      }`}
    >
      {trend > 0 ? (
        <TrendingUp className="w-5 h-5" />
      ) : trend < 0 ? (
        <TrendingDown className="w-5 h-5" />
      ) : (
        <MinusIcon className="w-5 h-5" />
      )}
    </div>
  );
}

export function ShareDetails({ selectedStock, selectedStockDetails }: any) {
  // ADDED: Generate dummy data for the selected share
  const historicalData = generateHistoricalData(185.92);
  const latestPrice =
    selectedStockDetails &&
    selectedStockDetails[selectedStockDetails.length - 1].price;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">
          {selectedStock.ticker_symbol} - Last 10 Days
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg">
            ${latestPrice}
          </Badge>
          <TrendIndicator data={selectedStockDetails} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="">Opening Price</TableHead>
              <TableHead className="">Change</TableHead>
              <TableHead className="">Volume</TableHead>
              <TableHead className="">Daily Range</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedStockDetails &&
              selectedStockDetails.map((day: any, index: number) => {
                const previousDay =
                  index > 0 ? selectedStockDetails[index - 1] : null;
                const lowPrice = day.price * 0.98; // Simulated low price
                const highPrice = day.price * 1.02; // Simulated high price

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="">${day.price}</TableCell>
                    <TableCell className="">
                      {previousDay && (
                        <PriceChangeIndicator
                          currentPrice={day.price}
                          previousPrice={previousDay.price}
                        />
                      )}
                    </TableCell>
                    <TableCell className="">{day.volume / 1000000}M</TableCell>
                    <TableCell className="">
                      <span className="text-red-600">
                        ${lowPrice.toFixed(1)}
                      </span>
                      {" - "}
                      <span className="text-green-600">
                        ${highPrice.toFixed(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        {/* Summary Statistics */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Highest Price</div>
              <div className="text-2xl font-bold text-green-600">
                ${Math.max(...historicalData.map((d) => d.price)).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Lowest Price</div>
              <div className="text-2xl font-bold text-red-600">
                ${Math.min(...historicalData.map((d) => d.price)).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">
                Average Volume
              </div>
              <div className="text-2xl font-bold">
                {(
                  historicalData.reduce((acc, curr) => acc + curr.volume, 0) /
                  historicalData.length /
                  1000000
                ).toFixed(1)}
                M
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Price Change</div>
              <div
                className={`text-2xl font-bold ${
                  historicalData[historicalData.length - 1].price >
                  historicalData[0].price
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {(
                  ((historicalData[historicalData.length - 1].price -
                    historicalData[0].price) /
                    historicalData[0].price) *
                  100
                ).toFixed(2)}
                %
              </div>
            </CardContent>
          </Card>
        </div> */}
      </CardContent>
    </Card>
  );
}
