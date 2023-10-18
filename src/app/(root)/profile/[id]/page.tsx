import UserData from "@/components/pages/profile/UserData";
import StatCard from "@/components/cards/StatCard";

export default function Profile({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-7">
      <UserData />
      <p className="paragraph-regular text-dark400_light800">
        Launch your development career with project-based coaching - showcase
        your skills with practical development experience and land the coding
        career of your dreams. Check out jsmastery.pro.
      </p>
      <p className="h3-semibold text-dark200_light900">Stats</p>
      <div className="flex-start flex-wrap gap-4">
        <StatCard type="basic" questionsNum={156} answersNum={101} />
        <StatCard type="badge" badgeName="gold" badgeNum={15} />
        <StatCard type="badge" badgeName="silver" badgeNum={23} />
        <StatCard type="badge" badgeName="bronze" badgeNum={38} />
      </div>
      <div>other data ctr</div>
    </div>
  );
}
