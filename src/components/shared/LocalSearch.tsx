import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function LocalSearch({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow cursor-pointer items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          type="text"
          placeholder={String(children)}
          // value=""
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
}
