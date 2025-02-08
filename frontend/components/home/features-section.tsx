import Image from "next/image";
import { Zap, Wallet, Smartphone, LineChart } from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Zap;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border shadow-sm">
      <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-teal-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              One app.
              <br />
              One banking.
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <FeatureCard
                icon={Zap}
                title="Instant transactions"
                description="Odio euismod lacinia at quis. Amet purus gravida quis blandit turpis."
              />
              <FeatureCard
                icon={Wallet}
                title="Saving accounts"
                description="Odio euismod lacinia at quis. Amet purus gravida quis blandit turpis."
              />
              <FeatureCard
                icon={Smartphone}
                title="Mobile banking"
                description="Odio euismod lacinia at quis. Amet purus gravida quis blandit turpis."
              />
              <FeatureCard
                icon={LineChart}
                title="Advanced statistics"
                description="Odio euismod lacinia at quis. Amet purus gravida quis blandit turpis."
              />
            </div>
          </div>

          <div className="relative h-[600px] lg:h-[700px]">
            <Image
              src="/images/app.png"
              alt="Banking app interface"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
