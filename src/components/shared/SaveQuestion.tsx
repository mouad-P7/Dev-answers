"use client";

import { useState } from "react";
import Image from "next/image";
import { ReloadIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { saveQuestion } from "@/server/actions/user.action";

interface SaveQuestionProps {
  userId: string;
  questionId: string;
  hasSaved?: boolean;
}

export default function SaveQuestion({
  userId,
  questionId,
  hasSaved,
}: SaveQuestionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const pathname = usePathname();

  async function handleSave() {
    setIsSaving(true);
    if (!userId) {
      setIsSaving(false);
      return toast({
        title: "Please Log In",
        description: `You must be logged in to save question.`,
      });
    }
    await saveQuestion({
      questionId: JSON.parse(questionId),
      userId: JSON.parse(userId),
      path: pathname,
    });
    toast({
      title: `Question ${
        !hasSaved ? "Saved in" : "Removed from"
      } your collection`,
    });
    setIsSaving(false);
  }

  if (
    !pathname.startsWith("/collection") &&
    !pathname.startsWith("/question/")
  ) {
    return null;
  }

  return (
    <div className="flex-start">
      <Button disabled={isSaving} className="p-0" onClick={() => handleSave()}>
        {isSaving ? (
          <ReloadIcon
            className="animate-spin text-primary-500"
            width={18}
            height={18}
          />
        ) : (
          <Image
            src={`/assets/icons/${hasSaved ? "star-filled" : "star-red"}.svg`}
            alt="star"
            width={18}
            height={18}
          />
        )}
      </Button>
    </div>
  );
}
