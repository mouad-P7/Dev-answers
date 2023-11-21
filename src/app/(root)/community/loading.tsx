import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="text-dark100_light900 flex w-full flex-col gap-6">
      <p className="h3-bold sm:h2-bold w-full text-start">All Users</p>
      <div className="flex w-full items-center justify-between gap-5">
        <Skeleton className="h-[50px] grow" />
        <Skeleton className="h-[40px] w-[144px]" />
      </div>
      <div className="flex-center w-full flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton
            key={item}
            className="flex-center h-[280px] w-full flex-col gap-4 rounded-lg p-4 xs:w-[20rem]"
          >
            <Skeleton className="childSkeleton h-[100px] w-[100px] rounded-full" />
            <Skeleton className="childSkeleton h-6 w-[256px]" />
            <div className="flex-center flex gap-3">
              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  className="childSkeleton h-[30px] w-[85px]"
                />
              ))}
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
