import { Card } from "@/components/ui/card";
import { Laptop, Bike, Plane, Camera } from "lucide-react";
import Image from "next/image";

interface SavingGoalCardProps {
  title: string;
  amount: string;
  type: "laptop" | "bike" | "holiday" | "camera";
  className?: string;
  icon: string;
}

export function SavingGoalCard({
  title,
  amount,
  type,
  icon,
  className,
}: SavingGoalCardProps) {
  // const icons = {
  //   laptop: Laptop,
  //   bike: Bike,
  //   holiday: Plane,
  //   camera: Camera,
  // };

  // const Icon = icons[type];

  const getBackgroundClass = (
    type: "laptop" | "bike" | "holiday" | "camera"
  ): string => {
    switch (type) {
      case "laptop":
        return "bg-[#E8F2EE]";
      case "bike":
        return "bg-[#F1DFDF]";
      case "holiday":
        return "bg-[#E0E1F1]";
      case "camera":
        return "bg-[#DEEBF2]";
      default:
        return "";
    }
  };

  return (
    <div>
      <Card
        className={`p-6 cursor-pointer transition-shadow h-52 border flex items-center justify-center ${getBackgroundClass(
          type
        )} border-none ${className}`}
      >
        <div className="">
          <Image src={icon} alt={title} width={50} height={50} />
        </div>
      </Card>
      <div className="mt-3 ml-2">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-gray-600">{amount}$</p>
      </div>
    </div>
  );
}
