import Metric from "@/components/shared/Metric";

export default function ProfileMetric() {
  return (
    <div className="flex-start flex-wrap gap-4">
      <Metric
        imgUrl="/assets/icons/link.svg"
        alt="link"
        value="jsmastery.pro"
        title=""
        textClasses="paragraph-medium text-[#1DA1F2]"
      />
      <Metric
        imgUrl="/assets/icons/location.svg"
        alt="location"
        value="Mumbai, India"
        title=""
        textClasses="paragraph-medium text-dark400_light700"
      />
      <Metric
        imgUrl="/assets/icons/calendar.svg"
        alt="calendar"
        value="Joined May 2023"
        title=""
        textClasses="paragraph-medium text-dark400_light700"
      />
    </div>
  );
}
