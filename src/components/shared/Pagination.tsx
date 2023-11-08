"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/query";

interface PaginationProps {
  pageNumber: number;
  isNext: boolean | undefined;
  isScroll?: boolean;
}

export default function Pagination({
  pageNumber,
  isNext,
  isScroll = true,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleClick(direction: "prev" | "next") {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;
    const newUrl = formUrlQuery(
      searchParams.toString(),
      "page",
      nextPageNumber.toString()
    );
    router.push(newUrl, { scroll: isScroll });
  }

  if (!isNext && pageNumber < 1) return null;

  return (
    <div className="flex-center gap-2">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleClick("prev")}
        className="light-border-2 btn body-medium text-dark200_light800 flex min-h-[36px] items-center justify-center gap-2 border"
      >
        Prev
      </Button>
      <div className="body-semibold flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2 text-light-900">
        {pageNumber}
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleClick("next")}
        className="light-border-2 btn body-medium text-dark200_light800 flex min-h-[36px] items-center justify-center gap-2 border"
      >
        Next
      </Button>
    </div>
  );
}
