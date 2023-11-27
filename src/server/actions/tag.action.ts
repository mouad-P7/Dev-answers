"use server";

import { FilterQuery } from "mongoose";
import escapeStringRegExp from "escape-string-regexp";
import User from "@/server/database/user.model";
import Tag from "@/server/database/tag.model";
import Question from "../database/question.model";
import { connectToDatabase } from "@/server/mongoose";
import {
  getAllTagsParams,
  getTagByIdParams,
  getTopInteractedTagsParams,
} from "./actions";

export async function getPopularTags() {
  try {
    connectToDatabase();
    let popularTags = await Tag.aggregate([
      { $project: { name: 1, questionsCount: { $size: "$questions" } } },
      { $sort: { questionsCount: -1 } },
      { $limit: 5 },
    ]);
    popularTags = popularTags.map((tag) => ({
      ...tag,
      _id: tag._id.toString(),
    }));
    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTagById(params: getTagByIdParams) {
  try {
    connectToDatabase();
    const { tagId, searchQuery, page = 1, pageSize = 15 } = params;
    const skip = (page - 1) * pageSize;
    // handle page < 1 edge case
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      const escapedSearchQuery = escapeStringRegExp(searchQuery);
      query.$or = [
        { title: { $regex: new RegExp(escapedSearchQuery, "i") } },
        { explanation: { $regex: new RegExp(escapedSearchQuery, "i") } },
      ];
    }
    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      match: query,
      options: { sort: { views: -1 }, limit: pageSize, skip },
      model: Question,
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    const isNext = tag.questions.length > skip;
    return { tag, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: getAllTagsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 15 } = params;
    const skip = (page - 1) * pageSize;
    // handle page < 1 edge case
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      const escapedSearchQuery = escapeStringRegExp(searchQuery);
      query.$or = [{ name: { $regex: new RegExp(escapedSearchQuery, "i") } }];
    }
    let sortOptions = {};
    if (!filter || filter === "popular") {
      sortOptions = { questions: -1 };
    } else if (filter && filter === "recent") {
      sortOptions = { createdAt: -1 };
    } else if (filter && filter === "old") {
      sortOptions = { createdAt: 1 };
    } else if (filter && filter === "name") {
      sortOptions = { name: 1 };
    }
    const tags = await Tag.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);
    const nbrTags = await Tag.countDocuments(query);
    const isNext = nbrTags > skip + tags.length;
    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopInteractedTags(params: getTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    // Find interactions for the user and group by tags...
    // Interaction...
    return [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
