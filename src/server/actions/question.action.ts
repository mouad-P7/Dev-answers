"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/server/mongoose";
import Question from "@/server/database/question.model";
import Tag from "@/server/database/tag.model";
import User from "@/server/database/user.model";
import { getAllQuestionsParams, postQuestionParams } from "./actions";

export async function getAllQuestions(params: getAllQuestionsParams) {
  try {
    await connectToDatabase();
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postQuestion(params: postQuestionParams) {
  try {
    await connectToDatabase();
    const { title, explanation, tags, author, path } = params;
    // Create the question
    const question = await Question.create({
      title,
      explanation,
      author,
    });
    // Create the tags or get them if they already exist
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // Create an interaction record for the user's ask_question action
    // Increment author's reputation by +5 for creating a question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
