"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatNumber, capitalize } from "@/lib/format";
import { voteQuestion } from "@/server/actions/question.action";
import { voteAnswer } from "@/server/actions/answer.action";
import { saveQuestion } from "@/server/actions/user.action";
import { viewQuestion } from "@/server/actions/interaction.action";
import { useToast } from "@/components/ui/use-toast";

interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

export default function Votes({
  type,
  itemId,
  userId,
  upvotes,
  hasUpVoted,
  downvotes,
  hasDownVoted,
  hasSaved,
}: VotesProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  async function handleSave() {
    if (!userId) {
      return toast({
        title: "Please Log In",
        description: `You must be logged in to save question.`,
      });
    }
    await saveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });
    toast({
      title: `Question ${
        !hasSaved ? "Saved in" : "Removed from"
      } your collection`,
    });
  }

  async function handleVote(action: string) {
    if (!userId) {
      return toast({
        title: "Please Log In",
        description: `You must be logged in to ${action} ${type}.`,
      });
    }
    if (type === "question") {
      await voteQuestion({
        action,
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        hasUpVoted,
        hasDownVoted,
        path: pathname,
      });
    } else if (type === "answer") {
      await voteAnswer({
        action,
        answerId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        hasUpVoted,
        hasDownVoted,
        path: pathname,
      });
    }
    if (action === "upvote") {
      return toast({
        title: `${capitalize(type)} Upvote ${hasUpVoted ? "Removed" : "Added"}`,
      });
    } else if (action === "downvote") {
      return toast({
        title: `${capitalize(type)} Downvote ${
          hasDownVoted ? "Removed" : "Added"
        }`,
      });
    }
  }

  return (
    <div className="flex-start gap-3">
      <div className="flex-start gap-1">
        <Button className="p-0" onClick={() => handleVote("upvote")}>
          <Image
            src={`/assets/icons/${hasUpVoted ? "upvoted" : "upvote"}.svg`}
            alt="upvote"
            width={18}
            height={18}
          />
        </Button>
        <div className="flex-center background-light700_dark400 h-5 w-5 rounded-sm">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>
      <div className="flex-start gap-1">
        <Button className="p-0" onClick={() => handleVote("downvote")}>
          <Image
            src={`/assets/icons/${hasDownVoted ? "downvoted" : "downvote"}.svg`}
            alt="downvote"
            width={18}
            height={18}
          />
        </Button>
        <div className="flex-center background-light700_dark400 h-5 w-5 rounded-sm">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
      {type === "question" ? (
        <div className="flex-start">
          <Button className="p-0" onClick={() => handleSave()}>
            <Image
              src={`/assets/icons/${hasSaved ? "star-filled" : "star-red"}.svg`}
              alt="star"
              width={18}
              height={18}
            />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
