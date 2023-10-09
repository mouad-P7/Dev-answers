import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/shared/Tag";

const hotQuestions = [
  {
    id: 1,
    title:
      "Would it be appropriate to point out an error in another paper during a referee report?",
  },
  { id: 2, title: "How can an airconditioning machine exist?" },
  { id: 3, title: "Interrogated every time crossing UK Border as citizen" },
  { id: 4, title: "Low digit addition generator" },
  {
    id: 5,
    title: "What is an example of 3 numbers that do not make up a vector?",
  },
];

const popularTags = [
  { id: "1", name: "javascript", num: 20152 },
  { id: "2", name: "next.js", num: 20152 },
  { id: "3", name: "react.js", num: 18493 },
  { id: "4", name: "node.js", num: 16378 },
  { id: "5", name: "python", num: 15152 },
  { id: "6", name: "microsoft azure", num: 14142 },
  { id: "7", name: "postgre sql", num: 9445 },
  { id: "8", name: "machine learning", num: 9400 },
];

export default function RightSidebar() {
  return (
    <aside className="background-light900_dark200 light-border custom-scrollbar text-dark500_light700 sticky right-0 top-0 flex h-screen w-[330px] flex-col gap-6 overflow-scroll border-l p-6 pt-28 shadow-light-300 dark:shadow-none max-xl:hidden">
      <section>
        <p className="h3-bold pb-6">Hot Questions</p>
        <div className="flex-between flex-col gap-6">
          {hotQuestions.map((qst) => (
            <Link
              key={qst.id}
              href={`/question/${qst.id}`}
              className="flex w-full cursor-pointer items-start justify-between gap-2"
            >
              <p className="body-medium">{qst.title}</p>
              <Image
                src="assets/icons/arrow-right.svg"
                alt="arrow"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </section>
      <section>
        <p className="h3-bold pb-6">Popular Tags</p>
        <div className="flex-between flex-col gap-4">
          {popularTags.map((tag) => (
            <div key={tag.id} className="flex-between w-full">
              <Tag tag={tag} />
              <p className="small-medium">{tag.num}+</p>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
