"use client";

import { useState } from "react";
import Link from "next/link";
import { House, Car, KeyRound, LogOut, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

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
  const { logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = ({
    onNavigate,
    showClose,
  }: {
    onNavigate?: () => void;
    showClose?: boolean;
  }) => (
    <>
      <div className="p-6 border-b flex items-center justify-between">
        <Image
          src="/mb-plus-logo.svg"
          alt="MB Plus Logo"
          width={240}
          height={60}
        />
        {showClose ? (
          <button
            aria-label="Cerrar menú"
            className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10"
            onClick={onNavigate}
          >
            <X className="w-5 h-5" />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
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

      <button
        onClick={() => {
          logout();
          onNavigate?.();
        }}
        className="m-4 flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </>
  );

  return (
    <>
      <div className="hidden md:flex w-72 bg-[#1D1D1D] min-h-screen flex-col text-[#C0C0C0]">
        <SidebarContent />
      </div>

      <div className="md:hidden w-full bg-[#1D1D1D] text-white border-b border-white/10 sticky top-0 z-20">
        <div className="flex items-center justify-between px-4 py-4">
          <Image src="/mb-plus-logo.svg" alt="MB Plus Logo" width={160} height={40} />
          <button
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10"
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-[#1D1D1D] text-[#C0C0C0] min-h-full flex flex-col shadow-2xl">
            <SidebarContent
              onNavigate={() => setIsMobileOpen(false)}
              showClose
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
