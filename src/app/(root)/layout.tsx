import React from "react";
import Navbar from "@/components/layout/Navbar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-8">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      {/* Toaster */}
    </div>
  );
}
