"use client";

import Link from "next/link";
import { House, Car, KeyRound, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: <House className="w-5 h-5" />,
  },
  {
    name: "Cars",
    href: "/admin/cars",
    icon: <Car className="w-5 h-5" />,
  },
  {
    name: "Rentals",
    href: "/admin/rentals",
    icon: <KeyRound className="w-5 h-5" />,
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-[#1D1D1D] min-h-screen flex flex-col text-[#C0C0C0]">
      <div className="p-6 border-b">
        <Image
          src="/mb-plus-logo.svg"
          alt="MB Plus Logo"
          width={240}
          height={60}
        />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-[#880808] text-[#F0F0F0F0] shadow-lg shadow-[#880808]/50"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
