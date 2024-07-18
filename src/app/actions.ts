"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

export const codeExplainQuery = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const finalPrompt = `can you explain this code: ${prompt}`;

  const result = await model.generateContent(finalPrompt);
  const response = result.response;
  const text = response.text();
  return text;
};
