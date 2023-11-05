"use server";

import { FilterQuery } from "mongoose";
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
    const { tagId, searchQuery } = params;
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { explanation: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      match: query,
      model: Question,
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    return tag;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: getAllTagsParams) {
  try {
    connectToDatabase();
    const { searchQuery } = params;
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    const tags = await Tag.find(query);
    return tags;
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
    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2tag2" },
      { _id: "3", name: "tag3tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
