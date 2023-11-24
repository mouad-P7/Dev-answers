"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex-center text-dark400_light800 h-full w-full flex-col gap-4">
      <h2 className="h2-bold">Something went wrong!</h2>
      <div className="flex-center gap-4">
        <Link href="/">
          <Button className="btn">Return Home</Button>
        </Link>
        <Button className="btn" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
