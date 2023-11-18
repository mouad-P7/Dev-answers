import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-center h-full w-full bg-[url('/assets/images/auth-light.png')] bg-contain bg-center dark:bg-[url('/assets/images/auth-dark.png')]">
      {children}
    </div>
  );
}
