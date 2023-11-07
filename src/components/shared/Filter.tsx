"use client";

// import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  defaultValue: string;
  containerClasses?: string;
  otherClasses?: string;
}

export default function Filter({
  filters,
  defaultValue,
  containerClasses,
  otherClasses,
}: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("filter") || defaultValue;

  function handleValueChange(value: string) {
    const newUrl = formUrlQuery(searchParams.toString(), "filter", value);
    router.push(newUrl, { scroll: false });
  }

  return (
    <div className={containerClasses}>
      <Select onValueChange={handleValueChange} defaultValue={query}>
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
