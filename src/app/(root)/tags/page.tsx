import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
import TagCard from "@/components/cards/TagCard";
import { TagsPageFilters } from "@/constants/filters";
import { getAllTags } from "@/server/actions/tag.action";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | Dev Answers",
};

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Tags({ searchParams }: SearchParamsProps) {
  const { tags, isNext } = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-4">
      <p className="h3-bold sm:h2-bold w-full text-start">Tags</p>
      <div className="flex w-full items-center justify-between gap-5 max-xs:flex-col max-xs:items-end max-xs:gap-2">
        <LocalSearch route="/tags" otherClasses="w-full">
          Search by tag name...
        </LocalSearch>
        <Filter
          filters={TagsPageFilters}
          defaultValue="popular"
          otherClasses="w-36 sm:w-40"
        />
      </div>
      {/* <TagsFilter /> */}
      <div className="flex-center w-full flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <TagCard
              key={tag._id}
              tag={{ id: tag._id, name: tag.name }}
              questionsNumber={tag.questions.length}
            />
          ))
        ) : (
          <p className="h3-bold">Tag not found.</p>
        )}
      </div>
      <Pagination
        pageNumber={searchParams?.page ? Number(searchParams.page) : 1}
        isNext={isNext}
      />
    </div>
  );
}
