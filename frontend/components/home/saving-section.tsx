import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavingGoalCard } from "./saving-goal-card";
import Link from "next/link";

export function SavingsSection() {
  const savingGoals = [
    {
      title: "New Laptop",
      amount: "400",
      type: "laptop",
      icon: "/images/twemoji_laptop.png",
    },
    {
      title: "Dream bike",
      amount: "200",
      type: "bike",
      icon: "/images/twemoji_bicycle.png",
    },
    {
      title: "Holiday",
      amount: "14000",
      type: "holiday",
      icon: "/images/twemoji_airplane.png",
    },
    {
      title: "Camera",
      amount: "100",
      type: "camera",
      icon: "/images/twemoji_camera-with-flash.png",
    },
  ] as const;

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="space-y-6 max-w-2xl">
            <p className="text-lg font-medium">Saving Accounts</p>
            <h2 className="text-4xl md:text-6xl font-medium leading-tight">
              Organize your <br /> money the right way
            </h2>
          </div>
          <div className="flex justify-between items-center mt-7">
            <p className="text-xl text-muted-foreground max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              href="#"
              className="text-emerald-500 hover:text-emerald-600 font-medium hidden md:block"
            >
              All Features →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          {savingGoals.map((goal) => (
            <SavingGoalCard
              key={goal.title}
              title={goal.title}
              amount={goal.amount}
              type={goal.type}
              icon={goal.icon}
            />
          ))}
          <Button
            variant="outline"
            size="icon"
            className="w-full h-52 aspect-square flex items-center justify-center border-2 border-dashed"
          >
            <Plus className="w-6 h-6" />
            <span className="sr-only">Add new saving goal</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
