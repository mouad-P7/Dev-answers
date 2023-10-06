import { Schema } from "mongoose";
import { UserType } from "@/database/user.model";

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
