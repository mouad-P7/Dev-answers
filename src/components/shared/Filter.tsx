"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { formUrlQuery } from "@/lib/query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterProps {
  filters: { name: string; value: string }[];
  containerClasses?: string;
  otherClasses?: string;
}

export default function Filter({
  filters,
  containerClasses,
  otherClasses,
}: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("filter");
  const [filter, setFilter] = useState(query || "old_users");

  useEffect(() => {
    const newUrl = formUrlQuery(searchParams.toString(), "filter", filter);
    router.push(newUrl, { scroll: false });
  }, [filter, pathname, router, searchParams, query]);

  return (
    <div className={containerClasses}>
      <Select
        onValueChange={(value) => setFilter(value || "old_users")}
        defaultValue={filter}
      >
        <SelectTrigger className={otherClasses}>
          <SelectValue placeholder="Select a Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
