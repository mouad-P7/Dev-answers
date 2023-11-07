"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/query";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";

export default function HomeFilter({
  defaultValue,
  route,
}: {
  defaultValue: string;
  route: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("filter");
  const [filter, setFilter] = useState(query || defaultValue);

  useEffect(() => {
    if (filter) {
      const newUrl = formUrlQuery(searchParams.toString(), "filter", filter);
      router.push(newUrl, { scroll: false });
    } else if (pathname === route) {
      const newUrl = removeKeysFromQuery(searchParams.toString(), ["filter"]);
      router.push(newUrl, { scroll: false });
    }
  }, [filter, route, pathname, router, searchParams, query]);

  return (
    <div className="hidden flex-wrap gap-3 lg:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            filter === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500"
          }`}
          onClick={() => setFilter(item.value || defaultValue)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}
