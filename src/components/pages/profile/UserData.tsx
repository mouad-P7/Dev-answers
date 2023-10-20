import Image from "next/image";
import ProfileMetric from "./ProfileMetric";
import EditButton from "./EditButton";

interface UserDataProps {
  clerkId: string;
  name: string;
  userName: string;
  picture: string;
  website: string;
  location: string;
  joinedAt: Date;
  bio: string;
}

export default function UserData({
  clerkId,
  name,
  userName,
  picture,
  website,
  location,
  joinedAt,
  bio,
}: UserDataProps) {
  return (
    <div className="relative">
      <EditButton
        clerkId={clerkId}
        otherClasses="absolute right-0 top-0 hidden lg:block"
      />
      <div className="flex gap-3">
        <div className="flex-start min-w-[93px] flex-col gap-3 xs:shrink-0">
          <Image
            src={picture}
            alt="profile"
            width={125}
            height={125}
            className="rounded-full"
          />
          <EditButton clerkId={clerkId} otherClasses="p-2 xs:p-4 lg:hidden" />
        </div>
        <div className="flex shrink flex-col gap-3 xs:p-1">
          <p className="h1-bold text-dark100_light900">{name}</p>
          <p className="paragraph-regular text-dark200_light800">@{userName}</p>
          <div className="hidden sm:block">
            <ProfileMetric
              website={website}
              location={location}
              joinedAt={joinedAt}
            />
          </div>
        </div>
      </div>
      <div className="mt-3 sm:hidden">
        <ProfileMetric
          website={website}
          location={location}
          joinedAt={joinedAt}
        />
      </div>
      <p className="paragraph-regular text-dark400_light800 mt-7">
        {bio === "" ? bio : "No bio."}
      </p>
    </div>
  );
}
