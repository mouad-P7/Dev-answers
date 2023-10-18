import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditButton({ otherClasses }: { otherClasses: string }) {
  return (
    <Button
      className={`btn paragraph-medium text-dark300_light900 ${otherClasses}`}
    >
      <Link href="/edit-profile">Edit Profile</Link>
    </Button>
  );
}
