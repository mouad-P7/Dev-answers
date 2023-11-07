"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import User from "@/server/database/user.model";
import Question from "@/server/database/question.model";
import Answer from "@/server/database/answer.model";
import Tag from "@/server/database/tag.model";
import { connectToDatabase } from "@/server/mongoose";
import {
  createUserParams,
  updateUserParams,
  deleteUserParams,
  getAllUsersParams,
  saveQuestionParams,
  getAllSavedQuestionsParams,
} from "./actions";

export async function getUserTopAnswers(userId: string) {
  try {
    connectToDatabase();
    const topAnswers = await Answer.find({ author: userId })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture")
      .sort({ upvotes: -1 });
    return topAnswers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserTopQuestions(userId: string) {
  try {
    connectToDatabase();
    const topQuestions = await Question.find({ author: userId })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture")
      .sort({ views: -1, upvotes: -1 });
    return topQuestions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserData(clerkId: string) {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId });
    if (!user) throw new Error("User not found");
    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });
    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllSavedQuestions(params: getAllSavedQuestionsParams) {
  try {
    connectToDatabase();
    const { clerkId, searchQuery, filter } = params;
    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { explanation: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};
    if (!filter || filter === "most_recent") {
      sortOptions = { createdAt: -1 };
    } else if (filter && filter === "oldest") {
      sortOptions = { createdAt: 1 };
    } else if (filter && filter === "most_voted") {
      sortOptions = { upvotes: -1 };
    } else if (filter && filter === "most_viewed") {
      sortOptions = { views: -1 };
    } else if (filter && filter === "most_answered") {
      sortOptions = { answers: -1 };
    }
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: { sort: sortOptions },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!user) throw new Error("User not found");
    const savedQuestions = user.saved;
    return savedQuestions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function saveQuestion(params: saveQuestionParams) {
  try {
    connectToDatabase();
    const { questionId, userId, path } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    const hasSaved = user.saved.includes(questionId);

    let updateQuery = {};
    if (hasSaved) updateQuery = { $pull: { saved: questionId } };
    else updateQuery = { $addToSet: { saved: questionId } };

    await User.findByIdAndUpdate(userId, updateQuery, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllUsers(params: getAllUsersParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 2 } = params;
    const skip = (page - 1) * pageSize;
    console.log(" page: ", page, " pageSize: ", pageSize);
    // handle page < 1 edge case
    const query: FilterQuery<typeof User> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { userName: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};
    if (!filter || filter === "old_users") {
      sortOptions = { joinedAt: 1 };
    } else if (filter && filter === "new_users") {
      sortOptions = { joinedAt: -1 };
    } else if (filter && filter === "top_contributors") {
      sortOptions = { reputation: -1 };
    }
    const users = await User.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort(sortOptions);
    const nbrQuestions = await Question.countDocuments(query);
    const isNext = nbrQuestions > skip + users.length;
    return { users, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(params: deleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id }).distinct("_id");

    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(params: updateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userData: createUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
