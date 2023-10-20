import { getUserTopQuestions } from "@/server/actions/user.action";
import QuestionCard from "@/components/cards/QuestionCard";

interface TopQuestionsTabProps {
  userId: string;
}

export default async function TopQuestionsTab({
  userId,
}: TopQuestionsTabProps) {
  const topQuestions = await getUserTopQuestions(userId);

  return (
    <div className="flex-start flex-col gap-4">
      {topQuestions.map((qst) => (
        <QuestionCard
          key={qst._id}
          id={qst._id}
          title={qst.title}
          tags={qst.tags}
          author={qst.author}
          upvotes={qst.upvotes.length}
          views={qst.views}
          answers={qst.answers}
          createdAt={qst.createdAt}
        />
      ))}
    </div>
  );
}
