"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

export const codeExplainQuery = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const finalPrompt = `Can you explain the following code in two ways;
    1. Short and Concise
    2. More in-depth; if you seperate the explanation in sections, start and end the subpoints with *

    Can you prefix each explanation with just "##" and nothing else.

    Here is the following code: ${prompt}`;

  const result = await model.generateContent(finalPrompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
};
