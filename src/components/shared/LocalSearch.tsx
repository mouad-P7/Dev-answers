"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/query";

export default function LocalSearch({
  route,
  children,
  otherClasses,
}: {
  route: string;
  children: React.ReactNode;
  otherClasses: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery(searchParams.toString(), "q", search);
        router.push(newUrl, { scroll: false });
      } else if (pathname === route) {
        const newUrl = removeKeysFromQuery(searchParams.toString(), ["q"]);
        router.push(newUrl, { scroll: false });
      }
    }, 1000); // 1s delay

    return () => clearTimeout(delayDebounce);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[50px] grow cursor-pointer items-center gap-1 rounded-xl px-3 ${otherClasses}`}
    >
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        name="search"
        placeholder={String(children)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
    </div>
  );
}
