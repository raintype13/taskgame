import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <Navbar />
    </div>
  );
}
