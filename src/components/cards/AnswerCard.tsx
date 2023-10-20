import Link from "next/link";
import Metric from "@/components/shared/Metric";
import { formatDate, formatNumber } from "@/lib/format";

interface AnswerCardProps {
  id: string;
  title: string;
  author: { clerkId: string; name: string; picture: string };
  upvotes: number;
  createdAt: Date;
}

export default function AnswerCard({
  id,
  title,
  author,
  upvotes,
  createdAt,
}: AnswerCardProps) {
  return (
    <div className="card-wrapper text-dark200_light900 flex w-full flex-col gap-3 rounded-lg p-4 sm:p-8">
      <Link href={`/question/${id}`} className="h3-semibold line-clamp-2">
        {title}
      </Link>
      <div className="flex-between flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`• answered ${formatDate(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textClasses="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatNumber(upvotes)}
          title="Votes"
          textClasses="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
}
