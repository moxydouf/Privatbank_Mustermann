import { Check } from "lucide-react";
import Image from "next/image";

export function IntegrationsSection() {
  const features = [
    "Secure and encrypted integration",
    "Fully API interface",
    "Payments worldwide",
  ];

  const integrations = [
    "/images/Webflow_logo.png",
    "/images/Shopify_logo.png",
    "/images/zapier_logo.png",
    "/images/bitcoin.png",
  ];
  const integrationsPayment = [
    "/images/PayPal.png",
    "/images/Mastercard-logo.png",
    "/images/Visa_logo.png",
    "/images/Google_Pay.png",
    "/images/Amazon_Pay_logo.png",
  ];

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-3 mb-10">
          <div className="flex items-center gap-5">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="flex items-center justify-start bg-gray-100 p-2 rounded-lg"
              >
                <Image
                  src={integration}
                  alt="Integration"
                  width={100}
                  height={100}
                  className="object-contain h-6"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {integrationsPayment.map((integration, index) => (
              <div
                key={index}
                className="flex items-center justify-start bg-gray-100 p-2 rounded-lg"
              >
                <Image
                  src={integration}
                  alt="Integration"
                  width={100}
                  height={100}
                  className="object-contain h-6"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-medium mb-4">Tools</h2>
              <h3 className="text-4xl md:text-5xl font-medium mb-6">
                Seemless integration
              </h3>
            </div>
            <p className="text-xl text-muted-foreground">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
