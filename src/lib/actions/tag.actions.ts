"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { getTopInteractedTagsParams } from "@/types/actions";

export async function getTopInteractedTags(params: getTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    // Find interactions for the user and group by tags...
    // Interaction...
    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2tag2" },
      { _id: "3", name: "tag3tag3" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
