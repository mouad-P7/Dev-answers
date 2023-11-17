import { auth } from "@clerk/nextjs";
import { QuestionFilters } from "@/constants/filters";
import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getAllSavedQuestions } from "@/server/actions/user.action";
import Pagination from "@/components/shared/Pagination";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Collection({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) return null;
  const { savedQuestions, isNext } = await getAllSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-4">
      <p className="h3-bold sm:h2-bold w-full">Saved Questions</p>
      <div className="flex w-full items-center justify-between gap-5 max-xs:flex-col max-xs:items-end max-xs:gap-2">
        <LocalSearch route="/collection" otherClasses="w-full">
          Search a question...
        </LocalSearch>
        <Filter
          filters={QuestionFilters}
          defaultValue="most_recent"
          containerClasses="lg:hidden"
          otherClasses="w-36 sm:w-40"
        />
      </div>
      <div className="flex-start w-full flex-col gap-4">
        {savedQuestions.length > 0 ? (
          savedQuestions.map((qst: any) => (
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
            title="There’s no saved question to show"
            description="Save a Question 💡"
            link="/"
            linkTitle="Go to home page"
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
