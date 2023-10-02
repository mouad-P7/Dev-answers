import Image from "next/image";
import Link from "next/link";
import { QuestionCardProps } from "@/types/props";
import Tag from "../shared/Tag";
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
    <div className="card-wrapper text-light-900_dark200 flex w-full flex-col gap-3 rounded-lg p-4 sm:p-8">
      <Link href={`/question/${id}`} className="h3-semibold line-clamp-2">
        {title}
      </Link>
      <div className="flex-start gap-2">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
      <div className="flex-between flex-wrap gap-3">
        <div className="flex-start gap-1">
          <Image
            // src={author.picture}
            src="/assets/icons/avatar.svg"
            alt="profile picture"
            width={20}
            height={20}
          />
          <p className="body-medium text-light-700_dark-400">{author.name}</p>
          <p>• asked {formatDate(createdAt)}</p>
        </div>
        <div className="flex-start gap-2">
          <div className="flex-center gap-1">
            <Image
              src="/assets/icons/like.svg"
              alt="like"
              width={16}
              height={16}
              className="text-blue-100"
            />
            <p className="small-medium text-light-800_dark-400">
              {formatNumber(upvotes)} Votes
            </p>
          </div>
          <div className="flex-center gap-1">
            <Image
              src="/assets/icons/message.svg"
              alt="comment"
              width={16}
              height={16}
            />
            <p className="small-medium text-light-800_dark-400">
              {formatNumber(answers.length)} Answers
            </p>
          </div>
          <div className="flex-center gap-1">
            <Image
              src="/assets/icons/eye.svg"
              alt="eye"
              width={16}
              height={16}
            />
            <p className="small-medium text-light-800_dark-400">
              {formatNumber(views)} Views
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
