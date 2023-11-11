import { Skeleton } from "@/components/ui/skeleton";

const childSkeleton = " bg-gray-100/100 dark:bg-gray-900/100 ";

export default function Loading() {
  return (
    <div className="text-dark400_light700 flex w-full flex-col gap-5">
      <div className="light-border relative border-b">
        <Skeleton className="absolute right-0 top-0 hidden h-[40px] w-[105px] lg:block" />
        <div className="flex gap-3">
          <div className="flex-start min-w-[93px] flex-col gap-3 xs:shrink-0">
            <Skeleton className="h-[125px] w-[125px] rounded-full" />
            <Skeleton className="m-2 h-[40px] w-[105px] xs:m-4 lg:hidden" />
          </div>
          <div className="flex shrink flex-col gap-3 xs:m-1">
            <Skeleton className="h-[26px] w-[155px]" />
            <Skeleton className="h-[18px] w-[135px]" />
            <div className="hidden sm:block">
              <Skeleton className="h-[20px] w-[390px]" />
            </div>
          </div>
        </div>
        <div className="mt-3 sm:hidden">
          <Skeleton className="max-sx:w-[340px] h-[20px] w-full" />
        </div>
        <div className="my-4">
          <Skeleton className="my-1 h-[20px] w-full" />
          <Skeleton className="my-1 h-[20px] w-full" />
        </div>
      </div>

      <p className="h3-semibold text-dark200_light900">Stats</p>
      <div className="flex-start light-border flex-wrap gap-4 border-b pb-4">
        <Skeleton className="flex-center h-[80px] grow gap-7 rounded-lg px-6 py-4 xs:grow-0">
          <div className="flex flex-col gap-2">
            <Skeleton className={`h-[18px] w-[55px] ${childSkeleton}`} />
            <p className="body-medium">Questions</p>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className={`h-[18px] w-[55px] ${childSkeleton}`} />
            <p className="body-medium">Answers</p>
          </div>
        </Skeleton>
      </div>

      <Skeleton className="background-light800_dark400 flex-between mb-4 min-h-[42px] w-[230px] gap-2 p-1">
        <Skeleton className={`h-[90%] p-2 ${childSkeleton}`}>
          Top Posts
        </Skeleton>
        <Skeleton className={`h-[90%] p-2 ${childSkeleton}`}>
          Top Answers
        </Skeleton>
      </Skeleton>

      <div className="flex-start w-full flex-col gap-4">
        {[1, 2, 3].map((item) => (
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
