import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/server/actions/user.action";
import { getQuestionById } from "@/server/actions/question.action";
import QuestionForm from "@/components/forms/QuestionForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Question | Dev Answers",
};

export default async function EditQuestion({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  const question = await getQuestionById(params.id);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit a question</h1>
      <div className="mt-9">
        <QuestionForm
          type="edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          question={JSON.stringify(question)}
        />
      </div>
    </div>
  );
}
