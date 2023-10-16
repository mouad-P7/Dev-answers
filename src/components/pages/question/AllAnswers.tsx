import { getAllAnswers } from "@/server/actions/answer.action";
import { AllAnswersProps } from "@/types/props";
import Filter from "@/components/shared/Filter";
import { AnswerFilters } from "@/constants/filters";
import { formatDate } from "@/lib/format";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import Votes from "@/components/shared/Votes";

export default async function AllAnswers({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: AllAnswersProps) {
  const result = await getAllAnswers(questionId);

  return (
    <div className="mt-11 flex flex-col gap-4">
      <div className="flex-between flex-wrap">
        <p className="paragraph-medium primary-text-gradient">
          {totalAnswers} Answers
        </p>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result.answers.map((answer) => (
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
    </div>
  );
}
