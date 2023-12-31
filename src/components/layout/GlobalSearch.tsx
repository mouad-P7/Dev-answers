"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/query";
import GlobalResult from "./GlobalResult";

export default function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery(searchParams.toString(), "global", search);
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery(searchParams.toString(), [
          "global",
          "q",
        ]);
        router.push(newUrl, { scroll: false });
      }
    }, 500); // 0.5s delay

    return () => clearTimeout(delayDebounce);
  }, [search, pathname, router, searchParams, query]);

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    setIsOpen(false);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  return (
    <div className="relative max-w-[800px] grow max-lg:hidden" ref={ref}>
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
          className="paragraph-regular no-focus placeholder background-light800_darkgradient text-dark400_light700 border-none shadow-none outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
}
