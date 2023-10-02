import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TagProps } from "@/types/props";

export default function Tag({ tag }: TagProps) {
  return (
    <Link href={`/tags/${tag.id}`}>
      <Badge className="background-light800_dark300 text-light400_light500 subtle-medium rounded-lg px-4 py-2 uppercase">
        {tag.name}
      </Badge>
    </Link>
  );
}
