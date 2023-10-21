"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface EditDeleteProps {
  type: "question" | "answer";
  typeId: string;
  clerkId: string;
}

export default function EditDelete({ type, typeId, clerkId }: EditDeleteProps) {
  const { userId } = useAuth();
  const pathname = usePathname();

  async function handleDeleteAction(type: "question" | "answer") {
    if (type === "question") {
      // await deleteQuestionById();
      // show toast
    } else if (type === "answer") {
      // await deleteAnswerById();
      // show toast
    }
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
          <Button className="p-0" onClick={() => handleDeleteAction(type)}>
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
