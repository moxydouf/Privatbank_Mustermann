import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, calculateProfitLoss } from "@/utils/stock-utils";

interface GameSummaryProps {
  initialBalance: number;
  stats: {
    available_balance: number;
    finalBalance: number;
    total_shares: number;
    depot_value: number;
    profit_loss: number;
  };
  onRestart: () => void;
}

export function GameSummary({
  initialBalance,
  stats,
  onRestart,
}: GameSummaryProps) {
  // const portfolioValue = stats.total_shares * stats.depot_value;
  // const totalValue = stats.available_balance + portfolioValue;
  // const profitLoss = calculateProfitLoss(initialBalance, totalValue);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Game Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Initial Balance</p>
            <p className="font-medium">{formatCurrency(initialBalance)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Final Balance</p>
            <p className="font-medium">
              {formatCurrency(stats.available_balance)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Shares Held</p>
            <p className="font-medium">{stats.total_shares}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Portfolio Value</p>
            <p className="font-medium">{formatCurrency(stats.depot_value)}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Total Profit/Loss</p>
            <p
              className={`font-medium ${
                stats.depot_value > initialBalance
                  ? "text-teal-500"
                  : "text-red-500"
              }`}
            >
              {stats.profit_loss}
            </p>
          </div>
        </div>
        <Button
          className="w-full bg-teal-500 hover:bg-teal-600 mt-4"
          onClick={onRestart}
        >
          Play Again
        </Button>
      </CardContent>
    </Card>
  );
}
