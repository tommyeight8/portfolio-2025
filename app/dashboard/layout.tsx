"use client";
import { useState } from "react";
import DashboardSideBar from "./(components)/DashboardSideBar";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Sidebar */}
      <DashboardSideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* <button
        className="fixed top-16 left-4 z-50 bg-white dark:bg-black p-2 rounded shadow"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button> */}

      {/* Main Content */}
      {/* <div
        className={`transition-all duration-300 flex-1 ${
          sidebarOpen ? "ml-54" : ""
        } p-8 bg-gray-100 dark:bg-[#101010]`}
      >
        {children}
      </div> */}

      <div className={`transition-all duration-300 flex-1 p-8`}>{children}</div>
    </div>
  );
}
