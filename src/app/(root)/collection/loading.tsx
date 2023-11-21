import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="text-dark100_light900 flex w-full flex-col gap-6">
      <p className="h3-bold sm:h2-bold">Saved Questions</p>
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
            <Skeleton className="childSkeleton h-[26px] w-[90%]" />
            <div className="flex-start gap-2">
              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  className="childSkeleton h-[30px] w-[85px]"
                />
              ))}
            </div>
            <div className="flex-between flex-wrap gap-3">
              <div className="flex-start gap-1">
                <Skeleton className="childSkeleton h-[17px] w-[17px] rounded-full" />
                <Skeleton className="childSkeleton h-[16px] w-[250px]" />
              </div>
              <Skeleton className="childSkeleton h-[16px] w-[107px]" />
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
