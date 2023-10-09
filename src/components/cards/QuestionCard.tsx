import Link from "next/link";
import Tag from "../shared/Tag";
import Metric from "@/components/shared/Metric";
import { QuestionCardProps } from "@/types/props";
import { formatDate, formatNumber } from "@/lib/format";

export default function QuestionCard({
  id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionCardProps) {
  return (
    <div className="card-wrapper text-dark200_light900 flex w-full flex-col gap-3 rounded-lg p-4 sm:p-8">
      <Link href={`/question/${id}`} className="h3-semibold line-clamp-2">
        {title}
      </Link>
      <div className="flex-start gap-2">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
      <div className="flex-between flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`• asked ${formatDate(createdAt)}`}
          href={`/profile/${author.id}`}
          isAuthor
          textClasses="body-medium text-dark400_light700"
        />
        <div className="flex-start gap-2">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatNumber(upvotes)}
            title="Votes"
            textClasses="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumber(answers.length)}
            title=" Answers"
            textClasses="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumber(views)}
            title=" Views"
            textClasses="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
}
