import Link from "next/link";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "@/components/ui/button";
import LocalSearch from "@/components/shared/LocalSearch";
import Filter from "@/components/shared/Filter";
import HomeFilter from "@/components/home/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";

const questions = [
  {
    id: "1",
    title:
      "JavaScript validation for a form stops the form data from being submitted to mysql database",
    tags: [
      { id: "1", name: "javascript" },
      { id: "2", name: "sql" },
    ],
    author: {
      id: "1",
      name: "John Doe",
      picture: "john-doe.jpg",
    },
    upvotes: 1500000,
    views: 500552,
    answers: [],
    createdAt: new Date("2023-09-01T12:00:00.000Z"),
  },
  {
    id: "2",
    title: "How to center a div?",
    tags: [
      { id: "3", name: "css" },
      { id: "4", name: "html" },
    ],
    author: {
      id: "2",
      name: "Jane Smith",
      picture: "jane-smith.jpg",
    },
    upvotes: 5,
    views: 50,
    answers: [],
    createdAt: new Date("2021-09-02T10:30:00.000Z"),
  },
  {
    id: "3",
    title: "How to create a SAAS?",
    tags: [{ id: "5", name: "saas" }],
    author: {
      id: "3",
      name: "Mouad Ananouch",
      picture: "mouad-ananouch.jpg",
    },
    upvotes: 0,
    views: 0,
    answers: [],
    createdAt: new Date("2023-10-01T10:30:00.000Z"),
  },
];

export default function Home() {
  return (
    <div className="text-dark100_light900 flex-start w-full flex-col gap-6">
      <div className="flex-between w-full">
        <p className="h3-bold sm:h2-bold">All Questions</p>
        <Link href="/ask-question">
          <Button className="paragraph-medium primary-gradient w-36 text-light-900 sm:w-40">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="flex w-full items-center justify-between gap-5">
        <LocalSearch otherClasses="sm:w-full">Search a question...</LocalSearch>
        <Filter
          filters={HomePageFilters}
          containerClasses="lg:hidden"
          otherClasses="w-36 sm:w-40"
        />
      </div>
      <HomeFilter />
      <div className="flex-start w-full flex-col gap-4">
        {questions.length > 0 ? (
          questions.map((qst) => (
            <QuestionCard
              key={qst.id}
              id={qst.id}
              title={qst.title}
              tags={qst.tags}
              author={qst.author}
              upvotes={qst.upvotes}
              views={qst.views}
              answers={qst.answers}
              createdAt={qst.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </div>
  );
}
