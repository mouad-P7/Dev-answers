"use server";

import Question from "@/server/database/question.model";
import { connectToDatabase } from "@/server/mongoose";
import { ViewQuestionParams } from "./actions";
import Interaction from "@/server/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();
    const { questionId, userId } = params;
    if (!userId) throw new Error("User not found");

    // Update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
    const existingInteraction = await Interaction.findOne({
      user: userId,
      action: "view",
      question: questionId,
    });
    if (existingInteraction) return console.log("User has already viewed.");

    // Create interaction
    await Interaction.create({
      user: userId,
      action: "view",
      question: questionId,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
