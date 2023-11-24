import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/layout/Footer";
import { sidebarLinks } from "@/constants";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className="relative z-50 min-h-[100vh] w-full">
      {/* Navbar */}
      <Skeleton className="flex-between fixed z-50 h-[72px] w-full gap-6 px-6 py-4">
        <div className="flex-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            alt="Dev Answers"
            width={23}
            height={23}
          />
          <p className="h2-bold text-dark-100 dark:text-light-900 max-sm:hidden">
            Dev <span className="text-primary-500">Answers</span>
          </p>
        </div>
        <Skeleton className="childSkeleton flex-start relative h-[50px] max-w-[800px] grow rounded-xl px-3 max-lg:hidden">
          <p className="paragraph-regular text-dark400_light700">
            Search anything globally...
          </p>
        </Skeleton>
        <div className="flex-end gap-3">
          <Skeleton className="childSkeleton h-[25px] w-[25px]" />
          <Skeleton className="childSkeleton h-10 w-10 rounded-full"></Skeleton>
          <Skeleton className="childSkeleton h-[36px] w-[36px] sm:hidden">
            <Image
              src="/assets/icons/hamburger.svg"
              width={36}
              height={36}
              alt="Menu"
              className="invert-colors sm:hidden"
            />
          </Skeleton>
        </div>
      </Skeleton>

      <div className="flex">
        {/* LeftSideBar */}
        <Skeleton className="sticky left-0 top-0 flex h-screen w-[72px] flex-col gap-4 p-3 pt-24 max-sm:hidden lg:w-[230px]">
          <section className="flex flex-1 flex-col gap-4">
            {sidebarLinks.map((item) => (
              <Skeleton
                key={item.route}
                className="childSkeleton text-dark300_light900
              flex items-center justify-start bg-transparent p-3 lg:gap-4"
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className="invert-colors"
                />
                <p className="base-medium max-lg:hidden">{item.label}</p>
              </Skeleton>
            ))}
          </section>
          <section className="flex flex-col gap-3">
            <div className="small-medium btn-secondary min-h-[41px] w-full rounded-lg p-3 text-center shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="log in"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </div>
            <div className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border p-3 text-center shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </div>
          </section>
        </Skeleton>

        <section className="flex-center min-h-screen flex-1 flex-col gap-4">
          <ReloadIcon
            className="animate-spin text-primary-500"
            width={100}
            height={100}
          />
          <p className="h3-bold text-dark400_light800">Loading...</p>
        </section>

        {/* RightSideBar */}
        <Skeleton className="text-dark500_light700 sticky right-0 top-0 flex h-screen w-[280px] flex-col gap-6 p-3 pt-24 max-xl:hidden">
          <section>
            <p className="h3-bold pb-6">Hot Questions</p>
            <div className="flex-between flex-col gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex w-full cursor-pointer items-start justify-between gap-2"
                >
                  <Skeleton className="childSkeleton h-[17px] w-full"></Skeleton>
                  <Image
                    src="assets/icons/arrow-right.svg"
                    alt="arrow"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </div>
              ))}
            </div>
          </section>
          <section>
            <p className="h3-bold pb-6">Popular Tags</p>
            <div className="flex-between flex-col gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex-between w-full">
                  <Skeleton className="childSkeleton flex-center h-[30px] w-[85px] rounded-lg px-4 py-2">
                    <Skeleton className="h-[15px] w-full"></Skeleton>
                  </Skeleton>
                  <p className="small-medium flex-between gap-2">? Questions</p>
                </div>
              ))}
            </div>
          </section>
        </Skeleton>
      </div>

      <Footer />
    </div>
  );
}
