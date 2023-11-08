import { getUserTopAnswers } from "@/server/actions/user.action";
import AnswerCard from "@/components/cards/AnswerCard";
import Pagination from "@/components/shared/Pagination";

interface TopAnswersTabProps {
  userId: string;
  searchParams: { [key: string]: string | undefined };
}

export default async function TopAnswersTab({
  userId,
  searchParams,
}: TopAnswersTabProps) {
  const { topAnswers, isNext } = await getUserTopAnswers({
    userId,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <>
      <div className="flex-start flex-col gap-4">
        {topAnswers.map((answer) => (
          <AnswerCard
            key={answer._id}
            answerId={answer._id}
            questionId={answer.question._id}
            title={answer.question.title}
            author={answer.author}
            upvotes={answer.upvotes.length}
            createdAt={answer.createdAt}
          />
        ))}
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
