import { auth } from "@clerk/nextjs";
import { HomePageFilters } from "@/constants/filters";
import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getAllSavedQuestions } from "@/server/actions/user.action";

export default async function Collection() {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getAllSavedQuestions(userId);

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-6">
      <p className="h3-bold sm:h2-bold">Saved Questions</p>
      <div className="flex w-full items-center justify-between gap-5">
        <LocalSearch otherClasses="sm:w-full">Search a question...</LocalSearch>
        <Filter
          filters={HomePageFilters}
          containerClasses="lg:hidden"
          otherClasses="w-36 sm:w-40"
        />
      </div>
      <div className="flex-start w-full flex-col gap-4">
        {result.savedQuestions.length > 0 ? (
          result.savedQuestions.map((qst: any) => (
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
    </div>
  );
}
