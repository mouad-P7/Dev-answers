import Image from "next/image";
import ProfileMetric from "./ProfileMetric";
import EditButton from "./EditButton";

export default function UserData() {
  return (
    <div className="relative">
      <EditButton otherClasses="absolute right-0 top-0 hidden lg:block" />
      <div className="flex gap-3">
        <div className="flex-start min-w-[93px] flex-col gap-3 xs:shrink-0">
          <Image
            src="/assets/images/default-logo.svg"
            alt="profile"
            width={120}
            height={120}
          />
          <EditButton otherClasses="p-2 xs:p-4 lg:hidden" />
        </div>
        <div className="flex shrink flex-col gap-3 p-1 xs:p-3">
          <p className="h1-bold text-dark100_light900">Javascript Mastery</p>
          <p className="paragraph-regular text-dark200_light800">
            @jsmasterypro
          </p>
          <div className="hidden sm:block">
            <ProfileMetric />
          </div>
        </div>
      </div>
      <div className="mt-3 sm:hidden">
        <ProfileMetric />
      </div>
    </div>
  );
}
