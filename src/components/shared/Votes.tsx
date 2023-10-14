"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VotesProps } from "@/types/props";
import { formatNumber } from "@/lib/format";

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
  async function handleSave() {}

  async function handleVote(action: string) {}

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
