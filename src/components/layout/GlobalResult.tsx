"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ReloadIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import GlobalFilter from "./GlobalFilter";
import { globalSearch } from "@/server/actions/general.action";

export default function GlobalResult() {
  const searchParams = useSearchParams();
  const global = searchParams.get("global");
  const type = searchParams.get("type");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    async function fetchResult() {
      setResult([]);
      setIsLoading(true);
      try {
        const data = await globalSearch({
          globalQuery: global,
          typeFilter: type?.toLowerCase(),
        });
        setResult(JSON.parse(data));
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
    if (global) {
      fetchResult();
    }
  }, [global, type]);

  function renderLink(type: string, id: string) {
    if (type === "question" || type === "answer") return `/question/${id}`;
    else if (type === "user") return `/profile/${id}`;
    else if (type === "tag") return `/tags/${id}`;
    else return "/";
  }

  return (
    <div className="shadow-light100_darknone text-dark400_light900 background-light800_dark400 absolute mt-2 max-h-[500px] w-full rounded-xl">
      <div className="flex-start gap-4 border-b p-3">
        <p className="base-semibold text-dark200_light800">Type:</p>
        <GlobalFilter />
      </div>
      <div className="py-3">
        <p className="base-bold text-dark200_light800 mb-2 px-3">Top Match</p>
        <div className="flex flex-col">
          {isLoading ? (
            <div className="flex-start flex-col">
              <ReloadIcon
                width={40}
                height={40}
                className="animate-spin text-primary-500"
              />
              <p className="body-regular mt-3">Searching all database...</p>
            </div>
          ) : (
            <>
              {result.length > 0 ? (
                result.map((item: any, i: number) => (
                  <Link
                    key={i}
                    href={renderLink(item.type, item.id)}
                    className="flex flex-col gap-1 px-3 py-1.5 hover:bg-light-700/50"
                  >
                    <p className="paragraph-semibold line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light-500">{item.type}</p>
                  </Link>
                ))
              ) : (
                <div className="flex-start flex-col">
                  <ExclamationTriangleIcon
                    width={40}
                    height={40}
                    className="text-primary-500"
                  />
                  <p className="body-regular mt-3">No result found</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
