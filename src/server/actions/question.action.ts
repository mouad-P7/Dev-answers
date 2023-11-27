"use server";

import { FilterQuery, Types } from "mongoose";
import { revalidatePath } from "next/cache";
import escapeStringRegExp from "escape-string-regexp";
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

export async function getHotQuestions() {
  try {
    connectToDatabase();
    const hotQuestions = Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);
    return hotQuestions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editQuestionById(params: editQuestionByIdParams) {
  try {
    connectToDatabase();
    const { questionId, title, explanation, path } = params;
    const question = await Question.findById(questionId).populate("tags");
    if (!question) throw new Error("Question not found");
    question.title = title;
    question.explanation = explanation;
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
    // const question = await Question.findById(questionId);
    // await User.findOneAndUpdate(question.author, {
    //   $inc: { reputation: -1 },
    // });
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
    // if (action === "upvote") {
    //   // Increment author's reputation
    //   await User.findByIdAndUpdate(userId, {
    //     $inc: { reputation: hasUpVoted ? -1 : 1 },
    //   });
    //   if (userId !== question.author) {
    //     await User.findByIdAndUpdate(question.author, {
    //       $inc: { reputation: hasUpVoted ? -10 : 10 },
    //     });
    //   }
    // } else if (action === "downvote") {
    //   // Increment author's reputation
    //   await User.findByIdAndUpdate(userId, {
    //     $inc: { reputation: hasDownVoted ? -1 : 1 },
    //   });
    //   if (userId !== question.author) {
    //     await User.findByIdAndUpdate(question.author, {
    //       $inc: { reputation: hasDownVoted ? -10 : 10 },
    //     });
    //   }
    // }
    const existingInteraction = await Interaction.findOne({
      user: userId,
      action: "vote-question",
      question: questionId,
    });
    if (existingInteraction) {
      console.log("User has already voted this question.");
      revalidatePath(path);
      return;
    }
    // Create interaction
    await Interaction.create({
      user: userId,
      action: "vote-question",
      question: questionId,
      tags: question?.tags.map((tag: any) => tag.toString()),
    });
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
    const { clerkId, searchQuery, filter, page = 1, pageSize = 15 } = params;
    const skip = (page - 1) * pageSize;
    // handle page < 1 edge case
    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      const escapedSearchQuery = escapeStringRegExp(searchQuery);
      query.$or = [
        { title: { $regex: new RegExp(escapedSearchQuery, "i") } },
        { explanation: { $regex: new RegExp(escapedSearchQuery, "i") } },
      ];
    }
    let sortOptions = {};
    if (!filter || filter === "newest") {
      sortOptions = { createdAt: -1 };
    } else if (filter === "frequent") {
      sortOptions = { views: -1 };
    } else if (filter === "unanswered") {
      query.answers = { $size: 0 };
    } else if (filter === "recommended" && clerkId) {
      const user = await User.findOne({ clerkId });
      if (!user) throw new Error("user not found");
      const userInteractions = await Interaction.find({ user: user._id });
      const allTagObjectIds = userInteractions.reduce<
        Array<typeof Interaction>
      >((tagIds, interaction) => {
        return tagIds.concat(interaction.tags || []);
      }, []);
      const allTagIds = allTagObjectIds.map((item: any) => item.toString());
      const uniqueTagIds = allTagIds.filter(
        (item, index) => allTagIds.indexOf(item) === index
      );
      const uniqueTagObjectIds = uniqueTagIds.map(
        (item: any) => new Types.ObjectId(item)
      );
      query.$and = [
        { tags: { $in: uniqueTagObjectIds } },
        { author: { $ne: user._id } },
      ];
      // sortOptions = {};
    } else {
      return {};
    }
    const questions = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);
    const nbrQuestions = await Question.countDocuments(query);
    const isNext = nbrQuestions > skip + questions.length;
    return { questions, isNext };
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
    // Update author's reputation
    // await Interaction.create({
    //   user: author,
    //   action: "postQuestion",
    //   question,
    //   tags: tagDocuments,
    // });
    // await User.findByIdAndUpdate(author, { $inc: { reputation: 1 } });

    // Create interaction
    await Interaction.create({
      user: author,
      action: "post-question",
      question: question._id,
      tags: tagDocuments,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
