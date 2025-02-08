import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface CrashWarningProps {
  onSell: () => void;
  onHold: () => void;
  setShowCrashWarning?: (show: boolean) => void;
}

export function CrashWarning({
  onSell,
  onHold,
  setShowCrashWarning,
}: CrashWarningProps) {
  return (
    <Alert
      variant="destructive"
      className="mb-0 fixed w-fit top-20 z-50 bg-white right-4"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Market Crash!</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-4">
          Stocks have plummeted! What would you like to do?
        </p>
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={() => {
              onSell();
              if (setShowCrashWarning) {
                setShowCrashWarning(false);
              }
            }}
          >
            Sell Now (Cut Losses)
          </Button>
          <Button
            variant="outline"
            className="outline-teal-500 bg-teal-500 text-white hover:bg-teal-600"
            onClick={() => {
              onHold();
              if (setShowCrashWarning) {
                setShowCrashWarning(false);
              }
            }}
          >
            Hold Position
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
