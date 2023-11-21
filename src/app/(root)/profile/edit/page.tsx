import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/server/actions/user.action";
import ProfileForm from "@/components/forms/ProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | Dev Answers",
};

export default async function EditProfile() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <ProfileForm user={JSON.stringify(mongoUser)} clerkId={userId} />
      </div>
    </div>
  );
}
