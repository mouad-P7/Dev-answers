import UserData from "@/components/pages/profile/UserData";
import StatCard from "@/components/cards/StatCard";
import { getUserData } from "@/server/actions/user.action";

export default async function Profile({ params }: { params: { id: string } }) {
  const { user, totalQuestions, totalAnswers } = await getUserData(params.id);

  return (
    <div className="flex flex-col gap-7">
      <UserData
        clerkId={user.clerkId}
        name={user.name}
        userName={user.userName}
        picture={user.picture}
        website={user.portfolioWebsite}
        location={user.location}
        joinedAt={user.joinedAt}
        bio={user.bio}
      />
      <p className="h3-semibold text-dark200_light900">Stats</p>
      <div className="flex-start flex-wrap gap-4">
        <StatCard
          type="basic"
          questionsNum={totalQuestions}
          answersNum={totalAnswers}
        />
        <StatCard type="badge" badgeName="gold" badgeNum={111} />
        <StatCard type="badge" badgeName="silver" badgeNum={111} />
        <StatCard type="badge" badgeName="bronze" badgeNum={111} />
      </div>
      <div>other data ctr</div>
    </div>
  );
}
