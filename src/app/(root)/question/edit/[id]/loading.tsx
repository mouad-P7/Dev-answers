import { Skeleton } from "@/components/ui/skeleton";

const childSkeleton = " bg-gray-100/100 dark:bg-gray-900/100 ";

export default function Loading() {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit a question</h1>
      <div className="mt-9 space-y-8">
        <div className="flex w-full flex-col">
          <p className="paragraph-semibold text-dark400_light800">
            Question Title <span className="text-primary-500">*</span>
          </p>
          <Skeleton className="light-border-2 mt-3.5 h-[56px] w-full border p-4">
            <Skeleton
              className={`h-[20px] w-full max-w-[550px] ${childSkeleton}`}
            />
          </Skeleton>
          <p className="body-regular mt-2.5 text-light-500">
            Be specific and imagine you&apos;re asking a question to another
            person.
          </p>
        </div>

        <div className="flex w-full flex-col">
          <p className="paragraph-semibold text-dark400_light800">
            Detailed explanation of your problem?{" "}
            <span className="text-primary-500">*</span>
          </p>
          <Skeleton className="mt-3.5 flex h-[500px] w-full flex-col gap-4 p-4">
            <Skeleton className={`h-[16px] w-[50%] ${childSkeleton}`} />
            <Skeleton className={`h-[16px] w-[25%] ${childSkeleton}`} />
            <Skeleton className={`h-[16px] w-[10%] ${childSkeleton}`} />
            <Skeleton className={`h-[16px] w-full ${childSkeleton}`} />
            <Skeleton className={`h-[16px] w-[85%] ${childSkeleton}`} />
            <Skeleton className={`h-[16px] w-[85%] ${childSkeleton}`} />
            <Skeleton className={`h-[16px] w-[10%] ${childSkeleton}`} />
          </Skeleton>
          <p className="body-regular mt-2.5 text-light-500">
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </p>
        </div>

        <div className="flex w-full flex-col">
          <p className="paragraph-semibold text-dark400_light800">
            Tags <span className="text-primary-500">*</span>
          </p>
          <Skeleton className="light-border-2 my-3.5 h-[56px] w-full border" />
          <div className="flex-start gap-2">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-[30px] w-[85px]" />
            ))}
          </div>
          <p className="body-regular mt-2.5 text-light-500">
            Add up to 3 tags to describe what your question is about. You need
            to press enter to add a tag.
          </p>
        </div>

        <div className="flex justify-end">
          <Skeleton className="primary-gradient flex-center h-[40px] w-[133px] text-white">
            Edit Question
          </Skeleton>
        </div>
      </div>
    </>
  );
}
