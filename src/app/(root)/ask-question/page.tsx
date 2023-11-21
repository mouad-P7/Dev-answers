import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/server/actions/user.action";
import QuestionForm from "@/components/forms/QuestionForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Question | Dev Answers",
};

export default async function AskQuestion() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm type="post" mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
}
