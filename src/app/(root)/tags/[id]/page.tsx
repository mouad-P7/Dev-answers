import LocalSearch from "@/components/shared/LocalSearch";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import { getTagById } from "@/server/actions/tag.action";

export default async function TagQuestions({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const tag = await getTagById({
    tagId: params.id,
    searchQuery: searchParams.q,
  });

  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-6">
      <p className="h3-bold sm:h2-bold">{tag.name}</p>
      <div className="flex w-full items-center justify-between gap-5">
        <LocalSearch route={`/tags/${params.id}`} otherClasses="sm:w-full">
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
    </div>
  );
}
