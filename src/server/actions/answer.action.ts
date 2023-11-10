"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/server/mongoose";
import {
  postAnswerParams,
  voteAnswerParams,
  getAllAnswersParams,
} from "./actions";
import Answer from "@/server/database/answer.model";
import Question from "@/server/database/question.model";
import Interaction from "@/server/database/interaction.model";
import User from "@/server/database/user.model";

export async function deleteAnswerById(answerId: string, path: string) {
  try {
    await connectToDatabase();
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");
    await answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
    if (action === "upvote") {
      // Increment author's reputation
      await User.findByIdAndUpdate(userId, {
        $inc: { reputation: hasUpVoted ? -2 : 2 },
      });
      if (userId !== answer.author) {
        await User.findByIdAndUpdate(answer.author, {
          $inc: { reputation: hasUpVoted ? -10 : 10 },
        });
      }
    } else if (action === "downvote") {
      // Increment author's reputation
      await User.findByIdAndUpdate(userId, {
        $inc: { reputation: hasDownVoted ? -2 : 2 },
      });
      if (userId !== answer.author) {
        await User.findByIdAndUpdate(answer.author, {
          $inc: { reputation: hasDownVoted ? -10 : 10 },
        });
      }
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllAnswers(params: getAllAnswersParams) {
  try {
    await connectToDatabase();
    const { questionId, filter, page = 1, pageSize = 2 } = params;
    const skip = (page - 1) * pageSize;
    // handle page < 1 edge case
    let sortOptions = {};
    if (!filter || filter === "highestUpvotes") {
      sortOptions = { upvotes: -1 };
    } else if (filter && filter === "lowestUpvotes") {
      sortOptions = { upvotes: 1 };
    } else if (filter && filter === "recent") {
      sortOptions = { createdAt: -1 };
    } else if (filter && filter === "old") {
      sortOptions = { createdAt: 1 };
    }
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);
    const nbrAnswers = await Answer.countDocuments({ question: questionId });
    const isNext = nbrAnswers > skip + answers.length;
    return { answers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function postAnswer(params: postAnswerParams) {
  try {
    await connectToDatabase();
    const { author, content, questionId, path } = params;
    // Add the answer to the question's answers array
    const newAnswer = await Answer.create({ content, author, questionId });
    const question = await Question.findByIdAndUpdate(questionId, {
      $push: { answers: newAnswer._id },
    });

    // Update author's reputation
    await Interaction.create({
      user: author,
      action: "postAnswer",
      question: questionId,
      tags: question.tags,
    });
    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
