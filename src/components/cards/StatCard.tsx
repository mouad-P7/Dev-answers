import Image from "next/image";
import { formatNumber } from "@/lib/format";

interface StatProps {
  number: number | undefined;
  title: string | undefined;
}
function Stat({ number, title }: StatProps) {
  return (
    <div className="">
      <p className="paragraph-semibold text-dark200_light900 text-center">
        {formatNumber(number || 0)}
      </p>
      <p className="body-medium text-dark400_light700">{title}</p>
    </div>
  );
}

// ==============================================

interface StatCardProps {
  type: "basic" | "badge";
  questionsNum?: number;
  answersNum?: number;
  badgeName?: "gold" | "silver" | "bronze";
  badgeNum?: number;
}
export default function StatCard({
  type,
  questionsNum,
  answersNum,
  badgeName,
  badgeNum,
}: StatCardProps) {
  return (
    <div className="flex-center background-light900_dark200 h-[80px] grow gap-7 rounded-lg px-6 py-4 shadow-light-300 dark:shadow-none xs:grow-0">
      {type === "basic" && (
        <>
          <Stat number={questionsNum} title="Questions" />
          <Stat number={answersNum} title="Answers" />
        </>
      )}
      {type === "badge" && (
        <>
          <Image
            src={`/assets/icons/${badgeName}-medal.svg`}
            alt="badge"
            width={36}
            height={50}
          />
          <Stat number={badgeNum} title={badgeName} />
        </>
      )}
    </div>
  );
}
