import Link from "next/link";
import Image from "next/image";
import { UserButton, SignedIn } from "@clerk/nextjs";
import Theme from "./Theme";
import MobileNavbar from "./MobileNavbar";
import GlobalSearch from "./GlobalSearch";

export default function Navbar() {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-6 px-6 py-4 shadow-light-300 dark:shadow-none">
      <Link href="/" className="flex-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          alt="Dev Answers"
          width={23}
          height={23}
        />
        <p className="h2-bold text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev <span className="text-primary-500">Answers</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-end gap-3">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: "h-10 w-10" },
              variables: { colorPrimary: "#ff7000" },
            }}
          />
        </SignedIn>
        <MobileNavbar />
      </div>
    </nav>
  );
}
