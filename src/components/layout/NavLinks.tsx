"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";

export default function NavLinks() {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="flex h-full flex-col gap-4 pt-3">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        if (item.route === "/profile") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null;
        }

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient text-light-900"
                  : "text-dark300_light900"
              } link-hover flex items-center justify-start gap-4 rounded-lg bg-transparent p-3`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
}
