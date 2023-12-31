import React from "react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/ThemeProvider";
import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/prism.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Answers",
  description: "Platform for asking and answering programming questions.",
  icons: { icon: "/assets/images/site-logo.svg" },
};

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <main className="background-light850_dark100 h-[100vh]">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
