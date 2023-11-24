import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="text-dark400_light800 flex-center h-full w-full">
      <Skeleton className="flex h-[505px] w-full max-w-[400px] flex-col gap-8 rounded-2xl px-8 py-9">
        <div>
          <Skeleton className="childSkeleton mb-1 h-[27px] w-[85px]" />
          <p className="paragraph-medium">to continue to Dev Answers</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex-start gap-3 rounded-md border border-slate-500 px-5 py-2">
            <GitHubLogoIcon width={20} height={20} />
            <p>Continue with GitHub</p>
          </div>
          <div className="flex-start gap-3 rounded-md border border-slate-500 px-5 py-2">
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              width={20}
              height={20}
            />
            <p>Continue with Google</p>
          </div>
        </div>
        <div className="h-px w-full bg-slate-500"></div>
        <div>
          <p className="paragraph-medium mb-1">Email address or username</p>
          <div className="h-[38px] w-full rounded-md border border-slate-500"></div>
          <Button className="mt-4 w-full bg-blue-700 py-2.5 text-white">
            CONTINUE
          </Button>
        </div>
        <p>
          <span className="text-gray-500">No account? </span>
          <span className="text-blue-700">Sign up</span>
        </p>
      </Skeleton>
    </div>
  );
}
