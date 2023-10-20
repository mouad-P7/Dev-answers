import Metric from "@/components/shared/Metric";
import { formatDate2 } from "@/lib/format";

interface ProfileMetricProps {
  website: string;
  location: string;
  joinedAt: Date;
}

export default function ProfileMetric({
  website,
  location,
  joinedAt,
}: ProfileMetricProps) {
  return (
    <div className="flex-start flex-wrap gap-4">
      {website && (
        <Metric
          imgUrl="/assets/icons/link.svg"
          alt="link"
          value={website}
          title=""
          textClasses="paragraph-medium text-[#1DA1F2]"
        />
      )}
      {location && (
        <Metric
          imgUrl="/assets/icons/location.svg"
          alt="location"
          value={location}
          title=""
          textClasses="paragraph-medium text-dark400_light700"
        />
      )}
      <Metric
        imgUrl="/assets/icons/calendar.svg"
        alt="calendar"
        value={`Joined ${formatDate2(joinedAt)}`}
        title=""
        textClasses="paragraph-medium text-dark400_light700"
      />
    </div>
  );
}
