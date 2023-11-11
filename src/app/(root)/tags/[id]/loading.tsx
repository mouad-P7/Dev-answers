import { Skeleton } from "@/components/ui/skeleton";

const childSkeleton = " bg-gray-100/100 dark:bg-gray-900/100 ";

export default function Loading() {
  return (
    <div className="text-dark100_light900 flex w-full flex-col gap-6">
      <Skeleton className="h-[26px] w-[250px]" />
      <div className="flex w-full items-center justify-between gap-5">
        <Skeleton className="h-[50px] grow" />
        <Skeleton className="h-[40px] w-[144px]" />
      </div>
      <div className="flex-start w-full flex-col gap-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton
            key={item}
            className="flex h-[158px] w-full flex-col gap-3 p-4 sm:p-8"
          >
            <Skeleton className={`h-[26px] w-[90%] ${childSkeleton}`} />
            <div className="flex-start gap-2">
              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  className={`h-[30px] w-[85px] ${childSkeleton}`}
                />
              ))}
            </div>
            <div className="flex-between flex-wrap gap-3">
              <div className="flex-start gap-1">
                <Skeleton
                  className={`h-[17px] w-[17px] rounded-full ${childSkeleton}`}
                />
                <Skeleton className={`h-[16px] w-[250px] ${childSkeleton}`} />
              </div>
              <Skeleton className={`h-[16px] w-[107px] ${childSkeleton}`} />
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
