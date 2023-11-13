"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { deleteQuestionById } from "@/server/actions/question.action";
import { deleteAnswerById } from "@/server/actions/answer.action";
import { useToast } from "@/components/ui/use-toast";
import { capitalize } from "@/lib/format";

interface EditDeleteProps {
  type: "question" | "answer";
  typeId: string;
  clerkId: string;
}

export default function EditDelete({ type, typeId, clerkId }: EditDeleteProps) {
  const { userId } = useAuth();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleDeleteAction(type: "question" | "answer") {
    setIsLoading(true);
    if (type === "question") {
      await deleteQuestionById(typeId, pathname);
    } else if (type === "answer") {
      await deleteAnswerById(typeId, pathname);
    }
    toast({
      title: `${capitalize(type)} Deleted`,
      description: `Your ${type} has successfully been deleted.`,
      variant: "destructive",
    });
    setIsLoading(false);
  }

  return (
    <SignedIn>
      {pathname.startsWith("/profile/") && userId === clerkId && (
        <div className="flex-start gap-3 pl-3">
          {type === "question" && (
            <Link href={`/question/edit/${typeId}`}>
              <Button className="p-0">
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={14}
                  height={14}
                />
              </Button>
            </Link>
          )}
          <Button
            disabled={isLoading}
            className="p-0"
            onClick={() => handleDeleteAction(type)}
          >
            <Image
              src="/assets/icons/trash.svg"
              alt="delete"
              width={14}
              height={14}
            />
          </Button>
        </div>
      )}
    </SignedIn>
  );
}
