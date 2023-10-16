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

export default async function Question({ params }: { params: { id: string } }) {
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
            href={`/profile/${question.author._id}`}
            isAuthor
            textClasses="paragraph-semibold text-dark300_light700"
          />
          <Votes
            type="question"
            itemId={JSON.stringify(question._id)}
            userId={JSON.stringify(mongoUser._id)}
            upvotes={question.upvotes.length}
            hasUpVoted={question.upvotes.includes(mongoUser._id)}
            downvotes={question.downvotes.length}
            hasDownVoted={question.downvotes.includes(mongoUser._id)}
            hasSaved={mongoUser?.saved.includes(question._id)}
          />
        </div>
        <p className="h2-semibold text-dark200_light900">{question.title}</p>
        <div className="flex-start gap-2">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatNumber(question.upvotes.length)}
            title="Votes"
            textClasses="small-regular text-dark400_light700"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumber(question.answers.length)}
            title=" Answers"
            textClasses="small-regular text-dark400_light700"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumber(question.views)}
            title=" Views"
            textClasses="small-regular text-dark400_light700"
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
        userId={mongoUser._id}
        totalAnswers={question.answers.length}
      />
      <AnswerForm
        question={question.content}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
}
