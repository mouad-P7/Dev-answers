import * as z from "zod";

export const profileSchema = z.object({
  name: z.string().min(5).max(30),
  userName: z.string().min(5).max(30),
  portfolioWebsite: z.string().url().optional(),
  location: z.string().min(5).max(50).optional(),
  bio: z.string().min(5).max(130).optional(),
});

export const questionSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const answerSchema = z.object({
  answer: z.string().min(100),
});
