import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";

export default function Home() {
  return (
    <div className="text-dark100_light900">
      <div className="flex-between">
        <p className="h3-bold sm:h2-bold">All Questions</p>
        <Link href="/ask-question">
          <Button className="paragraph-medium primary-gradient w-36 text-light-900 sm:w-40">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-6 flex items-center justify-between gap-5">
        <LocalSearch otherClasses="sm:w-full">Search a question...</LocalSearch>
        <Filter
          filters={HomePageFilters}
          containerClasses="lg:hidden"
          otherClasses="w-36 sm:w-40"
        />
      </div>
      <div>
        <p>Card</p>
        <p>Card</p>
        <p>Card</p>
      </div>
    </div>
  );
}
