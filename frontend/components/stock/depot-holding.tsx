"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingUp, BarChart2, Layers } from "lucide-react";
import type React from "react"; // Added import for React

interface DepotStats {
  available_balance: number;
  profit_loss: number;
  depot_value: number;
  total_shares: number;
}

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  trend?: "positive" | "negative" | "neutral";
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline justify-between mt-1">
              <h3 className="text-2xl font-bold">{value}</h3>
              {change && (
                <p
                  className={`text-sm font-medium ${
                    trend === "positive"
                      ? "text-green-600"
                      : trend === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {change}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DepotHoldings({ stats }: { stats: DepotStats }) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Available Balance"
        value={formatCurrency(stats?.available_balance)}
        icon={<Wallet className="w-6 h-6 text-primary" />}
      />
      <StatCard
        title="Profit/Loss"
        value={formatCurrency(stats?.profit_loss)}
        change={formatPercentage(
          (stats?.profit_loss / (stats?.depot_value - stats?.profit_loss)) * 100
        )}
        icon={<TrendingUp className="w-6 h-6 text-primary" />}
        trend={
          stats?.profit_loss > 0
            ? "positive"
            : stats?.profit_loss < 0
            ? "negative"
            : "neutral"
        }
      />
      <StatCard
        title="Depot Value"
        value={formatCurrency(stats?.depot_value)}
        icon={<BarChart2 className="w-6 h-6 text-primary" />}
      />
      <StatCard
        title="Total Shares"
        value={stats?.total_shares.toString()}
        icon={<Layers className="w-6 h-6 text-primary" />}
      />
    </div>
  );
}
