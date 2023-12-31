import { auth } from "@clerk/nextjs";
import Metric from "@/components/shared/Metric";
import Tag from "@/components/shared/Tag";
import { getQuestionById } from "@/server/actions/question.action";
import { formatDate, formatNumber } from "@/lib/format";
import { TagType } from "@/server/database/tag.model";
import ParseHTML from "@/components/shared/ParseHTML";
import AnswerForm from "@/components/forms/AnswerForm";
import { getUserById } from "@/server/actions/user.action";
import AllAnswers from "@/components/pages/question/AllAnswers";
import Votes from "@/components/shared/Votes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Question | Dev Answers",
};

interface QuestionProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function Question({
  params,
  searchParams,
}: QuestionProps) {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) mongoUser = await getUserById({ userId: clerkId });
  const question = await getQuestionById(params.id);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex-between flex-wrap gap-3">
          <Metric
            imgUrl={question.author.picture}
            alt="profile"
            value={question.author.name}
            title={`• asked ${formatDate(question.createdAt)}`}
            href={`/profile/${question.author.clerkId}`}
            isAuthor
            textClasses="paragraph-semibold text-dark300_light700"
          />
          <Votes
            type="question"
            itemId={JSON.stringify(question._id)}
            userId={JSON.stringify(mongoUser?._id)}
            upvotes={question.upvotes.length}
            hasUpVoted={question.upvotes.includes(mongoUser?._id)}
            downvotes={question.downvotes.length}
            hasDownVoted={question.downvotes.includes(mongoUser?._id)}
            hasSaved={mongoUser?.saved.includes(question._id)}
          />
        </div>
        <p className="h2-semibold text-dark200_light900 line-clamp-2">
          {question.title}
        </p>
        <div className="flex-start gap-2">
          <Metric
            imgUrl="/assets/icons/clock-2.svg"
            alt="clock"
            value={`asked ${formatDate(question.createdAt)}`}
            title=""
            textClasses="small-regular text-dark400_light700"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumber(question.answers.length)}
            title=" Answers"
            textClasses="small-regular text-dark400_light700"
            isAuthor
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumber(question.views)}
            title=" Views"
            textClasses="small-regular text-dark400_light700"
            isAuthor
          />
        </div>
        <ParseHTML data={question.explanation} />
        <div className="flex-start gap-2">
          {question.tags.map((tag: TagType) => (
            <Tag key={tag._id} tag={{ id: tag._id, name: tag.name }} />
          ))}
        </div>
      </div>
      <AllAnswers
        questionId={question._id}
        userId={mongoUser?._id}
        totalAnswers={question.answers.length}
        filter={searchParams.filter}
        searchParams={searchParams}
      />
      <AnswerForm
        questionExplanation={question.explanation}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(mongoUser?._id)}
      />
    </>
  );
}
