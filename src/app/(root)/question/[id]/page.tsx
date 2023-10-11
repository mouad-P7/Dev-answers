import Metric from "@/components/shared/Metric";
import Tag from "@/components/shared/Tag";
import { getQuestionById } from "@/server/actions/question.action";
import { formatDate, formatNumber } from "@/lib/format";
import { TagType } from "@/server/database/tag.model";

export default async function Question({ params }: { params: { id: string } }) {
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
          <div className="flex-start gap-3">
            <div className="">up</div>
            <div className="">down</div>
            <div className="">star</div>
          </div>
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
        <div className="">explanation</div>
        <div className="flex-start gap-2">
          {question.tags.map((tag: TagType) => (
            <Tag key={tag._id} tag={{ id: tag._id, name: tag.name }} />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">all answers</div>
    </>
  );
}
