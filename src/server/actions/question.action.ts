"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/server/mongoose";
import Question from "@/server/database/question.model";
import Tag from "@/server/database/tag.model";
import User from "@/server/database/user.model";
import Answer from "@/server/database/answer.model";
import Interaction from "@/server/database/interaction.model";
import {
  getAllQuestionsParams,
  postQuestionParams,
  voteQuestionParams,
  editQuestionByIdParams,
} from "./actions";

export async function editQuestionById(params: editQuestionByIdParams) {
  try {
    connectToDatabase();
    const { questionId, title, content, path } = params;
    const question = await Question.findById(questionId).populate("tags");
    if (!question) throw new Error("Question not found");
    question.title = title;
    question.content = content;
    await question.save();
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteQuestionById(questionId: string, path: string) {
  try {
    connectToDatabase();
    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function voteQuestion(params: voteQuestionParams) {
  try {
    connectToDatabase();
    const { action, questionId, userId, hasUpVoted, hasDownVoted, path } =
      params;
    let updateQuery = {};

    if (action === "upvote") {
      if (hasUpVoted) updateQuery = { $pull: { upvotes: userId } };
      else if (hasDownVoted) {
        updateQuery = {
          $pull: { downvotes: userId },
          $push: { upvotes: userId },
        };
      } else updateQuery = { $addToSet: { upvotes: userId } };
    } else if (action === "downvote") {
      if (hasDownVoted) updateQuery = { $pull: { downvotes: userId } };
      else if (hasUpVoted) {
        updateQuery = {
          $pull: { upvotes: userId },
          $push: { downvotes: userId },
        };
      } else updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    });
    if (!question) throw new Error("Question not found");

    // Increment author's reputation

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionById(questionId: string) {
  try {
    connectToDatabase();
    const question = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return question;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
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
