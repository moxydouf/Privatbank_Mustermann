import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StockData } from "@/types/stock";

interface StockChartProps {
  data: StockData[];
}

export function StockChart({ data }: StockChartProps) {
  return (
    <Card className="lg:col-span-2 h-fit">
      <CardHeader>
        <CardTitle>Price History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as StockData;
                    return (
                      <div className="bg-white p-2 border rounded shadow">
                        <p className="font-medium">{data.time}</p>
                        <p className="text-teal-500">Ask: ${data.askPrice}</p>
                        <p className="text-blue-500">Bid: ${data.bidPrice}</p>
                        {data.isMarketCrash && (
                          <p className="text-red-500 text-sm">Market Crash!</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="askPrice"
                name="Ask Price"
                stroke="rgb(20 184 166)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="bidPrice"
                name="Bid Price"
                stroke="rgb(59 130 246)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
