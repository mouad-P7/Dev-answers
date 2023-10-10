import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
import TagCard from "@/components/cards/TagCard";
import { TagsPageFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";

export default async function Tags() {
  const result = await getAllTags({});

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-6">
      <p className="h3-bold sm:h2-bold w-full text-start">Tags</p>
      <div className="flex w-full items-center justify-between gap-5">
        <LocalSearch otherClasses="sm:w-full">
          Search by tag name...
        </LocalSearch>
        <Filter filters={TagsPageFilters} otherClasses="w-36 sm:w-40" />
      </div>
      {/* <TagsFilter /> */}
      <div className="flex-center w-full flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <TagCard
              key={tag._id}
              tag={{ id: tag._id, name: tag.name }}
              description="Test often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS"
              questionsNumber={tag.questions.length}
            />
          ))
        ) : (
          <p className="h3-bold">No tags yet</p>
        )}
      </div>
    </div>
  );
}
