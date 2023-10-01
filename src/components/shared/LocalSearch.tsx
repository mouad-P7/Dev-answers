import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function LocalSearch({
  otherClasses,
  children,
}: {
  otherClasses: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow cursor-pointer items-center gap-1 rounded-xl px-4 ${otherClasses}`}
    >
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
  );
}
