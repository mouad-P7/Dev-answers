"use server";

import escapeStringRegexp from "escape-string-regexp";
import { connectToDatabase } from "@/server/mongoose";
import Answer from "@/server/database/answer.model";
import Question from "@/server/database/question.model";
import Tag from "@/server/database/tag.model";
import User from "@/server/database/user.model";
import { globalSearchParams } from "./actions";

const SearchableTypes = ["question", "answer", "user", "tag"];
const modelsAndTypes = [
  { model: Question, searchField: "title", type: "question" },
  { model: Answer, searchField: "content", type: "answer" },
  { model: User, searchField: "name", type: "user" },
  { model: Tag, searchField: "name", type: "tag" },
];

export async function globalSearch(params: globalSearchParams) {
  try {
    await connectToDatabase();
    const { globalQuery, typeFilter } = params;
    const escapedGlobalQuery = escapeStringRegexp(globalQuery || "");
    const regexQuery = { $regex: escapedGlobalQuery, $options: "i" };
    let results = [];
    const typeLower = typeFilter?.toLowerCase();
    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // GLOBAL SEARCH
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);
        results.push(
          ...queryResults.map((item) => ({
            title: item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkid
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
      // TYPE SEARCH
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === typeFilter);
      if (!modelInfo) throw new Error("Invalid search type");
      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);
      results = queryResults.map((item) => ({
        title:
          typeFilter === "answer"
            ? `Answers containing ${globalQuery}`
            : item[modelInfo.searchField],
        type: typeFilter,
        id:
          typeFilter === "user"
            ? item.clerkId
            : typeFilter === "answer"
              ? item.question
              : item._id,
      }));
    }
    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global results, ${error}`);
    throw error;
  }
}
