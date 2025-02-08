"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/useAuth";

export function Navigation() {
  const { logout, user } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-teal-600">
          banquee.
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-8">
            <NavigationMenuItem>
              <Link
                href="#features"
                className="text-gray-600 hover:text-gray-900"
              >
                Features
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="#compare"
                className="text-gray-600 hover:text-gray-900"
              >
                Compare
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="#support"
                className="text-gray-600 hover:text-gray-900"
              >
                Support
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#blog" className="text-gray-600 hover:text-gray-900">
                Blog
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden md:inline-flex">{user.name}</span>
              <Button
                variant="ghost"
                className="hidden md:inline-flex text-white bg-teal-500 hover:bg-teal-600 hover:text-white"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden md:inline-flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Link href="/register">Open Account</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
