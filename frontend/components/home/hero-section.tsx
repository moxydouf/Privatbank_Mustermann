"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function HeroSection() {
  const { user } = useAuth();
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
            Banking starts here.
          </h1>
          <p className="text-xl text-gray-600 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-teal-100 p-1">
                <Check className="w-4 h-4 text-teal-600" />
              </div>
              <span>Instant Transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-teal-100 p-1">
                <Check className="w-4 h-4 text-teal-600" />
              </div>
              <span>Payments worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-teal-100 p-1">
                <Check className="w-4 h-4 text-teal-600" />
              </div>
              <span>Saving accounts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-teal-100 p-1">
                <Check className="w-4 h-4 text-teal-600" />
              </div>
              <span>100% mobile banking</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
              {user ? (
                <Link href="/trading">Start Trading</Link>
              ) : (
                <Link href="/register"> Open Account</Link>
              )}
            </Button>
            <Button size="lg" variant="outline" className="group">
              Compare Cards
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="relative h-[380px] lg:h-[480px]">
          <Image
            src="/images/cards.png"
            alt="Banking cards preview"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
