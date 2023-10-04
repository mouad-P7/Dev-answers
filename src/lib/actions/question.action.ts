"use server";

import { connectToDatabase } from "@/lib/mongoose";

export async function postQuestion(params: any) {
  try {
    await connectToDatabase();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
