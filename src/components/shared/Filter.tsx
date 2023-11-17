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
        <SelectTrigger
          className={`${otherClasses} light-border background-light800_dark300 text-dark500_light700`}
        >
          <SelectValue placeholder="Select a Filter" />
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
