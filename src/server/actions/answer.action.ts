"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/server/mongoose";
import { postAnswerParams } from "./actions";
import Answer from "../database/answer.model";
import Question from "../database/question.model";

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
