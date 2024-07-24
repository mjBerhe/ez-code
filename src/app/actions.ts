"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import { env } from "~/env";

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

const fileToGenerativePart = (path: string, mimeType: string) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
};

export const codeExplainQuery = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const finalPrompt = `Can you explain the following code in two ways and prefix each explanation with just "##" and nothing else;
    1. Short and Concise: 1-2 sentences
    2. More in-depth; if you seperate the explanation in sections, start and end the subpoints with *

    Here is the following code: ${prompt}`;

  const result = await model.generateContent(finalPrompt);
  const response = result.response;
  const text = response.text();
  return text;
};

export const codeImageExplainQuery = async (path: string, type: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const imageParts = [{ inlineData: { data: path, mimeType: type } }];
  const prompt = `Can you explain the following code in the picture in two ways and prefix each explanation with just "##" and nothing else;
    1. Short and Concise: 1-2 sentences
    2. More in-depth; if you seperate the explanation in sections, start and end the subpoints with *`;

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = result.response;
  const text = response.text();
  console.log(text);
  return text;
};
