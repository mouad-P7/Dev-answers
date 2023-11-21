import LocalSearch from "@/components/shared/LocalSearch";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getTagById } from "@/server/actions/tag.action";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { tag } = await getTagById({ tagId: params.id });
  return { title: `${tag.name} | Dev Answers` };
}

export default async function TagQuestions({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const { tag, isNext } = await getTagById({
    tagId: params.id,
    searchQuery: searchParams.q,
    page: searchParams?.page ? Number(searchParams.page) : 1,
  });

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-4">
      <p className="h3-bold sm:h2-bold w-full">{tag.name}</p>
      <div className="flex w-full items-center justify-between gap-5 max-xs:flex-col max-xs:items-end max-xs:gap-2">
        <LocalSearch route={`/tags/${params.id}`} otherClasses="w-full">
          Search tag questions...
        </LocalSearch>
      </div>
      <div className="flex-start w-full flex-col gap-4">
        {tag.questions.length > 0 ? (
          tag.questions.map((qst: any) => (
            <QuestionCard
              key={qst.id}
              id={qst.id}
              title={qst.title}
              tags={qst.tags}
              author={qst.author}
              upvotes={qst.upvotes.length}
              views={qst.views}
              answers={qst.answers.length}
              createdAt={qst.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question about this tag and kickstart the discussion 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <Pagination
        pageNumber={searchParams?.page ? Number(searchParams.page) : 1}
        isNext={isNext}
      />
    </div>
  );
}
