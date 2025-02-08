import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NotificationSection = () => {
  return (
    <section className="pt-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-lg font-medium mb-1">Notifications</p>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                Stay notified
              </h2>
              <p className="text-xl text-gray-600 max-w-lg">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>

              <div className="space-y-4">
                {["Malesuada Ipsum", "Vestibulum", "Parturient Lorem"].map(
                  (item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="rounded-full bg-teal-50 p-1">
                        <Check className="w-4 h-4 text-teal-600" />
                      </div>
                      <span>{item}</span>
                    </div>
                  )
                )}
              </div>

              <Link
                href="#"
                className="text-emerald-500 hover:text-emerald-600 font-medium hidden md:block"
              >
                Compare Cards →
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative h-[200px] lg:h-[350px]">
              <Image
                src="/images/grid-transactions.png"
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
};

export default NotificationSection;
