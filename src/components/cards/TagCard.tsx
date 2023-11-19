import Tag from "@/components/shared/Tag";
import { formatNumber } from "@/lib/format";

interface TagCardProps {
  tag: { id: string; name: string };
  questionsNumber: number;
}

export default async function TagCard({ tag, questionsNumber }: TagCardProps) {
  return (
    <div className="card-wrapper light-border background-light900_dark200 text-dark500_light700 flex-start w-full flex-col gap-3 rounded-lg p-3 xs:w-40">
      <Tag tag={tag} />
      <div className="flex-center gap-2">
        <p className="body-semibold primary-text-gradient">
          {formatNumber(questionsNumber)}
        </p>
        <p className="small-medium text-dark400_light500">
          {questionsNumber === 1 ? "Question" : "Questions"}
        </p>
      </div>
    </div>
  );
}
