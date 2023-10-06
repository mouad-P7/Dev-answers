import { Schema } from "mongoose";
import { UserType } from "@/database/user.model";

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
