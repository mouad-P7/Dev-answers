"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/query";
import { Button } from "@/components/ui/button";

export default function GlobalFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("type");
  const [type, setType] = useState(query || "");

  function handleClick(itemValue: string) {
    if (type === itemValue) {
      setType("");
      const newUrl = formUrlQuery(searchParams.toString(), "type", null);
      router.push(newUrl, { scroll: false });
    } else {
      setType(itemValue);
      const newUrl = formUrlQuery(
        searchParams.toString(),
        "type",
        itemValue.toLowerCase()
      );
      router.push(newUrl, { scroll: false });
    }
  }

  return (
    <div className="flex-start gap-3">
      {GlobalSearchFilters.map((item, i) => (
        <Button
          key={i}
          className={`body-medium rounded-[40px] px-4 py-2 capitalize shadow-none ${
            type === item.value
              ? "primary-gradient text-light-900"
              : "background-light700_dark300 hover:text-primary-500"
          }`}
          onClick={() => handleClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
}
