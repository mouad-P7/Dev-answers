import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function GlobalSearch() {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[50px] grow cursor-pointer items-center gap-1 rounded-xl px-3">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          type="text"
          placeholder="Search anything globally..."
          // value=""
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
}
