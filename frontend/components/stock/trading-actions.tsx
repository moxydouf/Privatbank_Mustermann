import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { formatCurrency } from "@/utils/stock-utils";
import type { Stock } from "@/types/stock";
import type { User } from "@/types/auth";

interface TradingActionsProps {
  stock: Stock;
  portfolio: Record<string, number>;
  buyAction: (formData: FormData) => void;
  sellAction: (formData: FormData) => void;
  user: User;
  buyState: any;
  sellState: any;
}

export function TradingActions({
  stock,
  portfolio,
  buyAction,
  sellAction,
  user,
  buyState,
  sellState,
}: TradingActionsProps) {
  const currentPosition = portfolio[stock.ticker_symbol] || 0;
  const positionValue = currentPosition * stock.bid_price;

  // console.log("portfolio", portfolio);
  // console.log("stock", stock);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* <div className="p-4 bg-gray-50 rounded-lg mb-6">
          <div className="text-sm text-gray-500">Your Position</div>
          <div className="font-medium">{currentPosition} shares</div>
          <div className="text-sm text-gray-500">
            Value: {formatCurrency(positionValue)}
          </div>
        </div> */}

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="buy"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <ArrowUpIcon className="w-4 h-4 mr-2" />
              Buy
            </TabsTrigger>
            <TabsTrigger
              value="sell"
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              <ArrowDownIcon className="w-4 h-4 mr-2" />
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="text-center py-4">
              <div className="text-sm text-gray-500">Ask Price</div>
              <div className="text-2xl font-bold">
                {formatCurrency(stock.ask_price)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Available: {stock.total_shares.toLocaleString()} shares
              </div>
            </div>

            <form action={buyAction} className="space-y-4">
              <input type="hidden" name="stockId" value={stock.id} />
              <input type="hidden" name="userId" value={user.id} />

              <div className="space-y-2">
                <Input type="number" name="price" placeholder="Enter price" />
              </div>

              <div className="space-y-2">
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  min="1"
                  max={stock.total_shares}
                />
              </div>

              <Button className="w-full bg-teal-500 hover:bg-teal-600">
                Buy Shares
              </Button>

              {buyState?.error && (
                <p className="text-red-500 text-sm text-center">
                  {buyState.error}
                </p>
              )}
              {buyState?.success && (
                <p className="text-teal-500 text-sm text-center">
                  {buyState.message}
                </p>
              )}
            </form>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="text-center py-4">
              <div className="text-sm text-gray-500">Bid Price</div>
              <div className="text-2xl font-bold">
                {formatCurrency(stock.bid_price)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Available to sell: {currentPosition} shares
              </div>
            </div>

            <form action={sellAction} className="space-y-4">
              <input type="hidden" name="stockId" value={stock.id} />
              <input type="hidden" name="userId" value={user.id} />

              <div className="space-y-2">
                <Input type="number" name="price" placeholder="Enter price" />
              </div>

              <div className="space-y-2">
                <Input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                />
              </div>

              <Button
                variant="outline"
                className="w-full border-red-500 text-red-500 hover:bg-red-50"
              >
                Sell Shares
              </Button>

              {sellState?.error && (
                <p className="text-red-500 text-sm text-center">
                  {sellState.error}
                </p>
              )}
              {sellState?.success && (
                <p className="text-teal-500 text-sm text-center">
                  {sellState.message}
                </p>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
