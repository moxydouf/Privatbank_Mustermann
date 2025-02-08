import { Check } from "lucide-react";
import Image from "next/image";

interface TransactionProps {
  icon: string;
  company: string;
  category: string;
  amount: string;
}

export function TransactionsSection() {
  return (
    <section className="pt-16 px-4 bg-teal-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Send & receive
              <br />
              money instantly
            </h2>
            <p className="text-xl text-gray-600 max-w-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et.
            </p>

            <div className="space-y-4">
              {["Malesuada Ipsum", "Vestibulum", "Parturient Lorem"].map(
                (item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="rounded-full bg-teal-100 p-1">
                      <Check className="w-4 h-4 text-teal-600" />
                    </div>
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative h-[300px] lg:h-[500px]">
              <Image
                src="/images/transactions.png"
                alt="Banking app interface"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
