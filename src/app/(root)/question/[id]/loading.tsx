import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex-between flex-wrap gap-3">
          <div className="flex-start gap-1">
            <Skeleton className="h-[18px] w-[18px] rounded-full" />
            <Skeleton className="h-[18px] w-[300px]" />
          </div>
          <Skeleton className="h-[25px] w-[200px]" />
        </div>
        <div>
          <Skeleton className="mb-1.5 h-[26px] w-full" />
          <Skeleton className="h-[26px] w-[50%]" />
        </div>

        <Skeleton className="h-[18px] w-[300px]" />
        <Skeleton className="flex w-full flex-col gap-3 p-4">
          <Skeleton className="childSkeleton h-[16px] w-[50%]" />
          <Skeleton className="childSkeleton h-[16px] w-[25%]" />
          <Skeleton className="childSkeleton h-[16px] w-full" />
          <Skeleton className="childSkeleton h-[16px] w-[85%]" />
          <Skeleton className="childSkeleton h-[16px] w-[10%]" />
        </Skeleton>
        <div className="flex-start gap-2">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-[30px] w-[85px]" />
          ))}
        </div>
      </div>

      <div className="mt-11 flex flex-col gap-4">
        <div className="flex-between flex-wrap">
          <p className="paragraph-medium primary-text-gradient">Answers</p>
          <Skeleton className="h-[40px] w-[144px]" />
        </div>
        <div className="light-border flex flex-col gap-4 border-b py-5">
          <div className="flex-between flex-wrap">
            <div className="flex-start mb-2 gap-1">
              <Skeleton className="h-[18px] w-[18px] rounded-full" />
              <Skeleton className="h-[18px] w-[300px]" />
            </div>
            <Skeleton className="h-[25px] w-[135px]" />
          </div>
          <Skeleton className="flex w-full flex-col gap-3 p-4">
            <Skeleton className="childSkeleton h-[16px] w-[50%]" />
            <Skeleton className="childSkeleton h-[16px] w-[25%]" />
            <Skeleton className="childSkeleton h-[16px] w-full" />
            <Skeleton className="childSkeleton h-[16px] w-[85%]" />
            <Skeleton className="childSkeleton h-[16px] w-[10%]" />
          </Skeleton>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <p className="paragraph-semibold text-dark400_light800">
            Write your answer here
          </p>
          <div className="btn flex-start light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
            <Image
              src="/assets/icons/stars.svg"
              alt="star"
              width={12}
              height={12}
              className="object-contain"
            />
            Generate AI Answer
          </div>
        </div>
        <Skeleton className="h-[300px] w-full" />
        <div className="flex justify-end">
          <Skeleton className="primary-gradient flex-center h-[35px] w-[155px] text-white">
            Submit
          </Skeleton>
        </div>
      </div>
    </>
  );
}
