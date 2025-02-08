export function calculateNewPrice(
  currentPrice: number,
  isMarketCrash: boolean
): number {
  if (isMarketCrash) {
    // Drop by 10-30% during crash
    const crashDropPercentage = 0.1 + Math.random() * 0.2;
    return currentPrice * (1 - crashDropPercentage);
  }

  // Normal price fluctuation
  const change = (Math.random() - 0.5) * 0.1;
  return currentPrice + change;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function calculateProfitLoss(
  initialBalance: number,
  currentBalance: number
): string {
  const difference = currentBalance - initialBalance;
  const percentage = (difference / initialBalance) * 100;
  return `${formatCurrency(difference)} (${percentage.toFixed(2)}%)`;
}
