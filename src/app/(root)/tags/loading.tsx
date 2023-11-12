import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-6">
      <p className="h3-bold sm:h2-bold w-full text-start">Tags</p>
      <div className="flex w-full items-center justify-between gap-5">
        <Skeleton className="h-[50px] grow" />
        <Skeleton className="h-[40px] w-[144px]" />
      </div>
      <div className="flex-center w-full flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
          <Skeleton
            key={item}
            className="card-wrapper light-border background-light900_dark200 text-dark500_light700 flex-start w-full flex-col gap-4 rounded-lg p-4 xs:w-40"
          >
            <Skeleton className="childSkeleton h-[30px] w-[115px]" />
            <div className="flex-center gap-2">
              <p className="body-semibold primary-text-gradient">??</p>
              <p className="small-medium text-dark400_light500">Questions</p>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
