"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/server/mongoose";
import { postAnswerParams, voteAnswerParams } from "./actions";
import Answer from "../database/answer.model";
import Question from "../database/question.model";

export async function voteAnswer(params: voteAnswerParams) {
  try {
    await connectToDatabase();
    const { action, answerId, userId, hasUpVoted, hasDownVoted, path } = params;
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

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) throw new Error("Answer not found");

    // Increment author's reputation

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllAnswers(questionId: string) {
  try {
    await connectToDatabase();
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });
    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function postAnswer(params: postAnswerParams) {
  try {
    await connectToDatabase();
    const { author, content, question, path } = params;
    // Create the answer
    const newAnswer = await Answer.create({ content, author, question });
    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: Add interaction...

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
