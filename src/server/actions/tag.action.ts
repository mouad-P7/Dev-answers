"use server";

import User from "@/server/database/user.model";
import Tag from "@/server/database/tag.model";
import { connectToDatabase } from "@/server/mongoose";
import { getTopInteractedTagsParams } from "./actions";
import Question from "../database/question.model";

export async function getTagById(tagId: string) {
  try {
    connectToDatabase();
    const tag = await Tag.findById(tagId).populate({
      path: "questions",
      model: Question,
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    return { tag };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: any) {
  try {
    connectToDatabase();
    const tags = await Tag.find({});
    return { tags };
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
