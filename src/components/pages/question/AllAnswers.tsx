import { getAllAnswers } from "@/server/actions/answer.action";
import Filter from "@/components/shared/Filter";
import { AnswerFilters } from "@/constants/filters";
import { formatDate } from "@/lib/format";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import Votes from "@/components/shared/Votes";
import Pagination from "@/components/shared/Pagination";

interface AllAnswersProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
  searchParams: { [key: string]: string | undefined };
}

export default async function AllAnswers({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
  searchParams,
}: AllAnswersProps) {
  const { answers, isNext } = await getAllAnswers({
    questionId,
    filter,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <div className="mt-11 flex flex-col gap-4">
      <div className="flex-between flex-wrap">
        <p className="paragraph-medium primary-text-gradient">
          {totalAnswers} Answers
        </p>
        <Filter filters={AnswerFilters} defaultValue="highestUpvotes" />
      </div>
      <div>
        {answers.map((answer) => (
          <div
            key={answer._id}
            className="light-border flex flex-col gap-4 border-b py-5"
          >
            <div className="flex-between flex-wrap">
              <Metric
                imgUrl={answer.author.picture}
                alt="user"
                value={answer.author.name}
                title={`• answered ${formatDate(answer.createdAt)}`}
                href={`/profile/${answer.author.clerkId}`}
                isAuthor
                textClasses="body-medium text-dark400_light700"
              />
              <Votes
                type="answer"
                itemId={JSON.stringify(answer._id)}
                userId={JSON.stringify(userId)}
                upvotes={answer.upvotes.length}
                hasUpVoted={answer.upvotes.includes(userId)}
                downvotes={answer.downvotes.length}
                hasDownVoted={answer.downvotes.includes(userId)}
              />
            </div>
            <ParseHTML data={answer.content} />
          </div>
        ))}
      </div>
      <Pagination
        pageNumber={searchParams?.page ? Number(searchParams.page) : 1}
        isNext={isNext}
        isScroll={false}
      />
    </div>
  );
}
