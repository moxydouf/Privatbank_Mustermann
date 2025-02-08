"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StockChart } from "@/components/stock/stock-chart";
import { CrashWarning } from "@/components/stock/crash-warning";
import { StockSelector } from "@/components/stock/stock-selector";
import { buyShares, sellShares } from "../../actions/trading";
import type { Stock, StockData, GameState } from "@/types/stock";
import { TradingActions } from "@/components/stock/trading-actions";
import { useAuth } from "@/hooks/useAuth";
import { GameSummary } from "@/components/stock/game-summary";
import { ShareOverview } from "@/components/stock/share-overview";
import { OrderBook } from "@/components/stock/order-books";
import { ShareDetails } from "@/components/stock/share-details";
import { DepotHoldings } from "@/components/stock/depot-holding";

export default function TradingPage() {
  const { user, loading, updateUserBalance } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stockDetails, setStockDetails] = useState<any>(null);
  const [userAccountSummary, setUserAccountSummary] = useState<any>(null);
  const [orderBooks, setOrderBooks] = useState<any>(null);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    selectedStock: null,
    balance: user?.balance || 0,
    portfolio: {},
    gameStarted: false,
    gameEnded: false,
    isMarketCrash: false,
    consecutiveFalls: 0,
  });
  const [buyState, buyAction] = useActionState(buyShares, null);
  const [sellState, sellAction] = useActionState(sellShares, null);
  const [showCrashWarning, setShowCrashWarning] = useState(false);

  useEffect(() => {
    if (user?.balance !== undefined) {
      setGameState((prevState) => ({
        ...prevState,
        balance: user.balance,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (buyState && buyState.success) {
      // fetchUserData();
      console.log("Buy success");
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}index.php?endpoint=getCurrentUser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: user?.id }),
            }
          ); // Adjust the endpoint as needed
          const updatedUser = await response.json();
          updateUserBalance(updatedUser?.user?.balance);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };

      fetchUserData();
    }
  }, [buyState]);

  const handleSelectShare = (stock: Stock) => {
    setGameState((prevState) => ({
      ...prevState,
      selectedStock: stock,
    }));
  };

  useEffect(() => {
    const fetchAccountSummary = async () => {
      try {
        const response = await fetch(`
          ${process.env.NEXT_PUBLIC_API_BASE_URL}index.php?endpoint=getUserFinancialSummary&user_id=${user?.id}`);
        const result = await response.json();
        setUserAccountSummary(result.data);
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      }
    };

    fetchAccountSummary();
  }, [buyAction, sellAction, gameState.balance]);

  useEffect(() => {
    const fetchOrderBooks = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}index.php?endpoint=getOrderBook`
      );
      const data = await response.json();
      setOrderBooks(data.data);
    };

    fetchOrderBooks();
  }, [buyShares, sellShares]);

  useEffect(() => {
    const fetchStockDetails = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}index.php?endpoint=getStockDetails&stock_id=${gameState?.selectedStock?.id}`
      );
      const data = await response.json();
      setStockDetails(data.data);
    };

    fetchStockDetails();
  }, [gameState.selectedStock]);

  // Fetch available stocks
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}index.php?endpoint=getAllStocks`
        );
        const result = await response.json();
        setStocks(result.data);
      } catch (error) {
        console.error("Failed to fetch stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  // Update stock price
  useEffect(() => {
    if (!gameState.selectedStock) return;

    const interval = setInterval(() => {
      const shouldCrash = Math.random() < 0.05; // 5% chance of crash
      const priceChange = shouldCrash ? -0.1 : (Math.random() - 0.5) * 0.1;

      setGameState((prev) => {
        if (!prev.selectedStock) return prev;

        const newBidPrice = prev.selectedStock.bid_price * (1 + priceChange);
        const newAskPrice = newBidPrice * 1.003; // 0.3% spread

        return {
          ...prev,
          selectedStock: {
            ...prev.selectedStock,
            bid_price: newBidPrice,
            ask_price: newAskPrice,
          },
          isMarketCrash: shouldCrash,
          consecutiveFalls: priceChange < 0 ? prev.consecutiveFalls + 1 : 0,
        };
      });

      setStockData((prev) => {
        const now = new Date();
        const newData = [
          ...prev,
          {
            time: now.toLocaleTimeString(),
            bidPrice: gameState.selectedStock!.bid_price,
            askPrice: gameState.selectedStock!.ask_price,
            isMarketCrash: shouldCrash,
          },
        ];
        return newData.slice(-100);
      });

      if (shouldCrash) {
        setShowCrashWarning(true);
        setTimeout(() => {
          setShowCrashWarning(false);
        }, 30000); // 30000 milliseconds = 30 seconds
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.selectedStock]);

  const handleStockSelect = (stock: Stock) => {
    setGameState((prev) => ({
      ...prev,
      selectedStock: stock,
      gameStarted: true,
    }));
    setStockData([
      {
        time: new Date().toLocaleTimeString(),
        bidPrice: stock.bid_price,
        askPrice: stock.ask_price,
        isMarketCrash: false,
      },
    ]);
  };

  const handlePanicSell = () => {
    if (!gameState.selectedStock) return;
    const shares =
      gameState.portfolio[gameState.selectedStock.ticker_symbol] || 0;
    if (shares > 0) {
      const formData = new FormData();
      formData.append("quantity", shares.toString());
      formData.append("price", gameState.selectedStock.bid_price.toString());
      formData.append("symbol", gameState.selectedStock.ticker_symbol);
      formData.append("type", "SELL");
      sellAction(formData);
    }
  };

  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              Select a Stock to Trade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StockSelector
              stocks={stocks}
              selectedStock={gameState.selectedStock}
              onSelect={handleStockSelect}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-32">
      {gameState.gameEnded ? (
        <GameSummary
          stats={userAccountSummary}
          initialBalance={50000}
          onRestart={() =>
            setGameState((prev) => ({
              ...prev,
              gameEnded: false,
              gameStarted: true,
            }))
          }
        />
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
          {showCrashWarning && (
            <CrashWarning
              setShowCrashWarning={setShowCrashWarning}
              onSell={handlePanicSell}
              onHold={() =>
                setGameState((prev) => ({ ...prev, isMarketCrash: false }))
              }
            />
          )}

          <DepotHoldings stats={userAccountSummary} />

          <div className="flex items-center justify-between">
            <div className="w-72">
              <StockSelector
                stocks={stocks}
                selectedStock={gameState.selectedStock}
                onSelect={handleStockSelect}
              />
            </div>
            <div className="text-right">
              {/* <div className="text-sm text-gray-500">Available Balance</div>
          <div className="text-2xl font-bold">
            {formatCurrency(gameState.balance)}
          </div>
        </div> */}
              <Button
                onClick={() => {
                  setGameState((prev) => ({ ...prev, gameEnded: true }));
                }}
                className="w-full bg-red-500 px-10 py-5 font-medium hover:bg-red-600"
              >
                End Trade
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 w-full">
            <div className="w-full col-span-2 space-y-5">
              <StockChart data={stockData} />
              <OrderBook orders={orderBooks} />
              <ShareDetails
                selectedStockDetails={stockDetails}
                selectedStock={gameState.selectedStock}
              />
            </div>

            <div className="space-y-6">
              {gameState.selectedStock && user && (
                <TradingActions
                  stock={gameState.selectedStock}
                  portfolio={gameState.portfolio}
                  user={user}
                  buyAction={buyAction}
                  sellAction={sellAction}
                  buyState={buyState}
                  sellState={sellState}
                />
              )}
              <ShareOverview stocks={stocks} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
