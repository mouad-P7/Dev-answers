import Link from "next/link";
import Image from "next/image";
import Tag from "@/components/shared/Tag";
import { getTopInteractedTags } from "@/server/actions/tag.action";

interface UserCardProps {
  id: string;
  clerkId?: string;
  picture: string;
  name: string;
  userName: string;
}

export default async function UserCard({
  id,
  clerkId,
  picture,
  name,
  userName,
}: UserCardProps) {
  const interactedTags = await getTopInteractedTags({ userId: id });

  return (
    <div className="card-wrapper text-dark200_light900 flex-center h-[280px] w-full flex-col gap-4 rounded-lg p-4 xs:w-[20rem]">
      <Link
        href={`/profile/${clerkId}`}
        className="flex-center flex flex-col gap-3"
      >
        <Image
          src={picture}
          alt="profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <p className="h3-bold line-clamp-1">{name}</p>
        <p className="body-regular text-dark500_light500 line-clamp-1">
          @{userName}
        </p>
      </Link>
      <div className="flex-center flex gap-3">
        {interactedTags.length > 0
          ? interactedTags.map((tag) => (
              <Tag key={tag._id} tag={{ id: tag._id, name: tag.name }} />
            ))
          : null}
      </div>
    </div>
  );
}
