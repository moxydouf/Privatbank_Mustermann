import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Stock } from "@/types/stock";
import Image from "next/image";

interface StockSelectorProps {
  stocks: Stock[];
  selectedStock: Stock | null;
  onSelect: (stock: Stock) => void;
}

export function StockSelector({
  stocks,
  selectedStock,
  onSelect,
}: StockSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedStock
            ? `${selectedStock.ticker_symbol} - ${selectedStock.company_name}`
            : "Select stock..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search stocks..." />
          <CommandList>
            <CommandEmpty>No stocks found.</CommandEmpty>
            <CommandGroup>
              {stocks?.map((stock) => (
                <CommandItem
                  key={stock.ticker_symbol}
                  onSelect={() => {
                    onSelect(stock);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedStock?.ticker_symbol === stock.ticker_symbol
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="font-medium">{stock.ticker_symbol}</span>
                      <span className="ml-2 text-muted-foreground">
                        - {stock.company_name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        €{stock.ask_price}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stock.total_shares.toLocaleString()} shares
                      </div>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
