import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-center h-full w-full bg-contain bg-center bg-auth-light dark:bg-auth-dark">
      {children}
    </div>
  );
}
