"use server";

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
} from "./actions";

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

export async function getAllSavedQuestions(clerkId: string) {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!user) throw new Error("User not found");
    const savedQuestions = user.saved;
    return { savedQuestions };
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
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
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
