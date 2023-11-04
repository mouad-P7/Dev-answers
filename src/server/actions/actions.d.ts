import { Schema } from "mongoose";
import { UserType } from "@/server/database/user.model";

export interface editQuestionByIdParams {
  questionId: string;
  title: string;
  explanation: string;
  path: string;
}

export interface ViewQuestionParams {
  questionId: string;
  userId: string;
}

export interface saveQuestionParams {
  questionId: string;
  userId: string;
  path: string;
}

export interface voteAnswerParams {
  action: string;
  answerId: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  path: string;
}

export interface voteQuestionParams {
  action: string;
  questionId: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  path: string;
}

export interface postAnswerParams {
  author: string;
  content: string;
  question: string;
  path: string;
}

export interface getTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface getAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface deleteUserParams {
  clerkId: string;
}

export interface updateUserParams {
  clerkId: string;
  updateData: Partial<UserType>;
  path: string;
}

export interface createUserParams {
  clerkId: string;
  name: string;
  userName: string;
  email: string;
  picture: string;
}

export interface postQuestionParams {
  title: string;
  explanation: string;
  tags: string[];
  author: Schema.Types.ObjectId | UserType;
  path: string;
}

export interface getAllQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}
