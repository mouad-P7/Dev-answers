import Tag from "@/components/shared/Tag";
import { TagCardProps } from "@/types/props";

export default async function TagCard({
  tag,
  description,
  questionsNumber,
}: TagCardProps) {
  return (
    <div className="card-wrapper light-border background-light900_dark200 text-dark500_light800 flex-start h-56 w-full flex-col gap-4 rounded-lg p-6 xs:w-64 sm:p-7">
      <Tag tag={tag} />
      <p className="small-regular line-clamp-5">{description}</p>
      <div className="flex-start gap-2 self-start">
        <p className="body-semibold primary-text-gradient">
          {questionsNumber}+
        </p>
        <p className="small-medium text-dark400_light500">Questions</p>
      </div>
    </div>
  );
}
