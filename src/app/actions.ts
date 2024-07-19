"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

export const codeExplainQuery = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const finalPrompt = `Can you explain the following code in two ways;
    1. Short and Concise, and 2. Longer but more in-depth.
    Can you prefix each explanation with just "##".
    Here is the following code: ${prompt}`;

  const result = await model.generateContent(finalPrompt);
  const response = result.response;
  const text = response.text();
  return text;
};
