import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
// import HomeFilter from "@/components/pages/home/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getAllQuestions } from "@/server/actions/question.action";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Dev Answers",
};

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  let { userId } = auth();
  if (!userId) userId = null;

  const { questions, isNext } = await getAllQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-4">
      <div className="flex-between w-full">
        <p className="h3-bold sm:h2-bold">All Questions</p>
        <Link href="/ask-question">
          <Button className="paragraph-medium primary-gradient w-36 text-light-900 sm:w-40">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="flex w-full items-center justify-between gap-5 max-xs:flex-col max-xs:items-end max-xs:gap-2">
        <LocalSearch route="/" otherClasses="w-full">
          Search a question...
        </LocalSearch>
        <Filter
          filters={HomePageFilters}
          defaultValue="newest"
          // containerClasses="lg:hidden"
          otherClasses="w-36 sm:w-40"
        />
      </div>
      {/* <HomeFilter defaultValue="newest" route="/" /> */}
      <div className="flex-start w-full flex-col gap-4">
        {questions && questions.length > 0 ? (
          questions.map((qst: any) => (
            <QuestionCard
              key={qst.id}
              id={qst.id}
              title={qst.title}
              tags={qst.tags}
              author={qst.author}
              upvotes={qst.upvotes.length}
              views={qst.views}
              answers={qst.answers.length}
              createdAt={qst.createdAt}
            />
          ))
        ) : (
          <NoResult
            title={userId ? "Question not found." : "You're not Logged In!"}
            description={
              userId
                ? "🚀 Ask a Question and kickstart the discussion. Get involved! 💡"
                : "Please Log In to see the best questions for you! 💡"
            }
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <Pagination
        pageNumber={searchParams?.page ? Number(searchParams.page) : 1}
        isNext={isNext}
      />
    </div>
  );
}
