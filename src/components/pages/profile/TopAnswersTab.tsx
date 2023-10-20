import { getUserTopAnswers } from "@/server/actions/user.action";
import AnswerCard from "@/components/cards/AnswerCard";

interface TopAnswersTabProps {
  userId: string;
}

export default async function TopAnswersTab({ userId }: TopAnswersTabProps) {
  const topAnswers = await getUserTopAnswers(userId);

  return (
    <div className="flex-start flex-col gap-4">
      {topAnswers.map((answer) => (
        <AnswerCard
          key={answer._id}
          id={answer.question._id}
          title={answer.question.title}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
    </div>
  );
}
