import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/shared/LocalSearch";

export default function Home() {
  return (
    <div className="text-dark100_light900">
      <div className="flex-between">
        <p className="base-bold sm:h2-bold">All Questions</p>
        <Link href="/ask-question">
          <Button className="paragraph-medium primary-gradient w-40 text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-6 flex items-center justify-between gap-5 sm:flex-col">
        <LocalSearch>Search a question...</LocalSearch>
        <p>Filter</p>
      </div>
      <div>
        <p>Card</p>
        <p>Card</p>
        <p>Card</p>
      </div>
    </div>
  );
}
