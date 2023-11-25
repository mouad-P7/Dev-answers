"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";

export default function LeftSidebar() {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <aside className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 z-40 flex h-screen w-[72px] flex-col gap-4 overflow-x-visible border-r p-3 pt-24 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[230px]">
      <section className="flex flex-1 flex-col gap-4">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            if (userId) item.route = `${item.route}/${userId}`;
            else return null;
          }

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light-900"
                  : "text-dark300_light900"
              } link-hover group relative flex items-center justify-start rounded-lg bg-transparent p-3 lg:gap-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
              <div className="text-dark300_light900 background-light800_dark400 shadow-light100_dark100  absolute left-12 z-50 m-2 w-auto min-w-max origin-left scale-0 rounded-md p-3 text-xs font-bold transition-all duration-100 group-hover:scale-100  max-sm:hidden lg:hidden">
                {item.label}
              </div>
            </Link>
          );
        })}
      </section>
      <SignedOut>
        <section className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary group relative min-h-[41px] w-full rounded-lg p-3 shadow-none">
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
              <div className="text-dark300_light900 background-light800_dark400 shadow-light100_dark100  absolute left-12 z-50 m-2 w-auto min-w-max origin-left scale-0 rounded-md p-3 text-xs font-bold transition-all duration-100 group-hover:scale-100  max-sm:hidden lg:hidden">
                Log In
              </div>
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 group relative min-h-[41px] w-full rounded-lg border p-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
              <div className="text-dark300_light900 background-light800_dark400 shadow-light100_dark100  absolute left-12 z-50 m-2 w-auto min-w-max origin-left scale-0 rounded-md p-3 text-xs font-bold transition-all duration-100 group-hover:scale-100  max-sm:hidden lg:hidden">
                Sign Up
              </div>
            </Button>
          </Link>
        </section>
      </SignedOut>
    </aside>
  );
}
