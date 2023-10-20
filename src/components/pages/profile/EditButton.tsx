import Link from "next/link";
import { auth, SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface EditButtonProps {
  clerkId: string;
  otherClasses: string;
}

export default function EditButton({ clerkId, otherClasses }: EditButtonProps) {
  const { userId } = auth();

  return (
    <SignedIn>
      {userId === clerkId && (
        <Link href="/profile/edit">
          <Button
            className={`btn-secondary paragraph-medium text-dark300_light900 ${otherClasses}`}
          >
            Edit Profile
          </Button>
        </Link>
      )}
    </SignedIn>
  );
}
