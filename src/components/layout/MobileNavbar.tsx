import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedOut } from "@clerk/nextjs";
import NavLinks from "./NavLinks";

export default function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 w-[240px] p-3"
      >
        <Link href="/" className="flex-start gap-1 px-3 py-4">
          <Image
            src="/assets/images/site-logo.svg"
            alt="Dev Answers"
            width={23}
            height={23}
          />
          <p className="h2-bold text-dark-100 dark:text-light-900">
            Dev <span className="text-primary-500">Answers</span>
          </p>
        </Link>
        <div className="flex flex-col gap-8">
          <SheetClose asChild>
            <NavLinks />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
