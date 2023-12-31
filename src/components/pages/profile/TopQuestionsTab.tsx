import { getUserTopQuestions } from "@/server/actions/user.action";
import QuestionCard from "@/components/cards/QuestionCard";
import Pagination from "@/components/shared/Pagination";

interface TopQuestionsTabProps {
  userId: string;
  searchParams: { [key: string]: string | undefined };
}

export default async function TopQuestionsTab({
  userId,
  searchParams,
}: TopQuestionsTabProps) {
  const { topQuestions, isNext } = await getUserTopQuestions({
    userId,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <>
      <div className="flex-start flex-col gap-4">
        {topQuestions.length > 0 ? (
          topQuestions.map((qst) => (
            <QuestionCard
              key={qst._id}
              id={qst._id}
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
          <p className="paragraph-medium text-dark200_light900">
            You have not posted any question!
          </p>
        )}
      </div>
      <div className="mt-4">
        <Pagination
          pageNumber={searchParams?.page ? Number(searchParams.page) : 1}
          isNext={isNext}
          isScroll={false}
        />
      </div>
    </>
  );
}
