import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/shared/Tag";
import { getHotQuestions } from "@/server/actions/question.action";
import { getPopularTags } from "@/server/actions/tag.action";

export default async function RightSidebar() {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getPopularTags();

  return (
    <aside className="background-light900_dark200 light-border custom-scrollbar text-dark500_light700 sticky right-0 top-0 flex h-screen w-[330px] flex-col gap-6 overflow-scroll border-l p-6 pt-24 shadow-light-300 dark:shadow-none max-xl:hidden">
      <section>
        <p className="h3-bold pb-6">Hot Questions</p>
        <div className="flex-between flex-col gap-6">
          {hotQuestions.map((qst) => (
            <Link
              key={qst._id}
              href={`/question/${qst._id}`}
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
            <div key={tag._id} className="flex-between w-full">
              <Tag tag={{ id: tag._id, name: tag.name }} />
              <p className="small-medium">{tag.questionsCount}+</p>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
