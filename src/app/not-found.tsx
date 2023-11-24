import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="text-dark400_light800 flex-center h-full w-full flex-col gap-4">
      <h2 className="h2-bold">Page Not Found</h2>
      <p className="paragraph-semibold">404 | This page could not be found.</p>
      <Link href="/">
        <Button className="btn">Return Home</Button>
      </Link>
    </div>
  );
}
