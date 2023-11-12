import { Skeleton } from "@/components/ui/skeleton";

const childSkeleton = " bg-gray-100/100 dark:bg-gray-900/100 ";

export default function loading() {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9 space-y-8">
        <div className="flex w-full flex-col">
          <p className="paragraph-semibold text-dark400_light800">
            Full Name <span className="text-primary-500">*</span>
          </p>
          <Skeleton className="light-border-2 mt-3.5 h-[56px] w-full border p-4">
            <Skeleton className={`h-[20px] w-[180px] ${childSkeleton}`} />
          </Skeleton>
        </div>

        <div className="flex w-full flex-col">
          <p className="paragraph-semibold text-dark400_light800">
            Username <span className="text-primary-500">*</span>
          </p>
          <Skeleton className="light-border-2 mt-3.5 h-[56px] w-full border p-4">
            <Skeleton className={`h-[20px] w-[150px] ${childSkeleton}`} />
          </Skeleton>
        </div>

        <div className="flex w-full flex-col">
          <p className="paragraph-semibold text-dark400_light800">
            Portfolio Link
          </p>
          <Skeleton className="light-border-2 mt-3.5 h-[56px] w-full border p-4">
            <Skeleton className={`h-[20px] w-[240px] ${childSkeleton}`} />
          </Skeleton>
        </div>

        <div className="flex w-full flex-col">
          <p className="paragraph-semibold text-dark400_light800">Location</p>
          <Skeleton className="light-border-2 mt-3.5 h-[56px] w-full border p-4">
            <Skeleton className={`h-[20px] w-[240px] ${childSkeleton}`} />
          </Skeleton>
        </div>

        <div className="flex w-full flex-col">
          <p className="paragraph-semibold text-dark400_light800">Bio</p>
          <Skeleton className="light-border-2 mt-3.5 h-[56px] w-full border p-4">
            <Skeleton className={`h-[20px] w-full ${childSkeleton}`} />
          </Skeleton>
        </div>

        <div className="flex justify-end">
          <Skeleton className="primary-gradient flex-center h-[40px] w-[65px] text-white">
            Save
          </Skeleton>
        </div>
      </div>
    </>
  );
}
