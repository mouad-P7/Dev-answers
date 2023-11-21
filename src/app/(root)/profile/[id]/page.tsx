import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserData from "@/components/pages/profile/UserData";
import StatCard from "@/components/cards/StatCard";
import { getUserData } from "@/server/actions/user.action";
import TopQuestionsTab from "@/components/pages/profile/TopQuestionsTab";
import TopAnswersTab from "@/components/pages/profile/TopAnswersTab";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { user } = await getUserData(params.id);
  return { title: `${user.name} | Dev Answers` };
}

interface ProfileParams {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function Profile({ params, searchParams }: ProfileParams) {
  const { user, totalQuestions, totalAnswers } = await getUserData(params.id);

  return (
    <div className="flex flex-col gap-5">
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
      <div className="flex-start light-border flex-wrap gap-4 border-b pb-4">
        <StatCard
          type="basic"
          questionsNum={totalQuestions}
          answersNum={totalAnswers}
        />
        {/* <StatCard type="badge" badgeName="gold" badgeNum={111} />
        <StatCard type="badge" badgeName="silver" badgeNum={111} />
        <StatCard type="badge" badgeName="bronze" badgeNum={111} /> */}
      </div>

      <Tabs defaultValue="top-posts" className="">
        <TabsList className="background-light800_dark400 mb-4 min-h-[42px] p-1">
          <TabsTrigger value="top-posts" className="tab">
            Top Posts
          </TabsTrigger>
          <TabsTrigger value="top-answers" className="tab">
            Top Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="top-posts">
          <TopQuestionsTab userId={user._id} searchParams={searchParams} />
        </TabsContent>
        <TabsContent value="top-answers">
          <TopAnswersTab userId={user._id} searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
